import { normalizeQuestion } from './normalize-question'
import type { Question, QuestionOptionKey } from '../types/questions'

const bancas = ['VUNESP', 'FGV', 'CESPE', 'IBFC'] as const
const optionKeys: QuestionOptionKey[] = ['A', 'B', 'C', 'D', 'E']

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

export function getQuestionBankSize(totalQuestoes: number): number {
  return Math.min(Math.max(totalQuestoes, 5), 20)
}

export function generateQuestionsForTopico(
  topicoId: string,
  topicoNome: string,
  totalQuestoes: number,
  orgaoCargo: string,
): Question[] {
  const size = getQuestionBankSize(totalQuestoes)
  const seed = hashString(topicoId)

  return Array.from({ length: size }, (_, index) => {
    const n = index + 1
    const mix = seed + n * 17
    const correta = optionKeys[mix % optionKeys.length] ?? 'A'
    const banca = bancas[mix % bancas.length] ?? 'VUNESP'
    const ano = 2018 + (mix % 8)
    const id = `${topicoId}-q${n}`

    return normalizeQuestion(
      {
        id,
        code: `PM-${ano}-${String(n).padStart(3, '0')}`,
        topicoId,
        banca,
        ano,
        orgaoCargo,
        enunciado: `(Questão ${n}) Com base no conteúdo de "${topicoNome.slice(0, 80)}${topicoNome.length > 80 ? '…' : ''}", assinale a alternativa correta.`,
        alternativas: optionKeys.map((key, altIndex) => ({
          key,
          text: `Alternativa ${key} — proposição ${altIndex + 1} relacionada ao tópico do edital PMESP.`,
        })),
        correta,
        gabaritoComentado: `A alternativa correta é ${correta}. Este comentário resume o raciocínio esperado para questões de ${topicoNome.slice(0, 60)} no padrão ${banca}.`,
        resolution: {
          text: `A alternativa correta é ${correta}. Este comentário resume o raciocínio esperado para questões de ${topicoNome.slice(0, 60)} no padrão ${banca}.`,
          videoUrl:
            n % 3 === 0 ? `https://youtube.com/watch?v=mock-${topicoId}-${n}` : undefined,
        },
      },
      orgaoCargo,
    )
  })
}
