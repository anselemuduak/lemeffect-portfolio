import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AdminModal from '../components/AdminModal'

export default function AdminPage() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#0D0D1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AdminModal
        onClose={() => window.location.href = '/'}
        session={session}
        onRefresh={() => {}}
      />
    </div>
  )
}
