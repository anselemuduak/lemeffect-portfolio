// src/components/AdminModal.jsx
// Supabase-backed admin panel: login, project CRUD, media upload

import { useState } from 'react'
import { supabase } from '../lib/supabase'

const C = {
  purple: '#5D3FD3', aqua: '#3DD9D6', yellow: '#FCD34D',
  dark: '#0D0D1A', card: '#13132A', white: '#FFFFFF',
}

export default function AdminModal({ onClose, session, onRefresh }) {
  const [tab, setTab] = useState(session ? 'projects' : 'login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(false)
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({
    title: '', category: 'Graphic Design', description: '',
    concept: '', tags: '', featured: false, published: true,
  })
  const [mediaFile, setMediaFile] = useState(null)
  const [thumbFile, setThumbFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const isAdmin = !!session

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setLoginError(error.message); return }
    setTab('projects')
    loadProjects()
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    onClose()
  }

  async function loadProjects() {
    setLoadingProjects(true)
    const { data } = await supabase
      .from('projects')
      .select('id, title, category, featured, published, created_at')
      .order('created_at', { ascending: false })
    setProjects(data || [])
    setLoadingProjects(false)
  }

  async function handleAdd() {
    if (!form.title || !form.description) {
      setMsg('Title and description are required.')
      return
    }
    setUploading(true)
    let thumbnailUrl = ''
    let mediaUrl = ''

    // Upload thumbnail
    if (thumbFile) {
      const ext = thumbFile.name.split('.').pop()
      const path = `thumbnails/${Date.now()}.${ext}`
      const { data, error } = await supabase.storage.from('portfolio-media').upload(path, thumbFile)
      if (!error) {
        const { data: { publicUrl } } = supabase.storage.from('portfolio-media').getPublicUrl(path)
        thumbnailUrl = publicUrl
      }
    }

    // Upload media
    if (mediaFile) {
      const ext = mediaFile.name.split('.').pop()
      const path = `media/${Date.now()}.${ext}`
      const { data, error } = await supabase.storage.from('portfolio-media').upload(path, mediaFile)
      if (!error) {
        const { data: { publicUrl } } = supabase.storage.from('portfolio-media').getPublicUrl(path)
        mediaUrl = publicUrl
      }
    }

    const { error } = await supabase.from('projects').insert([{
      title: form.title,
      category: form.category,
      description: form.description,
      concept: form.concept,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      featured: form.featured,
      published: form.published,
      thumbnail_url: thumbnailUrl,
      media_url: mediaUrl,
    }])

    setUploading(false)
    if (error) { setMsg(`Error: ${error.message}`); return }
    setMsg('✓ Project published.')
    setForm({ title: '', category: 'Graphic Design', description: '', concept: '', tags: '', featured: false, published: true })
    setMediaFile(null); setThumbFile(null)
    loadProjects()
    onRefresh()
    setTimeout(() => setMsg(''), 3000)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project?')) return
    await supabase.from('projects').delete().eq('id', id)
    loadProjects(); onRefresh()
  }

  async function handleToggleFeatured(id, current) {
    await supabase.from('projects').update({ featured: !current }).eq('id', id)
    loadProjects(); onRefresh()
  }

  const overlay = {
    position: 'fixed', inset: 0, zIndex: 200,
    background: 'rgba(0,0,0,0.85)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
  }
  const modal = {
    background: C.card, border: `1px solid rgba(93,63,211,0.3)`,
    borderRadius: '24px', width: '100%', maxWidth: '600px',
    maxHeight: '88vh', overflow: 'auto', padding: '2.5rem',
  }
  const input = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: `1px solid rgba(255,255,255,0.1)`, borderRadius: '10px',
    padding: '12px 16px', color: C.white,
    fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem',
    outline: 'none', marginBottom: '1rem', display: 'block',
  }
  const label = {
    display: 'block', fontFamily: "'Poppins', sans-serif",
    fontSize: '0.72rem', color: C.aqua, letterSpacing: '0.08em',
    textTransform: 'uppercase', marginBottom: '6px',
  }
  const btn = (bg = C.purple) => ({
    background: bg === 'grad' ? `linear-gradient(135deg, ${C.purple}, ${C.aqua})` : bg,
    color: '#fff', border: 'none', padding: '12px 28px',
    borderRadius: '50px', fontFamily: "'Poppins', sans-serif",
    fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer',
  })

  return (
    <div style={overlay} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={modal}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, color: C.white, fontSize: '1.15rem' }}>
            LEMEFFECT <span style={{ color: C.purple }}>ADMIN</span>
          </h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {isAdmin && <button onClick={handleLogout} style={{ ...btn('rgba(255,80,80,0.2)'), fontSize: '0.75rem', padding: '8px 16px', border: '1px solid rgba(255,80,80,0.3)', color: '#FF6B6B' }}>Sign Out</button>}
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.3rem', cursor: 'pointer' }}>✕</button>
          </div>
        </div>

        {/* LOGIN */}
        {!isAdmin && (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>Restricted to site owner only.</p>
            <label style={label}>Email</label>
            <input style={input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@lemeffect.com" />
            <label style={label}>Password</label>
            <input style={input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            {loginError && <p style={{ color: '#FF6B6B', fontSize: '0.8rem', marginBottom: '1rem' }}>{loginError}</p>}
            <button style={{ ...btn('grad'), width: '100%', padding: '14px' }} onClick={handleLogin}>Sign In</button>
          </div>
        )}

        {/* DASHBOARD */}
        {isAdmin && (
          <div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
              {['projects', 'add'].map(t => (
                <button key={t} onClick={() => { setTab(t); if (t === 'projects') loadProjects() }} style={{
                  background: 'none', border: 'none',
                  fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.85rem',
                  color: tab === t ? C.aqua : 'rgba(255,255,255,0.35)',
                  cursor: 'pointer', textTransform: 'capitalize',
                  borderBottom: tab === t ? `2px solid ${C.aqua}` : '2px solid transparent',
                  paddingBottom: '4px',
                }}>
                  {t === 'projects' ? `All Projects (${projects.length})` : '+ Add Project'}
                </button>
              ))}
            </div>

            {tab === 'projects' && (
              <div>
                {loadingProjects && <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>Loading...</p>}
                {!loadingProjects && projects.length === 0 && (
                  <p style={{ color: 'rgba(255,255,255,0.35)', textAlign: 'center', padding: '2rem' }}>No projects yet. Add your first one ↑</p>
                )}
                {projects.map(p => (
                  <div key={p.id} style={{
                    background: 'rgba(255,255,255,0.04)', borderRadius: '12px',
                    padding: '1rem 1.2rem', marginBottom: '0.75rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, color: C.white, fontSize: '0.9rem' }}>{p.title}</div>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.7rem', color: C.purple, marginTop: '2px' }}>{p.category}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <button onClick={() => handleToggleFeatured(p.id, p.featured)} style={{
                        background: p.featured ? C.yellow : 'transparent',
                        border: `1px solid ${p.featured ? C.yellow : 'rgba(255,255,255,0.15)'}`,
                        color: p.featured ? C.dark : 'rgba(255,255,255,0.4)',
                        padding: '4px 10px', borderRadius: '50px', fontSize: '0.7rem', cursor: 'pointer',
                        fontFamily: "'Poppins', sans-serif", fontWeight: 600,
                      }}>★ {p.featured ? 'Featured' : 'Feature'}</button>
                      <button onClick={() => handleDelete(p.id)} style={{
                        background: 'transparent', border: '1px solid rgba(255,80,80,0.3)',
                        color: '#FF6B6B', padding: '4px 10px', borderRadius: '50px',
                        fontSize: '0.7rem', cursor: 'pointer',
                      }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'add' && (
              <div>
                <label style={label}>Category</label>
                <select style={{ ...input }} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option>Graphic Design</option>
                  <option>Videography</option>
                  <option>Photography</option>
                </select>

                <label style={label}>Project Title *</label>
                <input style={input} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Brand Identity — Kemi's Bakehouse" />

                <label style={label}>Description * (1–2 lines)</label>
                <textarea style={{ ...input, minHeight: '80px', resize: 'none' }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="What was the project about and what did it achieve?" />

                <label style={label}>Creative Concept (optional)</label>
                <textarea style={{ ...input, minHeight: '70px', resize: 'none' }} value={form.concept} onChange={e => setForm({ ...form, concept: e.target.value })} placeholder="The idea or thinking behind the work..." />

                <label style={label}>Thumbnail / Cover Image</label>
                <input type="file" accept="image/*" style={{ ...input, cursor: 'pointer' }} onChange={e => setThumbFile(e.target.files[0])} />

                <label style={label}>Media File (image or video)</label>
                <input type="file" accept="image/*,video/*" style={{ ...input, cursor: 'pointer' }} onChange={e => setMediaFile(e.target.files[0])} />

                <label style={label}>Tags (comma-separated)</label>
                <input style={input} value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="Branding, Poster, Commercial..." />

                <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                  <label style={{ ...label, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0 }}>
                    <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} style={{ accentColor: C.yellow }} />
                    <span>Featured</span>
                  </label>
                  <label style={{ ...label, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0 }}>
                    <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} style={{ accentColor: C.aqua }} />
                    <span>Published (visible)</span>
                  </label>
                </div>

                {msg && <p style={{ color: msg.startsWith('✓') ? C.aqua : '#FF6B6B', fontSize: '0.82rem', marginBottom: '1rem' }}>{msg}</p>}

                <button
                  style={{ ...btn('grad'), width: '100%', padding: '14px', opacity: uploading ? 0.6 : 1 }}
                  onClick={handleAdd}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Publish Project'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
