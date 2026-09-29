import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useCareer } from '../../contexts/career-context'
import { careerNavLabel } from '../../lib/career-labels'

export function CareerNavSelector() {
  const navigate = useNavigate()
  const { cargo, hasSelectedCareer, setCareer, navLabel } = useCareer()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  function switchCareer(next: 'soldado' | 'oficial') {
    setCareer(next)
    setOpen(false)
    navigate('/estudar')
  }

  if (!hasSelectedCareer || !cargo || !navLabel) {
    return (
      <Link
        to="/selecionar-carreira"
        className="inline-flex max-w-[11rem] items-center gap-1.5 truncate rounded-lg border border-blue-800/50 bg-blue-950/40 px-2.5 py-1.5 text-xs font-medium text-blue-200 transition-colors hover:bg-blue-950/70 sm:max-w-none sm:text-sm"
      >
        Escolher carreira
      </Link>
    )
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex max-w-[10.5rem] items-center gap-1 truncate rounded-lg border border-slate-700/80 bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors duration-300 hover:border-blue-700 hover:bg-slate-800 sm:max-w-[13rem] sm:text-sm"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="truncate">{navLabel}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 py-1 shadow-xl shadow-black/40"
        >
          {(['soldado', 'oficial'] as const).map((id) => {
            const active = cargo === id
            return (
              <button
                key={id}
                type="button"
                role="menuitem"
                onClick={() => switchCareer(id)}
                className={`flex w-full px-3 py-2.5 text-left text-sm transition-colors hover:bg-slate-800 ${
                  active ? 'bg-blue-950/40 text-blue-200' : 'text-slate-200'
                }`}
              >
                {careerNavLabel[id]}
                {active ? (
                  <span className="ml-auto text-xs text-blue-400">Ativo</span>
                ) : null}
              </button>
            )
          })}
          <div className="my-1 h-px bg-slate-800" />
          <Link
            to="/selecionar-carreira"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-3 py-2.5 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          >
            Ver tela de carreiras
          </Link>
        </div>
      ) : null}
    </div>
  )
}
