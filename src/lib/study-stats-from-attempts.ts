import type { QuestionAttempt } from '../types/questions'
import type { StudyStats } from '../types/student-profile'

function dayKey(iso: string) {
  return iso.slice(0, 10)
}

export function buildStudyStatsFromAttempts(
  attempts: Record<string, QuestionAttempt>,
): StudyStats {
  const values = Object.values(attempts)
  const today = dayKey(new Date().toISOString())

  const questionsToday = values.filter((a) => dayKey(a.answeredAt) === today).length

  const last7Days: StudyStats['last7Days'] = []
  const countsByDay = new Map<string, number>()
  for (const attempt of values) {
    const key = dayKey(attempt.answeredAt)
    countsByDay.set(key, (countsByDay.get(key) ?? 0) + 1)
  }

  const base = new Date()
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date(base)
    d.setDate(base.getDate() - i)
    const key = dayKey(d.toISOString())
    last7Days.push({ date: key, count: countsByDay.get(key) ?? 0 })
  }

  const total = values.length
  const correct = values.filter((a) => a.result === 'correct').length
  const wrong = values.filter((a) => a.result === 'wrong').length
  const correctRate = total > 0 ? Math.round((correct / total) * 100) : 0
  const errorRate = total > 0 ? Math.round((wrong / total) * 100) : 0
  const dailyAverage =
    last7Days.length > 0
      ? Math.round(last7Days.reduce((acc, d) => acc + d.count, 0) / last7Days.length)
      : 0

  return {
    questionsToday,
    dailyAverage,
    correctRate,
    errorRate,
    last7Days,
  }
}
