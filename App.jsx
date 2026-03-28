// App.jsx — LemEffect Portfolio
// Full-stack version with Supabase CMS + Auth
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import FeaturedWork from './components/FeaturedWork'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminModal from './components/AdminModal'

export default function App() {
  const [projects, setProjects] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [showAdmin, setShowAdmin] = useState(false)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  // Auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Load data
  useEffect(() => {
    fetchProjects()
    fetchTestimonials()
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    if (!error) setProjects(data || [])
    setLoading(false)
  }

  async function fetchTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setTestimonials(data || [])
  }

  const featured = projects.filter(p => p.featured)

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <Nav onHireClick={scrollToContact} onAdminClick={() => setShowAdmin(true)} />
      <Hero onHireClick={scrollToContact} />
      <About />
      <Services />
      <Portfolio projects={projects} loading={loading} />
      {featured.length > 0 && <FeaturedWork projects={featured} />}
      {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      <Contact />
      <Footer />

      {showAdmin && (
        <AdminModal
          onClose={() => setShowAdmin(false)}
          session={session}
          onRefresh={fetchProjects}
        />
      )}
    </div>
  )
}
