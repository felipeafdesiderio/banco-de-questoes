import type { CargoConcurso } from '../types/edital'

export const careerNavLabel: Record<CargoConcurso, string> = {
  soldado: '🛡️ Soldado PMESP',
  oficial: '⚔️ Oficial PMESP',
}

export const careerBadgeLabel: Record<CargoConcurso, string> = {
  soldado: 'Soldado PMESP',
  oficial: 'Oficial (Barro Branco)',
}

export function getPostAuthPath(hasCareer: boolean, fallback = '/'): string {
  if (!hasCareer) {
    return '/selecionar-carreira'
  }
  return fallback
}
