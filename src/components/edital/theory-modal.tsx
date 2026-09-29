import { ExternalLink, FileText, PlayCircle, Star, X } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { getTopicMaterials } from '../../lib/mock-database'
import { btnPrimary } from '../../lib/ui-styles'
import type { TopicMaterial, TopicMaterialType } from '../../types/materials'
import type { EditalTopico } from '../../types/edital'

type TheoryModalProps = {
  open: boolean
  topico: EditalTopico | null
  disciplinaNome?: string
  onClose: () => void
}

function MaterialIcon({ type }: { type: TopicMaterialType }) {
  switch (type) {
    case 'youtube':
      return <PlayCircle className="h-5 w-5 shrink-0 text-red-400" aria-hidden />
    case 'pdf':
      return <FileText className="h-5 w-5 shrink-0 text-amber-400" aria-hidden />
    case 'external_link':
      return <ExternalLink className="h-5 w-5 shrink-0 text-blue-400" aria-hidden />
    case 'paid_course':
      return <Star className="h-5 w-5 shrink-0 text-yellow-400" aria-hidden />
    default:
      return <ExternalLink className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
  }
}

function MaterialItem({ material }: { material: TopicMaterial }) {
  if (material.type === 'paid_course') {
    return (
      <a
        href={material.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl border border-yellow-600/30 bg-yellow-950/20 p-4 transition-colors hover:border-yellow-500/50"
      >
        <p className="flex items-center gap-2 text-sm font-semibold text-yellow-200">
          <MaterialIcon type={material.type} />
          Curso pago recomendado
        </p>
        <p className="mt-1 text-sm text-slate-200">{material.title}</p>
        {material.description ? (
          <p className="mt-2 text-xs text-slate-400">{material.description}</p>
        ) : null}
      </a>
    )
  }

  const external = material.type !== 'pdf'
  return (
    <a
      href={material.url}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      download={material.type === 'pdf' ? true : undefined}
      className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-3 text-sm text-slate-200 transition-colors duration-300 hover:border-blue-700 hover:bg-slate-950"
    >
      <MaterialIcon type={material.type} />
      <span className="min-w-0 flex-1">
        {material.title}
        {material.description ? (
          <span className="mt-0.5 block text-xs text-slate-500">{material.description}</span>
        ) : null}
      </span>
      <ExternalLink className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
    </a>
  )
}

export function TheoryModal({ open, topico, disciplinaNome, onClose }: TheoryModalProps) {
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

  const materials = useMemo(() => {
    if (!topico) {
      return []
    }
    return getTopicMaterials(topico.id, topico.teoriaUrl)
  }, [topico])

  if (!open || !topico) {
    return null
  }

  const questoesHref = `/questoes?topico=${encodeURIComponent(topico.id)}&indice=0`

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
        aria-label="Fechar modal de teoria"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[min(90vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-[1.125rem] border border-slate-800 bg-slate-900 shadow-2xl shadow-black/40"
        role="dialog"
        aria-modal="true"
        aria-labelledby="theory-modal-title"
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 px-5 py-4">
          <div className="min-w-0">
            {disciplinaNome ? (
              <p className="text-xs font-medium uppercase tracking-wide text-blue-400">
                {disciplinaNome}
              </p>
            ) : null}
            <h2
              id="theory-modal-title"
              className="mt-1 text-lg font-semibold leading-snug text-slate-50"
            >
              Materiais do tópico
            </h2>
            <p className="mt-2 line-clamp-2 text-sm text-slate-400">{topico.nome}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
          {materials.length === 0 ? (
            <p className="text-sm text-slate-400">Nenhum material cadastrado para este tópico.</p>
          ) : (
            materials.map((material) => <MaterialItem key={material.id} material={material} />)
          )}
        </div>

        <div className="border-t border-slate-800 px-5 py-4">
          <Link to={questoesHref} onClick={onClose} className={`${btnPrimary} w-full`}>
            Ir para as Questões deste Tópico →
          </Link>
        </div>
      </div>
    </div>
  )
}
