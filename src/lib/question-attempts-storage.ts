import type { QuestionAttempt, QuestionAttemptResult } from '../types/questions'

const PREFIX = 'question-attempts'

function key(userId: string) {
  return `${PREFIX}:${userId}`
}

export function readQuestionAttempts(userId: string): Record<string, QuestionAttempt> {
  try {
    const raw = localStorage.getItem(key(userId))
    if (!raw) {
      return {}
    }
    const parsed = JSON.parse(raw) as Record<string, QuestionAttempt>
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function writeQuestionAttempts(userId: string, data: Record<string, QuestionAttempt>) {
  localStorage.setItem(key(userId), JSON.stringify(data))
  window.dispatchEvent(new Event('question-attempts'))
}

export function recordQuestionAttempt(
  userId: string,
  questionId: string,
  result: QuestionAttemptResult,
) {
  const current = readQuestionAttempts(userId)
  current[questionId] = {
    result,
    answeredAt: new Date().toISOString(),
  }
  writeQuestionAttempts(userId, current)
}

export function subscribeQuestionAttempts(onChange: () => void) {
  window.addEventListener('storage', onChange)
  window.addEventListener('question-attempts', onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener('question-attempts', onChange)
  }
}

export function getQuestionAttemptsSnapshot(userId: string) {
  return localStorage.getItem(key(userId)) ?? ''
}
