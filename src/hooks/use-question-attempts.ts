import { useCallback, useMemo, useSyncExternalStore } from 'react'

import { useAuth } from './use-auth'
import {
  getQuestionAttemptsSnapshot,
  readQuestionAttempts,
  recordQuestionAttempt,
  subscribeQuestionAttempts,
} from '../lib/question-attempts-storage'
import type { QuestionAttemptResult } from '../types/questions'

export function useQuestionAttempts() {
  const { user } = useAuth()
  const userId = user?.id ?? ''

  const snapshot = useSyncExternalStore(
    subscribeQuestionAttempts,
    () => (userId ? getQuestionAttemptsSnapshot(userId) : ''),
    () => '',
  )

  const attempts = useMemo(() => {
    void snapshot
    if (!userId) {
      return {}
    }
    return readQuestionAttempts(userId)
  }, [userId, snapshot])

  const saveAttempt = useCallback(
    (questionId: string, result: QuestionAttemptResult) => {
      if (!userId) {
        return
      }
      recordQuestionAttempt(userId, questionId, result)
    },
    [userId],
  )

  return { attempts, saveAttempt }
}
