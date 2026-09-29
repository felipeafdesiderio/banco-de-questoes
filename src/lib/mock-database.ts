import mockDatabaseJson from '../data/mock-database.json'
import editalOficialJson from '../data/edital-oficial.json'
import editalSoldadoJson from '../data/edital-soldado.json'
import type { MockDatabase, MockDatabaseFile } from '../types/mock-database'
import type { TopicMaterial } from '../types/materials'
import type { Question } from '../types/questions'
import { normalizeQuestion } from './normalize-question'
import { generateQuestionsForTopico } from './question-bank'

const file = mockDatabaseJson as MockDatabaseFile

export const mockDatabase: MockDatabase = {
  ...file,
  editais: {
    soldado: editalSoldadoJson as MockDatabase['editais']['soldado'],
    oficial: editalOficialJson as MockDatabase['editais']['oficial'],
  },
}

export function getTopicMaterials(topicoId: string, fallbackTeoriaUrl?: string): TopicMaterial[] {
  const fromDb = file.topicMaterials[topicoId]
  if (fromDb?.length) {
    return fromDb
  }
  if (fallbackTeoriaUrl) {
    return [
      {
        id: `${topicoId}-fallback-yt`,
        type: 'youtube',
        title: 'Videoaula recomendada',
        url: fallbackTeoriaUrl,
      },
    ]
  }
  return []
}

export function getQuestionsForTopico(
  topicoId: string,
  topicoNome: string,
  totalQuestoes: number,
  orgaoCargo: string,
): Question[] {
  const ids = file.questionIdsByTopico[topicoId]
  if (ids?.length) {
    const resolved = ids
      .map((id) => file.questions[id])
      .filter(Boolean)
      .map((q) =>
        normalizeQuestion({ ...q, orgaoCargo: q.orgaoCargo || orgaoCargo }, orgaoCargo),
      )
    if (resolved.length > 0) {
      const extraCount = Math.max(totalQuestoes - resolved.length, 0)
      const generated = generateQuestionsForTopico(
        topicoId,
        topicoNome,
        extraCount,
        orgaoCargo,
      ).map((q, index) => ({
        ...q,
        id: `${topicoId}-gen-${index + 1}`,
      }))
      return [...resolved, ...generated]
    }
  }
  return generateQuestionsForTopico(topicoId, topicoNome, totalQuestoes, orgaoCargo)
}
