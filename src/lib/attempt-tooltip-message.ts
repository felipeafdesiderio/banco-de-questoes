import type { QuestionAttempt } from '../types/questions'

function formatDateParts(iso: string) {
  const date = new Date(iso)
  return {
    data: date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    hora: date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  }
}

/** Texto do tooltip conforme primeira tentativa ou refação da questão. */
export function buildAttemptTooltipMessage(
  current: QuestionAttempt,
  previous?: QuestionAttempt,
): string {
  const { data, hora } = formatDateParts(current.answeredAt)

  if (!previous) {
    return current.result === 'correct'
      ? `✅ Você acertou esta questão em ${data} às ${hora}`
      : `❌ Você errou esta questão em ${data} às ${hora}`
  }

  const prev = formatDateParts(previous.answeredAt)

  if (previous.result === 'wrong' && current.result === 'correct') {
    return `Parabéns! Você acertou esta questão que havia errado em ${prev.data} às ${prev.hora}.`
  }

  if (previous.result === 'wrong' && current.result === 'wrong') {
    return `Atenção: Você errou esta questão novamente. (Último erro em ${prev.data} às ${prev.hora}).`
  }

  if (previous.result === 'correct' && current.result === 'correct') {
    return `Excelente! Mantendo o domínio (Acertado anteriormente em ${prev.data}).`
  }

  return `❌ Você errou esta questão em ${data} às ${hora}`
}
