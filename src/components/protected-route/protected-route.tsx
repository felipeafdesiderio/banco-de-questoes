import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useCareer } from '../../contexts/career-context'
import { useAuth } from '../../hooks/use-auth'
import type { UserRole } from '../../types/database'

type ProtectedRouteProps = {
  children: ReactNode
  requireAuth?: boolean
  requireCareer?: boolean
  redirectIfAuth?: boolean
  allowedRoles?: UserRole[]
}

export function ProtectedRoute({
  children,
  requireAuth = false,
  requireCareer = false,
  redirectIfAuth = false,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()
  const { hasSelectedCareer } = useCareer()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center py-16 text-sm text-muted">
        Carregando...
      </div>
    )
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (redirectIfAuth && user) {
    const target = hasSelectedCareer ? '/estudar' : '/selecionar-carreira'
    return <Navigate to={target} replace />
  }

  if (requireAuth && user && requireCareer && !hasSelectedCareer) {
    return <Navigate to="/selecionar-carreira" state={{ from: location }} replace />
  }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    (!profile?.role || !allowedRoles.includes(profile.role))
  ) {
    return <Navigate to="/" replace />
  }

  return children
}
