import { useMemo, useState } from 'react'

import { AchievementsTab } from '../../components/profile/achievements-tab'
import { ProfileHeader } from '../../components/profile/profile-header'
import { StatsTab } from '../../components/profile/stats-tab'
import { Tabs, type ProfileTabId } from '../../components/profile/tabs'
import { useQuestionAttempts } from '../../hooks/use-question-attempts'
import { useAuth } from '../../hooks/use-auth'
import { useStudentProfile } from '../../hooks/use-student-profile'
import { buildStudyStatsFromAttempts } from '../../lib/study-stats-from-attempts'

const tabs = [
  { id: 'stats' as const, label: 'Estatísticas de Desempenho' },
  { id: 'achievements' as const, label: 'Minhas Aprovações & Conquistas' },
]

export function Perfil() {
  const { profile: authProfile } = useAuth()
  const { profile, setNomeGuerra, setAvatarDataUrl, addCustomApproval, removeCustomApproval } =
    useStudentProfile()
  const { attempts } = useQuestionAttempts()
  const [activeTab, setActiveTab] = useState<ProfileTabId>('stats')

  const liveStats = useMemo(() => buildStudyStatsFromAttempts(attempts), [attempts])

  if (!profile) {
    return (
      <div className="flex flex-1 items-center justify-center py-16 text-sm text-slate-400">
        Carregando perfil...
      </div>
    )
  }

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Área do aluno
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Perfil do Aluno
          </h1>
        </header>

        <ProfileHeader
          fullName={authProfile?.full_name}
          nomeGuerra={profile.nomeGuerra}
          avatarDataUrl={profile.avatarDataUrl}
          onNomeGuerraChange={setNomeGuerra}
          onAvatarChange={setAvatarDataUrl}
        />

        <div className="mt-8 rounded-[1.125rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
            {activeTab === 'stats' ? <StatsTab stats={liveStats} /> : null}
            {activeTab === 'achievements' ? (
              <AchievementsTab
                stats={liveStats}
                customApprovals={profile.customApprovals}
                onAddApproval={addCustomApproval}
                onRemoveApproval={removeCustomApproval}
              />
            ) : null}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
