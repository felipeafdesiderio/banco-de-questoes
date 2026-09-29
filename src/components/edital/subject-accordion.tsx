import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { getEditalDisciplineIcon } from '../../lib/edital-icons'
import type { EditalDisciplina, EditalTopico } from '../../types/edital'
import { TopicItem } from './topic-item'

type SubjectAccordionProps = {
  disciplinas: EditalDisciplina[]
  isTopicoStudied: (topicoId: string) => boolean
  onOpenTheory: (topico: EditalTopico, disciplina: EditalDisciplina) => void
  onOpenPractice: (topico: EditalTopico) => void
}

export function SubjectAccordion({
  disciplinas,
  isTopicoStudied,
  onOpenTheory,
  onOpenPractice,
}: SubjectAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(disciplinas[0]?.id ? [disciplinas[0].id] : []),
  )

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="space-y-3">
      {disciplinas.map((disciplina) => {
        const Icon = getEditalDisciplineIcon(disciplina.icone)
        const isOpen = openIds.has(disciplina.id)
        const totalTopicos = disciplina.topicos.length
        const totalQuestoes = disciplina.topicos.reduce((acc, t) => acc + t.totalQuestoes, 0)
        const panelId = `disciplina-panel-${disciplina.id}`
        const triggerId = `disciplina-trigger-${disciplina.id}`

        return (
          <section
            key={disciplina.id}
            className="overflow-hidden rounded-[1.125rem] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(disciplina.id)}
              className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 sm:px-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-950/50 ring-1 ring-blue-800/40 dark:bg-blue-950/60">
                <Icon className="h-5 w-5 text-blue-400" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-slate-900 dark:text-slate-50">
                  {disciplina.nome}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                  {totalTopicos} tópicos · {totalQuestoes} questões
                </span>
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden
              />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <ul className="space-y-3 border-t border-slate-200 px-4 py-4 dark:border-slate-800 sm:px-5">
                  {disciplina.topicos.map((topico) => (
                    <TopicItem
                      key={topico.id}
                      topico={topico}
                      studied={isTopicoStudied(topico.id)}
                      onOpenTheory={(t) => onOpenTheory(t, disciplina)}
                      onOpenPractice={onOpenPractice}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
