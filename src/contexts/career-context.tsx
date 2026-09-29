import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

import {
  getCareerStorageSnapshot,
  readStoredCargo,
  subscribeCareerStorage,
  writeStoredCargo,
} from '../lib/career-storage'
import { careerBadgeLabel, careerNavLabel } from '../lib/career-labels'
import type { CargoConcurso } from '../types/edital'

type CareerContextValue = {
  cargo: CargoConcurso | null
  hasSelectedCareer: boolean
  navLabel: string | null
  badgeLabel: string | null
  setCareer: (cargo: CargoConcurso) => void
}

const CareerContext = createContext<CareerContextValue | null>(null)

type CareerProviderProps = {
  children: ReactNode
}

export function CareerProvider({ children }: CareerProviderProps) {
  const snapshot = useSyncExternalStore(
    subscribeCareerStorage,
    getCareerStorageSnapshot,
    getCareerStorageSnapshot,
  )

  const cargo = useMemo(() => {
    void snapshot
    return readStoredCargo()
  }, [snapshot])

  const hasSelectedCareer = cargo !== null

  const setCareer = useCallback((next: CargoConcurso) => {
    writeStoredCargo(next)
  }, [])

  const value = useMemo(
    (): CareerContextValue => ({
      cargo,
      hasSelectedCareer,
      navLabel: cargo ? careerNavLabel[cargo] : null,
      badgeLabel: cargo ? careerBadgeLabel[cargo] : null,
      setCareer,
    }),
    [cargo, hasSelectedCareer, setCareer],
  )

  return <CareerContext.Provider value={value}>{children}</CareerContext.Provider>
}

export function useCareer() {
  const ctx = useContext(CareerContext)
  if (!ctx) {
    throw new Error('useCareer deve ser usado dentro de CareerProvider')
  }
  return ctx
}
