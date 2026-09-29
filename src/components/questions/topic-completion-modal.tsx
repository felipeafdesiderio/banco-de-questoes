import { MessageCircle, RotateCcw, Trophy, X } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { btnPrimary, btnSecondary } from '../../lib/ui-styles'

type TopicCompletionModalProps = {
  open: boolean
  topicoNome: string
  disciplinaNome: string
  onClose: () => void
  onRetryWrong: () => void
}

export function TopicCompletionModal({
  open,
  topicoNome,
  disciplinaNome,
  onClose,
  onRetryWrong,
}: TopicCompletionModalProps) {
  useEffect(() => {
    if (!open) {
      return
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
        aria-label="Fechar"
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-md rounded-[1.125rem] border border-slate-800 bg-slate-900 p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="topic-complete-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          aria-label="Fechar modal"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-950/50 ring-1 ring-blue-700/40">
          <Trophy className="h-6 w-6 text-blue-400" aria-hidden />
        </div>

        <p className="text-xs font-medium uppercase tracking-wide text-blue-400">{disciplinaNome}</p>
        <h2 id="topic-complete-title" className="mt-1 text-xl font-bold text-slate-50">
          Parabéns! Você concluiu este tópico
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Você respondeu todas as questões disponíveis em{' '}
          <strong className="font-medium text-slate-200">{topicoNome}</strong>. Continue firme na
          preparação — consistência vence o concurso.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              onRetryWrong()
              onClose()
            }}
            className={btnPrimary}
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Refazer questões erradas
          </button>
          <Link
            to="/perfil"
            className={`${btnSecondary} w-full`}
            onClick={onClose}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Solicitar mais questões aos mentores
          </Link>
        </div>
      </div>
    </div>
  )
}
