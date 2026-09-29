import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EditalHeader } from '../../components/edital/edital-header'
import { SubjectAccordion } from '../../components/edital/subject-accordion'
import { TheoryModal } from '../../components/edital/theory-modal'
import { useCareer } from '../../contexts/career-context'
import { useEditalProgress } from '../../hooks/use-edital-progress'
import { getEditalByCargo } from '../../lib/edital-data'
import type { CargoConcurso, EditalDisciplina, EditalTopico } from '../../types/edital'

export function Estudar() {
  const navigate = useNavigate()
  const { cargo } = useCareer()
  const activeCargo: CargoConcurso = cargo ?? 'soldado'

  const edital = useMemo(() => getEditalByCargo(activeCargo), [activeCargo])

  const [theoryTopico, setTheoryTopico] = useState<EditalTopico | null>(null)
  const [theoryDisciplina, setTheoryDisciplina] = useState<EditalDisciplina | null>(null)

  const { percent, studiedCount, totalTopicos, markTopicoStudied, isTopicoStudied } =
    useEditalProgress(activeCargo, edital.disciplinas)

  function handleOpenTheory(topico: EditalTopico, disciplina: EditalDisciplina) {
    setTheoryTopico(topico)
    setTheoryDisciplina(disciplina)
  }

  function handleOpenPractice(topico: EditalTopico) {
    markTopicoStudied(topico.id)
    navigate(`/questoes?topico=${encodeURIComponent(topico.id)}&indice=0`)
  }

  function closeTheory() {
    setTheoryTopico(null)
    setTheoryDisciplina(null)
  }

  if (!cargo) {
    return null
  }

  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <EditalHeader
        editalTitulo={edital.cargo}
        totalDisciplinas={edital.totalDisciplinas}
        progressPercent={percent}
        totalTopicos={totalTopicos}
        studiedTopicos={studiedCount}
      />

      <div className="mt-8">
        <SubjectAccordion
          key={cargo}
          disciplinas={edital.disciplinas}
          isTopicoStudied={isTopicoStudied}
          onOpenTheory={handleOpenTheory}
          onOpenPractice={handleOpenPractice}
        />
      </div>

      <TheoryModal
        open={Boolean(theoryTopico)}
        topico={theoryTopico}
        disciplinaNome={theoryDisciplina?.nome}
        onClose={closeTheory}
      />
    </div>
  )
}
