export type QuestionOptionKey = 'A' | 'B' | 'C' | 'D' | 'E'

export type QuestionOption = {
  key: QuestionOptionKey
  text: string
}

export type QuestionDifficulty = 'Fácil' | 'Médio' | 'Difícil'

export type QuestionResolution = {
  text?: string
  videoUrl?: string
}

export type Question = {
  id: string
  code: string
  topicoId: string
  banca: string
  ano: number
  orgaoCargo: string
  difficulty: QuestionDifficulty
  enunciado: string
  imageUrl?: string | null
  alternativas: QuestionOption[]
  correta: QuestionOptionKey
  resolution: QuestionResolution
  /** Legado — migrado para resolution.text quando ausente */
  gabaritoComentado?: string
}

export type QuestionStatusFilter = 'all' | 'unanswered' | 'wrong' | 'correct'

export type QuestionDifficultyFilter = 'all' | 'facil' | 'medio' | 'dificil'

export type QuestionSessionFilters = {
  status: QuestionStatusFilter
  difficulty: QuestionDifficultyFilter
}

export const DEFAULT_SESSION_FILTERS: QuestionSessionFilters = {
  status: 'all',
  difficulty: 'all',
}

export type QuestionAttemptResult = 'correct' | 'wrong'

export type QuestionAttempt = {
  result: QuestionAttemptResult
  answeredAt: string
}
