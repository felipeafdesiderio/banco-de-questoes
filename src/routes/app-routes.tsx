import { Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from '../components/protected-route/protected-route'
import { CompleteProfile } from '../pages/complete-profile/complete-profile'
import { ForgotPassword } from '../pages/forgot-password/forgot-password'
import { Home } from '../pages/home/home'
import { Plans } from '../pages/plans/plans'
import { Login } from '../pages/login/login'
import { Register } from '../pages/register/register'
import { ResetPassword } from '../pages/reset-password/reset-password'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
    </Routes>
  )
}
