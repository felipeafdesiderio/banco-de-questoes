import { useCallback, useMemo, useSyncExternalStore } from 'react'

import { useAuth } from './use-auth'
import {
  getStudentProfileSnapshot,
  readStudentProfile,
  subscribeStudentProfile,
  writeStudentProfile,
} from '../lib/student-profile-storage'
import type { CustomApproval, StudentProfileData } from '../types/student-profile'

export function useStudentProfile() {
  const { user } = useAuth()
  const userId = user?.id ?? ''

  const snapshot = useSyncExternalStore(
    subscribeStudentProfile,
    () => (userId ? getStudentProfileSnapshot(userId) : ''),
    () => '',
  )

  const profile = useMemo(() => {
    void snapshot
    if (!userId) {
      return null
    }
    return readStudentProfile(userId)
  }, [userId, snapshot])

  const persist = useCallback(
    (next: StudentProfileData) => {
      if (!userId) {
        return
      }
      writeStudentProfile(userId, next)
    },
    [userId],
  )

  const setNomeGuerra = useCallback(
    (nomeGuerra: string) => {
      if (!profile || !userId) {
        return
      }
      persist({ ...profile, nomeGuerra })
    },
    [profile, persist, userId],
  )

  const setAvatarDataUrl = useCallback(
    (avatarDataUrl: string | null) => {
      if (!profile || !userId) {
        return
      }
      persist({ ...profile, avatarDataUrl })
    },
    [profile, persist, userId],
  )

  const addCustomApproval = useCallback(
    (title: string) => {
      if (!profile || !userId || !title.trim()) {
        return
      }
      const entry: CustomApproval = {
        id: crypto.randomUUID(),
        title: title.trim(),
        createdAt: new Date().toISOString(),
      }
      persist({
        ...profile,
        customApprovals: [entry, ...profile.customApprovals],
      })
    },
    [profile, persist, userId],
  )

  const removeCustomApproval = useCallback(
    (id: string) => {
      if (!profile || !userId) {
        return
      }
      persist({
        ...profile,
        customApprovals: profile.customApprovals.filter((a) => a.id !== id),
      })
    },
    [profile, persist, userId],
  )

  return {
    profile,
    setNomeGuerra,
    setAvatarDataUrl,
    addCustomApproval,
    removeCustomApproval,
  }
}
