export type EditalIconName =
  | 'BookOpen'
  | 'Calculator'
  | 'Landmark'
  | 'Globe'
  | 'Newspaper'
  | 'Monitor'
  | 'ShieldAlert'
  | 'Brain'
  | 'Users'
  | 'Languages'
  | 'Zap'
  | 'FlaskConical'
  | 'Dna'

export type EditalTopico = {
  id: string
  nome: string
  teoriaUrl: string
  totalQuestoes: number
}

export type EditalDisciplina = {
  id: string
  nome: string
  icone: EditalIconName
  topicos: EditalTopico[]
}

export type EditalMapa = {
  cargo: string
  totalDisciplinas: number
  disciplinas: EditalDisciplina[]
}

/** @deprecated Use EditalMapa */
export type EditalSoldado = EditalMapa

export type CargoConcurso = 'soldado' | 'oficial'
