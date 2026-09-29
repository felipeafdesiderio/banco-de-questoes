import { useNavigate } from 'react-router-dom'

import { CareerSelectionCard } from '../../components/career/career-selection-card'
import { useCareer } from '../../contexts/career-context'

const soldadoImage = '/images/careers/soldado-pmesp.jpg'
const oficialImage = '/images/careers/oficial-pmesp.jpg'

export function SelecionarCarreira() {
  const navigate = useNavigate()
  const { setCareer } = useCareer()

  function selectSoldado() {
    setCareer('soldado')
    navigate('/estudar', { replace: true })
  }

  function selectOficial() {
    setCareer('oficial')
    navigate('/estudar', { replace: true })
  }

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Onboarding
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
            Escolha o seu Foco de Estudo
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Você pode alternar entre as carreiras a qualquer momento no seu painel.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <CareerSelectionCard
            imageSrc={soldadoImage}
            imageAlt="Policial militar tático da PMESP em operação noturna"
            badge="Nível Médio"
            title="Soldado PMESP"
            summary="8 Disciplinas Mapeadas | Questões por Tópico | Material Teórico Gratuito."
            cta="Estudar para Soldado"
            onSelect={selectSoldado}
          />
          <CareerSelectionCard
            imageSrc={oficialImage}
            imageAlt="Cadetes oficiais da Academia de Polícia Militar do Barro Branco"
            badge="Nível Médio / CFO"
            title="Oficial PMESP (Barro Branco)"
            summary="12 Disciplinas Mapeadas (Inclui Exatas, Filosofia e Sociologia) | Questões e Teoria."
            cta="Estudar para Oficial"
            onSelect={selectOficial}
          />
        </div>
      </div>
    </div>
  )
}
