import { mockDatabase } from './mock-database'
import type { CargoConcurso, EditalDisciplina, EditalMapa, EditalTopico } from '../types/edital'

export const editalSoldado = mockDatabase.editais.soldado
export const editalOficial = mockDatabase.editais.oficial

const editaisByCargo: Record<CargoConcurso, EditalMapa> = {
  soldado: editalSoldado,
  oficial: editalOficial,
}

export function getEditalByCargo(cargo: CargoConcurso): EditalMapa {
  return editaisByCargo[cargo]
}

export function countEditalTopicos(disciplinas: EditalDisciplina[]): number {
  return disciplinas.reduce((acc, d) => acc + d.topicos.length, 0)
}

export function countEditalQuestoes(disciplinas: EditalDisciplina[]): number {
  return disciplinas.reduce(
    (acc, d) => acc + d.topicos.reduce((tAcc, t) => tAcc + t.totalQuestoes, 0),
    0,
  )
}

export function listTopicoIds(disciplinas: EditalDisciplina[]): string[] {
  return disciplinas.flatMap((d) => d.topicos.map((t) => t.id))
}

export function findTopicoById(topicoId: string): {
  topico: EditalTopico
  disciplina: EditalDisciplina
  cargo: CargoConcurso
} | null {
  for (const cargo of Object.keys(editaisByCargo) as CargoConcurso[]) {
    const edital = editaisByCargo[cargo]
    for (const disciplina of edital.disciplinas) {
      const topico = disciplina.topicos.find((t) => t.id === topicoId)
      if (topico) {
        return { topico, disciplina, cargo }
      }
    }
  }
  return null
}
