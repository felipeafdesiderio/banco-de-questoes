import type { UserRole } from './database'
import type { CargoConcurso, EditalMapa } from './edital'
import type { TopicMaterial } from './materials'
import type { Question, QuestionAttempt, QuestionDifficulty, QuestionResolution } from './questions'

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
  testAccount?: MockTestAccount
  userStateSchema: {
    questions?: string
    questionAttempts: 'Record<questionId, { result, answeredAt }>'
    studentProfile: 'nomeGuerra, avatarDataUrl, customApprovals, stats'
    careerSelection: 'soldado | oficial'
    editalProgress: 'topicoId[]'
  }
}

export type MockTestAccount = {
  id: string
  email: string
  password: string
  profile: {
    full_name: string
    cpf: string
    role: UserRole
  }
  nomeGuerra: string
  career: CargoConcurso
  editalProgressSoldado: string[]
  questionAttempts: Record<string, QuestionAttempt>
}

export type MockDatabase = MockDatabaseFile & {
  editais: {
    soldado: EditalMapa
    oficial: EditalMapa
  }
}
