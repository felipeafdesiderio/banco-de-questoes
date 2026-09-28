import { Check, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'

import { cardBase } from '../../lib/ui-styles'

const proBadgeClass =
  'inline-flex items-center gap-1.5 rounded-full border border-blue-600 bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-blue-950/50'

const cardHoverFree =
  'transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50'

const cardHoverPro =
  'transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20'

const ctaFreeClass =
  'inline-flex w-full items-center justify-center rounded-xl border border-slate-700/80 bg-slate-800/80 py-2.5 font-medium text-slate-200 transition-all duration-200 hover:border-slate-600 hover:bg-slate-700 hover:text-white'

const ctaProClass =
  'inline-flex w-full items-center justify-center rounded-xl bg-blue-600 py-2.5 font-semibold text-white shadow-md shadow-blue-950/50 transition-all duration-200 hover:scale-[1.01] hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30'

type PlanFeature = {
  text: string
  included: boolean
}

const plans = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 'R$ 0',
    period: '/ mês',
    description:
      'Ideal para você conhecer nossa plataforma na prática e sentir total confiança antes de investir R$ 19,90 no seu futuro.',
    features: [
      { text: 'Acesso a 10 questões por dia', included: true },
      { text: 'Sem acesso aos vídeos de instruções', included: false },
      { text: 'Sem gráficos e métricas de desempenho', included: false },
      {
        text: 'Sem acesso ao perfil e histórico de outros alunos',
        included: false,
      },
      { text: 'Sem acesso ao ranking geral de alunos', included: false },
    ] satisfies PlanFeature[],
    cta: 'Criar Conta Grátis',
    ctaTo: '/cadastro',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Plano Pro',
    price: 'R$ 19,90',
    period: '/ mês',
    description: 'Para quem quer acelerar os estudos e não ter limites.',
    features: [
      { text: 'Resolução ilimitada de questões todos os dias', included: true },
      { text: 'Questões exclusivas focadas no edital', included: true },
      {
        text: 'Métricas detalhadas e gráficos avançados de desempenho',
        included: true,
      },
      {
        text: 'Perfil do aluno com ranking de questões e tempo de estudo',
        included: true,
      },
      {
        text: 'Filtros estratégicos por disciplina, banca, ano e assunto',
        included: true,
      },
    ] satisfies PlanFeature[],
    cta: 'Assinar Pro',
    ctaTo: '/cadastro?plan=pro',
    highlighted: true,
    badge: 'Mais Recomendado',
  },
] as const

function FeatureRow({
  feature,
  variant,
}: {
  feature: PlanFeature
  variant: 'free' | 'pro'
}) {
  if (feature.included) {
    return (
      <li className="flex gap-2.5 text-sm leading-snug">
        <Check
          className={`mt-0.5 h-4 w-4 shrink-0 ${
            variant === 'free'
              ? 'text-blue-500 dark:text-emerald-400'
              : 'text-blue-600 dark:text-blue-400'
          }`}
          aria-hidden
        />
        <span className="text-slate-700 dark:text-slate-300">{feature.text}</span>
      </li>
    )
  }

  return (
    <li className="flex gap-2.5 text-sm leading-snug">
      <X
        className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70 dark:text-slate-500"
        aria-hidden
      />
      <span className="text-slate-400 dark:text-slate-500">{feature.text}</span>
    </li>
  )
}

export function PricingPlans() {
  return (
    <section aria-labelledby="pricing-heading">
      <header className="mx-auto mb-4 max-w-2xl text-center sm:mb-6">
        <h1
          id="pricing-heading"
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl"
        >
          Escolha o plano ideal para sua aprovação
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          Transparência total: comece sem pagar nada e assine o Pro quando
          precisar de volume e ferramentas avançadas.
        </p>
      </header>

      <ul className="mx-auto grid max-w-4xl items-stretch gap-4 lg:grid-cols-2 lg:gap-6">
        {plans.map((plan) => (
          <li key={plan.id} className="relative flex h-full flex-col">
            <article
              className={`${cardBase} flex h-full flex-col px-6 py-6 sm:px-7 sm:py-7 ${
                plan.highlighted
                  ? `border-blue-300 ring-2 ring-blue-500/25 dark:border-blue-700 ${cardHoverPro}`
                  : cardHoverFree
              }`}
            >
              {plan.highlighted && 'badge' in plan ? (
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 ${proBadgeClass}`}
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  {plan.badge}
                </span>
              ) : null}

              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                {plan.name}
              </h2>
              <p className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  {plan.price}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {plan.period}
                </span>
              </p>
              <p
                className={`mt-3 line-clamp-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm ${
                  plan.id === 'free' ? 'italic' : ''
                }`}
              >
                {plan.description}
              </p>

              <ul className="mt-4 flex flex-1 flex-col gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                {plan.features.map((feature) => (
                  <FeatureRow
                    key={feature.text}
                    feature={feature}
                    variant={plan.id}
                  />
                ))}
              </ul>

              <Link
                to={plan.ctaTo}
                className={`mt-auto pt-5 ${plan.highlighted ? ctaProClass : ctaFreeClass}`}
              >
                {plan.cta}
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
