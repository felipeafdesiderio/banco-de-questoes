import {
  ArrowRight,
  BookOpen,
  Crosshair,
  Sparkles,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  badgeClass,
  btnPrimaryLg,
  btnSecondaryLg,
  cardBase,
  heroGlow,
  heroImageClass,
  heroImageWrap,
  pillarCardClass,
  sectionDivider,
} from '../../lib/ui-styles'

const heroImageBadges = [
  'Edital 100% Mapeado',
  'Praça & Oficial',
] as const

const manifestoPillars = [
  {
    icon: BookOpen,
    title: 'Teoria + Prática',
    description:
      'Edital tópico a tópico, material gratuito indicado e questões na sequência para fixar.',
  },
  {
    icon: Crosshair,
    title: 'Foco PMESP',
    description:
      '100% direcionado à carreira de Praça e Oficialato — sem dispersão.',
  },
  {
    icon: Zap,
    title: 'Sem Atalhos',
    description:
      'Volume de resolução até a fixação. Disciplina diária até a aprovação.',
  },
] as const

export function HeroManifest() {
  return (
    <>
      <section className={`w-full ${sectionDivider} bg-slate-50 dark:bg-slate-950`}>
        <div className="mx-auto grid w-full max-w-6xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28 lg:px-8">
          <div className="flex flex-col items-start gap-8">
            <span className={badgeClass}>
              <Crosshair className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" aria-hidden />
              100% Focado na PMESP
            </span>

            <div className="space-y-5">
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl lg:text-[3.25rem]">
                Sua farda na PMESP começa aqui.
              </h1>
              <p className="max-w-lg text-lg leading-relaxed">
                Banco completo para carreiras de{' '}
                <strong className="font-semibold text-slate-900 dark:text-slate-50">
                  Praça e Oficialato
                </strong>
                : edital mapeado tópico a tópico e avalanches de questões
                direcionadas para você fixar conteúdo de verdade.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link to="/register" className={btnPrimaryLg}>
                Começar a Estudar
                <ArrowRight className="h-4 w-4 opacity-90" aria-hidden />
              </Link>
              <Link to="/planos" className={btnSecondaryLg}>
                Conhecer Planos
              </Link>
            </div>
          </div>

          <div className="relative lg:justify-self-end">
            <div className={heroGlow} aria-hidden />
            <div className={`${heroImageWrap} relative z-10 mx-auto max-w-md lg:max-w-none`}>
              <img
                src="/images/pmesp-hero.jpg"
                alt="Policial militar em uniforme da PMESP"
                className={`${heroImageClass} aspect-[4/5] sm:aspect-[5/6]`}
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="mx-auto mt-5 flex max-w-md flex-wrap gap-2 lg:max-w-none">
              {heroImageBadges.map((label) => (
                <span key={label} className={badgeClass}>
                  <Sparkles
                    className="h-3 w-3 text-blue-600/80 dark:text-blue-400/80"
                    aria-hidden
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="manifesto"
        className={`w-full scroll-mt-24 ${sectionDivider} bg-white dark:bg-slate-900`}
        aria-labelledby="manifesto-heading"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <header className="mx-auto mb-14 max-w-2xl text-center lg:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              O MANIFESTO
            </p>
            <h2
              id="manifesto-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-[2.75rem]"
            >
              Somente o Papiro liberta
            </h2>
            <p className="mt-4 text-base leading-relaxed">
              Metodologia direta para quem precisa de resultado — sem cursinho
              caro e sem promessa vazia.
            </p>
          </header>

          <div className={`${cardBase} overflow-hidden`}>
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[16rem] border-b border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800/80 lg:min-h-[28rem] lg:border-b-0 lg:border-r">
                <img
                  src="/images/pmesp-manifesto.jpg"
                  alt="Operação policial — dedicação e disciplina PMESP"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-12">
                <p className="text-base leading-relaxed">
                  Este banco existe para quem precisa{' '}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    mudar de vida
                  </strong>{' '}
                  sem quebrar com cursinho caro. Você não precisa de promessa
                  milagrosa — precisa de{' '}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    rota clara, material acessível e volume de prática
                  </strong>
                  .
                </p>
                <p className="text-base leading-relaxed">
                  Este é o{' '}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    único banco de questões focado 100% no seu concurso
                  </strong>
                  . Além de{' '}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    questões inéditas e exclusivas
                  </strong>
                  , entregamos indicação de{' '}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    teoria gratuita direcionada
                  </strong>{' '}
                  e te ajudamos a estruturar o seu próprio plano de estudos. Sem
                  rotinas engessadas do tipo &quot;Matemática na segunda, Geografia na
                  terça&quot;: mostramos o método certo para{' '}
                  <strong className="font-semibold text-slate-900 dark:text-white">
                    você adaptar à sua realidade
                  </strong>
                  .
                </p>
                <blockquote className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-base italic leading-relaxed text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                  <strong className="font-semibold not-italic text-slate-900 dark:text-white">
                    Disciplina bate sorte. Faça o básico bem feito, todos os
                    dias, sem procurar atalho — quem dá mais o gás, vence. É
                    assim que a farda chega.
                  </strong>
                </blockquote>
              </div>
            </div>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-3 lg:mt-16">
            {manifestoPillars.map(({ icon: Icon, title, description }) => (
              <li key={title} className={pillarCardClass}>
                <Icon className="mb-4 h-7 w-7 text-blue-600 dark:text-blue-400" aria-hidden />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
