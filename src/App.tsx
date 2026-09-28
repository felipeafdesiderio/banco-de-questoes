import { BrowserRouter } from 'react-router-dom'

import { Footer } from './components/footer/footer'
import { Header } from './components/header/header'
import { SupabaseConfigAlert } from './components/supabase-config-alert/supabase-config-alert'
import { AuthProvider } from './contexts/auth-context'
import { isSupabaseConfigured } from './lib/supabase'
import { AppRoutes } from './routes/app-routes'

function AppWithoutSupabase() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
      <SupabaseConfigAlert />
      <main className="flex flex-1 items-center justify-center px-4">
        <p className="max-w-md text-center text-sm">
          Configure o arquivo{' '}
          <code className="rounded-lg bg-white px-1.5 py-0.5 text-sm text-blue-600 dark:bg-slate-900 dark:text-blue-400">
            .env
          </code>{' '}
          e reinicie o servidor de desenvolvimento para carregar a aplicação.
        </p>
      </main>
    </div>
  )
}

function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
      <Header />
      <main className="flex w-full flex-1 flex-col">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

function AppWithRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  )
}

function App() {
  return isSupabaseConfigured ? <AppWithRouter /> : <AppWithoutSupabase />
}

export default App
