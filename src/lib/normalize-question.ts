import type {
  Question,
  QuestionDifficulty,
  QuestionResolution,
  QuestionSessionFilters,
} from '../types/questions'

const difficulties: QuestionDifficulty[] = ['Fácil', 'Médio', 'Difícil']

function pickDifficulty(seed: number): QuestionDifficulty {
  return difficulties[seed % difficulties.length] ?? 'Médio'
}

type RawQuestion = Partial<Question> & {
  id: string
  topicoId: string
  enunciado: string
  alternativas: Question['alternativas']
  correta: Question['correta']
}

export function normalizeQuestion(raw: RawQuestion, fallbackOrgan?: string): Question {
  const resolution: QuestionResolution = raw.resolution ?? {
    text: raw.gabaritoComentado ?? '',
    videoUrl: undefined,
  }

  if (!resolution.text && raw.gabaritoComentado) {
    resolution.text = raw.gabaritoComentado
  }

  const seed = raw.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)

  return {
    id: raw.id,
    code: raw.code ?? `Q-${raw.id.replace(/[^a-z0-9-]/gi, '').toUpperCase().slice(0, 12)}`,
    topicoId: raw.topicoId,
    banca: raw.banca ?? 'VUNESP',
    ano: raw.ano ?? 2023,
    orgaoCargo: raw.orgaoCargo ?? fallbackOrgan ?? 'PMESP',
    difficulty: raw.difficulty ?? pickDifficulty(seed),
    enunciado: raw.enunciado,
    imageUrl: raw.imageUrl ?? null,
    alternativas: raw.alternativas,
    correta: raw.correta,
    resolution,
    gabaritoComentado: raw.gabaritoComentado,
  }
}

export function difficultyMatchesFilter(
  difficulty: QuestionDifficulty,
  filter: QuestionSessionFilters['difficulty'],
): boolean {
  if (filter === 'all') {
    return true
  }
  const map = {
    facil: 'Fácil',
    medio: 'Médio',
    dificil: 'Difícil',
  } as const
  return difficulty === map[filter]
}
