import { Navigate, Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from '../components/protected-route/protected-route'
import { CompleteProfile } from '../pages/complete-profile/complete-profile'
import { ForgotPassword } from '../pages/forgot-password/forgot-password'
import { Home } from '../pages/home/home'
import { Plans } from '../pages/plans/plans'
import { Login } from '../pages/login/login'
import { Register } from '../pages/register/register'
import { ResetPassword } from '../pages/reset-password/reset-password'
import { Estudar } from '../pages/estudar/estudar'
import { Questoes } from '../pages/questoes/questoes'
import { Perfil } from '../pages/perfil/perfil'
import { SelecionarCarreira } from '../pages/selecionar-carreira/selecionar-carreira'

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute redirectIfAuth>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/planos" element={<Plans />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute redirectIfAuth>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute redirectIfAuth>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cadastro"
        element={
          <ProtectedRoute redirectIfAuth>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/complete-profile"
        element={
          <ProtectedRoute requireAuth>
            <CompleteProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/selecionar-carreira"
        element={
          <ProtectedRoute requireAuth>
            <SelecionarCarreira />
          </ProtectedRoute>
        }
      />
      <Route
        path="/estudar"
        element={
          <ProtectedRoute requireAuth requireCareer>
            <Estudar />
          </ProtectedRoute>
        }
      />
      <Route path="/edital" element={<Navigate to="/estudar" replace />} />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute requireAuth requireCareer>
            <Perfil />
          </ProtectedRoute>
        }
      />
      <Route path="/profile" element={<Navigate to="/perfil" replace />} />
      <Route
        path="/questoes"
        element={
          <ProtectedRoute requireAuth requireCareer>
            <Questoes />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
