import { useCareer } from '../contexts/career-context'
import type { CargoConcurso } from '../types/edital'

/** @deprecated Prefer useCareer() */
export function useEditalCargo(): {
  cargo: CargoConcurso
  setCargo: (cargo: CargoConcurso) => void
} {
  const { cargo, setCareer } = useCareer()
  if (!cargo) {
    return {
      cargo: 'soldado',
      setCargo: setCareer,
    }
  }
  return { cargo, setCargo: setCareer }
}
