import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import AdminModal from './components/AdminModal'

const COLORS = {
  purple: '#5D3FD3', purpleLight: '#7B5FE8', purpleDark: '#3D2A8A',
  aqua: '#3DD9D6', bg: '#F2F2F2', dark: '#0D0D1A',
  darkCard: '#13132A', yellow: '#FCD34D', white: '#FFFFFF', gray: '#8A8AA0',
}

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Nunito:wght@300;400;500;600&family=Poppins:wght@400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Nunito', sans-serif; background: ${COLORS.bg}; color: ${COLORS.dark}; overflow-x: hidden; }
    h1,h2,h3,h4 { font-family: 'Sora', sans-serif; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: ${COLORS.dark}; }
    ::-webkit-scrollbar-thumb { background: ${COLORS.purple}; border-radius: 2px; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
    @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.8; } 100% { transform: scale(1.6); opacity: 0; } }
    @keyframes drift { 0% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-20px) scale(1.05); } 66% { transform: translate(-15px,25px) scale(0.97); } 100% { transform: translate(0,0) scale(1); } }
  `}</style>
)

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 5%', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrolled ? 'rgba(13,13,26,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(18px)' : 'none', borderBottom: scrolled ? '1px solid rgba(93,63,211,0.2)' : 'none', transition: 'all 0.4s ease' }}>
      <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '1.4rem', color: COLORS.white }}>LEM<span style={{ color: COLORS.aqua }}>EFFECT</span></span>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {['Work','About','Services','Contact'].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{l}</a>
        ))}
        <a href="#contact" style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.aqua})`, color: '#fff', padding: '10px 24px', borderRadius: '50px', fontFamily: "'Poppins', sans-serif", fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>Hire Me</a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section id="home" style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${COLORS.dark} 0%, #1A0E3A 50%, #0A1A2E 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '0 5%' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(93,63,211,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(93,63,211,0.06) 1px, transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
      {[{size:500,top:'-15%',left:'-10%',color:COLORS.purple,dur:'18s'},{size:350,bottom:'-10%',right:'-5%',color:COLORS.aqua,dur:'22s'},{size:200,top:'40%',right:'20%',color:COLORS.yellow,dur:'15s'}].map((orb,i) => (
        <div key={i} style={{ position: 'absolute', width: orb.size, height: orb.size, borderRadius: '50%', background: `radial-gradient(circle, ${orb.color}33 0%, transparent 70%)`, top: orb.top, left: orb.left, right: orb.right, bottom: orb.bottom, animation: `drift ${orb.dur} infinite ease-in-out`, pointerEvents: 'none' }} />
      ))}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(93,63,211,0.15)', border: '1px solid rgba(93,63,211,0.3)', borderRadius: '50px', padding: '8px 20px', marginBottom: '2rem', animation: 'fadeIn 0.8s ease both' }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: COLORS.aqua }} />
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.78rem', color: COLORS.aqua, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Where Creativity Meets Impact</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 800, color: COLORS.white, lineHeight: 1.1, marginBottom: '1.5rem', animation: 'fadeUp 1s 0.2s ease both', letterSpacing: '-0.03em' }}>
          We don't just design.{' '}
          <span style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.aqua})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>We engineer</span>
          <br />visual experiences that <span style={{ color: COLORS.yellow }}>move people.</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.7, animation: 'fadeUp 1s 0.4s ease both', fontWeight: 300 }}>
          Graphic design, photography, and videography crafted to elevate your brand and convert attention into impact.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeUp 1s 0.6s ease both' }}>
          <a href="#work" style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purpleLight})`, color: '#fff', padding: '16px 36px', borderRadius: '50px', fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 8px 30px rgba(93,63,211,0.4)' }}>View Work</a>
          <a href="#contact" style={{ background: 'transparent', color: COLORS.white, padding: '16px 36px', borderRadius: '50px', border: '1.5px solid rgba(255,255,255,0.25)', fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '0.95rem', textDecoration: 'none' }}>Hire Me</a>
        </div>
        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '4rem', flexWrap: 'wrap', animation: 'fadeUp 1s 0.8s ease both' }}>
          {[['7+','Years in Design'],['3+','Years Videography'],['100%','Unapologetic Effect']].map(([num,label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '1.8rem', color: COLORS.aqua }}>{num}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', fontFamily: "'Poppins', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}function About() {
  return (
    <section id="about" style={{ padding: '8rem 5%', background: COLORS.dark, position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: '100%', paddingBottom: '110%', background: `linear-gradient(135deg, ${COLORS.purpleDark} 0%, #1A0E3A 50%, rgba(61,217,214,0.15) 100%)`, borderRadius: '24px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(93,63,211,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '3rem', fontWeight: 800, background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.aqua})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LEM</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.7rem', color: COLORS.aqua, letterSpacing: '0.3em', textTransform: 'uppercase' }}>EFFECT</div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: COLORS.yellow, borderRadius: '16px', padding: '16px 20px', fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: COLORS.dark, animation: 'float 4s ease-in-out infinite' }}>From idea<br />to impact ✦</div>
        </div>
        <div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: COLORS.aqua, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>About LemEffect</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: COLORS.white, lineHeight: 1.2, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            A creative brand<br /><span style={{ color: COLORS.purple }}>built to solve</span> <span style={{ color: COLORS.aqua }}>real problems.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, marginBottom: '1.5rem', fontSize: '1rem' }}>LemEffect isn't just another design studio. We're a creative force that bridges the gap between brand vision and market reality — translating ideas into visuals that communicate, connect, and convert.</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, marginBottom: '2rem', fontSize: '0.95rem' }}>With 7 years of graphic design and 3 years of photo/video experience, every project is approached as a strategic creative problem — not just an aesthetic exercise.</p>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '1rem', color: COLORS.aqua, borderBottom: `2px solid ${COLORS.aqua}`, paddingBottom: '4px' }}>"We keep delivering unapologetic effects."</div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const services = [
    { icon: '◈', title: 'Graphic Design', tagline: 'Your brand\'s first impression — made permanent.', description: 'From brand identity to social media assets, we craft visuals that build recognition, authority, and trust.', items: ['Brand Identity','Posters & Flyers','Social Media Design','Print & Packaging'], color: COLORS.purple },
    { icon: '◉', title: 'Videography', tagline: 'Motion that compels. Stories that sell.', description: 'We construct narrative experiences — commercials, edits, and branded content that keep eyes locked and trigger action.', items: ['Video Editing','Brand Commercials','Event Coverage','Motion Storytelling'], color: COLORS.aqua },
    { icon: '◎', title: 'Photography', tagline: 'One image worth a thousand conversions.', description: 'Product photography that makes people buy. Lifestyle imagery that makes people feel.', items: ['Product Photography','Lifestyle Shoots','Creative Direction','Brand Imagery'], color: COLORS.yellow },
  ]
  return (
    <section id="services" style={{ padding: '8rem 5%', background: COLORS.bg }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: COLORS.purple, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>What We Do</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.dark, letterSpacing: '-0.02em' }}>Three disciplines.<br /><span style={{ color: COLORS.purple }}>One relentless standard.</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {services.map((s) => (
            <div key={s.title} style={{ background: COLORS.dark, borderRadius: '24px', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: s.color }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '1.3rem', color: COLORS.white, marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '0.82rem', color: s.color, marginBottom: '1rem' }}>{s.tagline}</p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>{s.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {s.items.map(item => (<span key={item} style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color, padding: '4px 12px', borderRadius: '50px', fontSize: '0.72rem', fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>{item}</span>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
function ProjectModal({ project, onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#13132A', borderRadius: '24px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflow: 'auto', border: '1px solid rgba(93,63,211,0.3)' }}>
        {project.thumbnail_url && <img src={project.thumbnail_url} alt={project.title} style={{ width: '100%', borderRadius: '24px 24px 0 0', objectFit: 'cover', maxHeight: '80vh' }} />}
        <div style={{ padding: '2rem' }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.72rem', color: '#3DD9D6', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{project.category}</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>{project.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>{project.description}</p>
          {project.concept && <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontSize: '0.88rem', fontStyle: 'italic', borderLeft: '3px solid #5D3FD3', paddingLeft: '1rem' }}>{project.concept}</p>}
          {project.tags && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1.5rem' }}>
              {(typeof project.tags === 'string' ? project.tags.split(',') : project.tags).map(tag => (
                <span key={tag} style={{ background: 'rgba(93,63,211,0.15)', border: '1px solid rgba(93,63,211,0.3)', color: '#5D3FD3', padding: '4px 12px', borderRadius: '50px', fontSize: '0.72rem', fontFamily: "'Poppins', sans-serif" }}>{tag.trim()}</span>
              ))}
            </div>
          )}
          <button onClick={onClose} style={{ marginTop: '2rem', background: 'linear-gradient(135deg, #5D3FD3, #3DD9D6)', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '50px', fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', width: '100%' }}>Close</button>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false)
  const catColors = { 'Graphic Design': COLORS.purple, 'Videography': COLORS.aqua, 'Photography': COLORS.yellow }
  const c = catColors[project.category] || COLORS.purple
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}onClick={onClick} style={{ background: COLORS.darkCard, borderRadius: '20px', overflow: 'hidden', border: `1px solid ${hovered ? c+'50' : 'rgba(255,255,255,0.06)'}`, transition: 'all 0.35s ease', transform: hovered ? 'translateY(-6px)' : 'translateY(0)', cursor: 'pointer' }}>
      <div style={{ height: '220px', background: `linear-gradient(135deg, ${COLORS.purpleDark}50, ${c}20)`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {project.thumbnail_url ? <img src={project.thumbnail_url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ fontSize: '3rem', color: `${c}40` }}>◈</div>}
        {project.featured && <div style={{ position: 'absolute', top: '12px', right: '12px', background: COLORS.yellow, color: COLORS.dark, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '0.65rem', padding: '4px 10px', borderRadius: '50px' }}>★ Featured</div>}
      </div>
      <div style={{ padding: '1.5rem' }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.7rem', color: c, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{project.category}</div>
        <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: COLORS.white, marginBottom: '0.5rem' }}>{project.title}</h3>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.6 }}>{project.description}</p>
      </div>
    </div>
  )
}

function Portfolio({ projects, loading }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const filters = ['All','Graphic Design','Videography','Photography']
  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)
  return (
    <section id="work" style={{ padding: '8rem 5%', background: COLORS.dark }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: COLORS.aqua, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>Portfolio</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.white, letterSpacing: '-0.02em', marginBottom: '2rem' }}>Curated work.<br /><span style={{ color: COLORS.aqua }}>Real results.</span></h2>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {filters.map(f => (<button key={f} onClick={() => setActiveFilter(f)} style={{ background: activeFilter === f ? `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.aqua})` : 'transparent', color: activeFilter === f ? '#fff' : 'rgba(255,255,255,0.5)', border: activeFilter === f ? 'none' : '1px solid rgba(255,255,255,0.15)', padding: '10px 22px', borderRadius: '50px', fontFamily: "'Poppins', sans-serif", fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer' }}>{f}</button>))}
          </div>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.3)' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', border: '2px dashed rgba(93,63,211,0.3)', borderRadius: '24px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>◈</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Poppins', sans-serif" }}>Projects will appear here once uploaded from the admin panel.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filtered.map(p => <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />)}
          </div>
        )}
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const handleSubmit = () => {
    if (form.name && form.email && form.message) { setSent(true); setTimeout(() => setSent(false), 4000); setForm({ name: '', email: '', message: '' }) }
  }
  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 18px', color: COLORS.white, fontFamily: "'Nunito', sans-serif", fontSize: '0.95rem', outline: 'none' }
  return (
    <section id="contact" style={{ padding: '8rem 5%', background: COLORS.dark, position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: COLORS.aqua, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>Get In Touch</div>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: COLORS.white, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Let's create something <span style={{ color: COLORS.yellow }}>impactful.</span></h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '3rem' }}>Whether it's a brand overhaul, a campaign shoot, or a one-off flyer — bring your vision, we'll engineer the effect.</p>
        {sent ? (
          <div style={{ background: 'rgba(61,217,214,0.1)', border: `1px solid ${COLORS.aqua}`, borderRadius: '16px', padding: '2rem', color: COLORS.aqua, fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>✓ Message received. We'll be in touch shortly.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input style={inputStyle} placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input style={inputStyle} placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <textarea style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }} placeholder="Tell me about your project..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '0.5rem' }}>
              <button onClick={handleSubmit} style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.aqua})`, color: '#fff', border: 'none', padding: '16px 40px', borderRadius: '50px', fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>Send Message</button>
              <a href="https://wa.me/2348137014327" target="_blank" rel="noreferrer" style={{ background: '#25D366', color: '#fff', padding: '16px 28px', borderRadius: '50px', fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>💬 WhatsApp</a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ background: '#080812', borderTop: '1px solid rgba(93,63,211,0.15)', padding: '2.5rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
      <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: COLORS.white }}>LEM<span style={{ color: COLORS.aqua }}>EFFECT</span></div>
      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>© {new Date().getFullYear()} LemEffect · Where Creativity Meets Impact · Port Harcourt, Nigeria</div>
      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.72rem', color: COLORS.purple }}>Unapologetic Effects.</div>
    </footer>
  )
}

export default function App() {
  const [projects, setProjects] = useState([])
  const [showAdmin, setShowAdmin] = useState(false)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => { fetchProjects() }, [])

  async function fetchProjects() {
    const { data, error } = await supabase.from('projects').select('*').eq('published', true).order('created_at', { ascending: false })
    if (!error) setProjects(data || [])
    setLoading(false)
  }

  const featured = projects.filter(p => p.featured)

  return (
    <div>
      <GlobalStyle />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Portfolio projects={projects} loading={loading} />
      {featured.length > 0 && (
        <section style={{ padding: '8rem 5%', background: COLORS.bg }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', color: COLORS.yellow, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>Featured Work</div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: COLORS.dark }}>The work that <span style={{ color: COLORS.purple }}>defines us.</span></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
              {featured.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          </div>
        </section>
      )}
      <Contact />
      <Footer />
    </div>
  )
}
