import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { badgeClass } from '../../lib/ui-styles'
import type { CargoConcurso } from '../../types/edital'
import { CargoSwitchModal } from './cargo-switch-modal'

type CargoSelectorProps = {
  cargo: CargoConcurso
  cargoLabel: string
  onCargoChange: (cargo: CargoConcurso) => void
}

export function CargoSelector({ cargo, cargoLabel, onCargoChange }: CargoSelectorProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`${badgeClass} ring-1 ring-blue-600/30 dark:ring-blue-500/40`}
          aria-live="polite"
        >
          Cargo: <strong className="font-semibold">{cargoLabel}</strong>
        </span>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-600 transition-colors duration-300 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          Alternar cargo
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>

      <CargoSwitchModal
        open={modalOpen}
        cargoAtual={cargo}
        onClose={() => setModalOpen(false)}
        onSelect={onCargoChange}
      />
    </>
  )
}
