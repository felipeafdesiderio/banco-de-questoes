import type { CargoConcurso } from '../types/edital'

export const CARGO_STORAGE_KEY = 'edital-cargo-selecionado'

export function readStoredCargo(): CargoConcurso | null {
  try {
    const raw = localStorage.getItem(CARGO_STORAGE_KEY)
    if (raw === 'soldado' || raw === 'oficial') {
      return raw
    }
  } catch {
    /* ignore */
  }
  return null
}

export function hasStoredCareer(): boolean {
  return readStoredCargo() !== null
}

export function writeStoredCargo(cargo: CargoConcurso) {
  localStorage.setItem(CARGO_STORAGE_KEY, cargo)
  window.dispatchEvent(new Event('edital-cargo'))
}

export function subscribeCareerStorage(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange)
  window.addEventListener('edital-cargo', onStoreChange)
  return () => {
    window.removeEventListener('storage', onStoreChange)
    window.removeEventListener('edital-cargo', onStoreChange)
  }
}

export function getCareerStorageSnapshot() {
  return localStorage.getItem(CARGO_STORAGE_KEY) ?? ''
}
