import type { CustomApproval, StudentProfileData, StudyStats } from '../types/student-profile'

const STORAGE_PREFIX = 'student-profile'

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}:${userId}`
}

function last7DaysSeed(): StudyStats['last7Days'] {
  const days: StudyStats['last7Days'] = []
  const today = new Date()
  const counts = [18, 24, 32, 28, 45, 38, 45]

  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    days.push({
      date: d.toISOString().slice(0, 10),
      count: counts[6 - i] ?? 20,
    })
  }

  return days
}

export function createDefaultProfile(): StudentProfileData {
  return {
    nomeGuerra: '',
    avatarDataUrl: null,
    customApprovals: [
      {
        id: crypto.randomUUID(),
        title: 'Aprovado na Prova Objetiva Soldado PMESP 2024',
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: 'Aprovado no TAF',
        createdAt: new Date().toISOString(),
      },
    ],
    stats: {
      questionsToday: 45,
      dailyAverage: 32,
      correctRate: 78,
      errorRate: 22,
      last7Days: last7DaysSeed(),
    },
  }
}

export function readStudentProfile(userId: string): StudentProfileData {
  try {
    const raw = localStorage.getItem(storageKey(userId))
    if (!raw) {
      return createDefaultProfile()
    }
    const parsed = JSON.parse(raw) as Partial<StudentProfileData>
    const defaults = createDefaultProfile()
    return {
      nomeGuerra: typeof parsed.nomeGuerra === 'string' ? parsed.nomeGuerra : defaults.nomeGuerra,
      avatarDataUrl:
        typeof parsed.avatarDataUrl === 'string' ? parsed.avatarDataUrl : defaults.avatarDataUrl,
      customApprovals: Array.isArray(parsed.customApprovals)
        ? parsed.customApprovals.filter(
            (a): a is CustomApproval =>
              typeof a === 'object' &&
              a !== null &&
              typeof (a as CustomApproval).id === 'string' &&
              typeof (a as CustomApproval).title === 'string',
          )
        : defaults.customApprovals,
      stats: {
        ...defaults.stats,
        ...(parsed.stats ?? {}),
        last7Days: Array.isArray(parsed.stats?.last7Days)
          ? parsed.stats.last7Days
          : defaults.stats.last7Days,
      },
    }
  } catch {
    return createDefaultProfile()
  }
}

export function writeStudentProfile(userId: string, data: StudentProfileData) {
  localStorage.setItem(storageKey(userId), JSON.stringify(data))
  window.dispatchEvent(new Event('student-profile'))
}

export function subscribeStudentProfile(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange)
  window.addEventListener('student-profile', onStoreChange)
  return () => {
    window.removeEventListener('storage', onStoreChange)
    window.removeEventListener('student-profile', onStoreChange)
  }
}

export function getStudentProfileSnapshot(userId: string) {
  return localStorage.getItem(storageKey(userId)) ?? ''
}
