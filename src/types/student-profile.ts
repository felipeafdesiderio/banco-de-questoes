export type DailyQuestionCount = {
  date: string
  count: number
}

export type StudyStats = {
  questionsToday: number
  dailyAverage: number
  correctRate: number
  errorRate: number
  last7Days: DailyQuestionCount[]
}

export type CustomApproval = {
  id: string
  title: string
  createdAt: string
}

export type PlatformBadge = {
  id: string
  title: string
  description: string
  unlocked: boolean
}

export type StudentProfileData = {
  nomeGuerra: string
  avatarDataUrl: string | null
  customApprovals: CustomApproval[]
  stats: StudyStats
}
