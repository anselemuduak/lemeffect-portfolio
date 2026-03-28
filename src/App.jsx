import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

export default function App() {
  const [projects, setProjects] = useState([])
  const [showAdmin, setShowAdmin] = useState(false)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    fetchProjects()
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

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#0D0D1A', minHeight: '100vh', color: '#fff', padding: '2rem' }}>
      <h1>LemEffect Portfolio — Connected ✓</h1>
      <p style={{ color: '#3DD9D6' }}>Projects loaded: {projects.length}</p>
      <button
        onClick={() => setShowAdmin(true)}
        style={{ marginTop: '1rem', background: '#5D3FD3', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '50px', cursor: 'pointer' }}
      >
        Open Admin
      </button>
    </div>
  )
}
