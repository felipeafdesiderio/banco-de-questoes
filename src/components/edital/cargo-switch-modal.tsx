import { Shield, X } from 'lucide-react'
import { useEffect } from 'react'

import { cardBase } from '../../lib/ui-styles'
import type { CargoConcurso } from '../../types/edital'

type CargoSwitchModalProps = {
  open: boolean
  cargoAtual: CargoConcurso
  onClose: () => void
  onSelect: (cargo: CargoConcurso) => void
}

const options: { id: CargoConcurso; label: string; description: string; available: boolean }[] =
  [
    {
      id: 'soldado',
      label: 'Soldado PMESP',
      description: '7 disciplinas · edital mapeado com teoria e questões por tópico.',
      available: true,
    },
    {
      id: 'oficial',
      label: 'Oficial PMESP (Barro Branco)',
      description: '12 disciplinas · matriz CFO PMESP com teoria e questões por tópico.',
      available: true,
    },
  ]

export function CargoSwitchModal({
  open,
  cargoAtual,
  onClose,
  onSelect,
}: CargoSwitchModalProps) {
  useEffect(() => {
    if (!open) {
      return
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        aria-label="Fechar seleção de cargo"
        onClick={onClose}
      />
      <div
        className={`relative z-10 w-full max-w-md p-6 ${cardBase}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cargo-modal-title"
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2
              id="cargo-modal-title"
              className="text-lg font-semibold text-slate-900 dark:text-slate-50"
            >
              Alternar cargo
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Escolha a carreira para visualizar o edital mapeado.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <ul className="space-y-3">
          {options.map((option) => {
            const selected = cargoAtual === option.id
            return (
              <li key={option.id}>
                <button
                  type="button"
                  disabled={!option.available}
                  onClick={() => {
                    if (option.available) {
                      onSelect(option.id)
                      onClose()
                    }
                  }}
                  className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors duration-300 ${
                    selected
                      ? 'border-blue-600/60 bg-blue-950/30 ring-1 ring-blue-600/40'
                      : 'border-slate-200 bg-white hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-blue-700'
                  } ${!option.available ? 'cursor-not-allowed opacity-60' : ''}`}
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-medium text-slate-900 dark:text-slate-100">
                      {option.label}
                      {selected ? (
                        <span className="ml-2 text-xs font-normal text-blue-600 dark:text-blue-400">
                          (atual)
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-sm text-slate-600 dark:text-slate-400">
                      {option.description}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
