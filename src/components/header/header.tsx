import { BookOpen, LogOut, User, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../hooks/use-auth'
import { btnHeaderEntrar, btnPrimary, btnSecondarySm } from '../../lib/ui-styles'
import { CareerNavSelector } from './career-nav-selector'

export function Header() {
  const { user, loading, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Banco de Questões
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {loading ? (
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Carregando...
            </span>
          ) : user ? (
            <>
              <CareerNavSelector />
              <Link
                to="/perfil"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <User className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">Perfil</span>
              </Link>
              <button
                type="button"
                onClick={() => void signOut()}
                className={btnSecondarySm}
              >
                <LogOut className="h-4 w-4" aria-hidden />
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={btnHeaderEntrar}>
                Entrar
              </Link>
              <Link to="/register" className={btnPrimary}>
                <UserPlus className="h-4 w-4" aria-hidden />
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
