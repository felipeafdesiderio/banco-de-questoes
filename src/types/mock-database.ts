import type { EditalMapa } from './edital'
import type { TopicMaterial } from './materials'
import type { Question, QuestionDifficulty, QuestionResolution } from './questions'

/** Questão persistida no JSON — campos derivados preenchidos em runtime via normalizeQuestion */
export type StoredQuestion = Omit<Question, 'code' | 'difficulty' | 'resolution'> & {
  code?: string
  difficulty?: QuestionDifficulty
  resolution?: QuestionResolution
  gabaritoComentado?: string
}

/**
 * Modelo de referência para migração ao banco relacional.
 * Entidades de usuário (tentativas, perfil) ficam em localStorage com o mesmo shape documentado em `userStateSchema`.
 */
export type MockDatabaseFile = {
  version: number
  meta: {
    description: string
    editalSources: string[]
    questionEntitySchema?: {
      code: string
      difficulty: string
      resolution: { text: string; videoUrl: string }
    }
  }
  topicMaterials: Record<string, TopicMaterial[]>
  questions: Record<string, StoredQuestion>
  questionIdsByTopico: Record<string, string[]>
  userStateSchema: {
    questions?: string
    questionAttempts: 'Record<questionId, { result, answeredAt }>'
    studentProfile: 'nomeGuerra, avatarDataUrl, customApprovals, stats'
    careerSelection: 'soldado | oficial'
    editalProgress: 'topicoId[]'
  }
}

export type MockDatabase = MockDatabaseFile & {
  editais: {
    soldado: EditalMapa
    oficial: EditalMapa
  }
}
