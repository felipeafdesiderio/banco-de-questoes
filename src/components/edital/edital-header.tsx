type EditalHeaderProps = {
  editalTitulo: string
  totalDisciplinas: number
  progressPercent: number
  totalTopicos: number
  studiedTopicos: number
}

export function EditalHeader({
  editalTitulo,
  totalDisciplinas,
  progressPercent,
  totalTopicos,
  studiedTopicos,
}: EditalHeaderProps) {
  return (
    <header className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
          Área do aluno
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
          Edital Mapeado — {editalTitulo}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          {totalDisciplinas} disciplinas oficiais com tópicos, teoria gratuita e banco de questões
          para sua preparação operacional.
        </p>
      </div>

      <div className="rounded-[1.125rem] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Progresso geral do edital
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {progressPercent}%
            </span>{' '}
            do edital estudado
            <span className="hidden sm:inline">
              {' '}
              · {studiedTopicos}/{totalTopicos} tópicos
            </span>
          </p>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso do edital"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  )
}
