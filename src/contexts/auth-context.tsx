import type { Session, User } from '@supabase/supabase-js'
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  buildMockProfile,
  getMockTestAccount,
  isMockAuthEnabled,
  isMockUserId,
  mockSignOut,
  readMockSession,
  subscribeMockAuth,
} from '../lib/mock-auth'
import { supabase } from '../lib/supabase'
import type { Profile } from '../types/database'

type AuthContextValue = {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  /** Sincroniza sessão mock do localStorage (após login de preview). */
  establishMockSession: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

function applyMockAuthState(
  setSession: (s: Session | null) => void,
  setUser: (u: User | null) => void,
  setProfile: (p: Profile | null) => void,
) {
  const session = readMockSession()
  if (session) {
    setSession(session)
    setUser(session.user)
    setProfile(buildMockProfile(getMockTestAccount()))
    return true
  }
  return false
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const refreshProfile = useCallback(async () => {
    if (!user) {
      setProfile(null)
      return
    }

    if (isMockUserId(user.id)) {
      setProfile(buildMockProfile(getMockTestAccount()))
      return
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()

    if (error) {
      console.error('[auth] Erro ao carregar perfil:', error.message)
      setProfile(null)
      return
    }

    setProfile(data)
  }, [user])

  useEffect(() => {
    let mounted = true

    async function initAuth() {
      if (isMockAuthEnabled() && applyMockAuthState(setSession, setUser, setProfile)) {
        if (mounted) {
          setLoading(false)
        }
        return
      }

      const { data, error } = await supabase.auth.getSession()

      if (!mounted) {
        return
      }

      if (error) {
        console.error('[auth] Erro ao obter sessão:', error.message)
      }

      if (isMockAuthEnabled() && readMockSession()) {
        applyMockAuthState(setSession, setUser, setProfile)
      } else {
        setSession(data.session)
        setUser(data.session?.user ?? null)
      }
      setLoading(false)
    }

    void initAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMockAuthEnabled() && readMockSession()) {
        applyMockAuthState(setSession, setUser, setProfile)
        setLoading(false)
        return
      }
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!isMockAuthEnabled()) {
      return
    }
    return subscribeMockAuth(() => {
      if (applyMockAuthState(setSession, setUser, setProfile)) {
        setLoading(false)
        return
      }
      setSession(null)
      setUser(null)
      setProfile(null)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!user) {
      setProfile(null)
      return
    }

    void refreshProfile()
  }, [user, refreshProfile])

  useEffect(() => {
    if (loading || !user) {
      return
    }

    if (!profile) {
      return
    }

    const cpfExemptRoutes = [
      '/complete-profile',
      '/forgot-password',
      '/reset-password',
      '/selecionar-carreira',
    ]

    if (!profile.cpf && !cpfExemptRoutes.includes(location.pathname)) {
      navigate('/complete-profile', { replace: true })
    }
  }, [loading, user, profile, location.pathname, navigate])

  const establishMockSession = useCallback(() => {
    if (applyMockAuthState(setSession, setUser, setProfile)) {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    if (isMockUserId(user?.id)) {
      mockSignOut()
      setSession(null)
      setUser(null)
      setProfile(null)
      navigate('/')
      return
    }

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('[auth] Erro ao sair:', error.message)
      return
    }

    setProfile(null)
    navigate('/')
  }, [navigate, user?.id])

  const value = useMemo(
    () => ({
      user,
      session,
      profile,
      loading,
      signOut,
      refreshProfile,
      establishMockSession,
    }),
    [user, session, profile, loading, signOut, refreshProfile, establishMockSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
