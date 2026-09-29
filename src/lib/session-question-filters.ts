import { difficultyMatchesFilter } from './normalize-question'
import type { Question, QuestionAttempt, QuestionSessionFilters } from '../types/questions'

export function applySessionFilters(
  questions: Question[],
  attempts: Record<string, QuestionAttempt>,
  filters: QuestionSessionFilters,
): Question[] {
  return questions.filter((question) => {
    if (!difficultyMatchesFilter(question.difficulty, filters.difficulty)) {
      return false
    }

    const attempt = attempts[question.id]

    switch (filters.status) {
      case 'unanswered':
        return !attempt
      case 'wrong':
        return attempt?.result === 'wrong'
      case 'correct':
        return attempt?.result === 'correct'
      case 'all':
      default:
        return true
    }
  })
}
