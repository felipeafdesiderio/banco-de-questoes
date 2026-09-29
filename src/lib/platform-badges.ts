import type { PlatformBadge, StudyStats } from '../types/student-profile'

export function buildPlatformBadges(stats: StudyStats): PlatformBadge[] {
  const totalWeek = stats.last7Days.reduce((acc, d) => acc + d.count, 0)

  return [
    {
      id: 'questions-100',
      title: '100 Questões Concluídas',
      description: 'Marco de volume de prática na plataforma.',
      unlocked: totalWeek >= 100,
    },
    {
      id: 'streak-7',
      title: 'Constância de 7 dias',
      description: 'Estudou questões todos os dias da semana.',
      unlocked: stats.last7Days.every((d) => d.count > 0),
    },
    {
      id: 'const-master',
      title: 'Mestre em Direito Constitucional',
      description: 'Alto desempenho em tópicos de CF/88.',
      unlocked: stats.correctRate >= 75,
    },
    {
      id: 'accuracy-80',
      title: 'Precisão Tática 80%+',
      description: 'Taxa geral de acertos acima de 80%.',
      unlocked: stats.correctRate >= 80,
    },
  ]
}
