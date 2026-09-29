import { FileText, PlayCircle } from 'lucide-react'
import { useMemo, useState } from 'react'

import { toYoutubeEmbedUrl } from '../../lib/youtube-embed'
import type { QuestionResolution } from '../../types/questions'

type QuestionResolutionPanelProps = {
  resolution: QuestionResolution
}

type TabId = 'text' | 'video'

export function QuestionResolutionPanel({ resolution }: QuestionResolutionPanelProps) {
  const hasText = Boolean(resolution.text?.trim())
  const embedUrl = resolution.videoUrl ? toYoutubeEmbedUrl(resolution.videoUrl) : null
  const hasVideo = Boolean(embedUrl || resolution.videoUrl)

  const defaultTab: TabId = hasText ? 'text' : hasVideo ? 'video' : 'text'
  const [tab, setTab] = useState<TabId>(defaultTab)

  const tabs = useMemo(() => {
    const list: { id: TabId; label: string }[] = []
    if (hasText) {
      list.push({ id: 'text', label: 'Resolução em Texto' })
    }
    if (hasVideo) {
      list.push({ id: 'video', label: 'Resolução em Vídeo' })
    }
    return list
  }, [hasText, hasVideo])

  if (!hasText && !hasVideo) {
    return (
      <p className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
        Resolução comentada indisponível para esta questão.
      </p>
    )
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60">
      {tabs.length > 1 ? (
        <div className="flex border-b border-slate-800">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`flex flex-1 items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium sm:text-sm ${
                tab === item.id
                  ? 'border-b-2 border-blue-500 text-blue-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.id === 'text' ? (
                <FileText className="h-4 w-4" aria-hidden />
              ) : (
                <PlayCircle className="h-4 w-4" aria-hidden />
              )}
              {item.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="p-4 text-sm leading-relaxed text-slate-300">
        {(tabs.length === 1 ? tabs[0]?.id : tab) === 'text' && hasText ? (
          <p className="whitespace-pre-wrap">{resolution.text}</p>
        ) : null}

        {(tabs.length === 1 ? tabs[0]?.id : tab) === 'video' && hasVideo ? (
          <div className="space-y-3">
            {embedUrl ? (
              <div className="aspect-video overflow-hidden rounded-lg border border-slate-800">
                <iframe
                  title="Resolução em vídeo"
                  src={embedUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : null}
            {resolution.videoUrl ? (
              <a
                href={resolution.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-blue-400 hover:text-blue-300"
              >
                Abrir aula em nova aba →
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
