import { Camera } from 'lucide-react'
import { useRef, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'

import { useCareer } from '../../contexts/career-context'
import { badgeClass, btnSecondarySm } from '../../lib/ui-styles'

type ProfileHeaderProps = {
  fullName?: string | null
  nomeGuerra: string
  avatarDataUrl: string | null
  onNomeGuerraChange: (value: string) => void
  onAvatarChange: (dataUrl: string) => void
}

const MAX_AVATAR_BYTES = 2 * 1024 * 1024

export function ProfileHeader({
  fullName,
  nomeGuerra,
  avatarDataUrl,
  onNomeGuerraChange,
  onAvatarChange,
}: ProfileHeaderProps) {
  const { navLabel } = useCareer()
  const fileRef = useRef<HTMLInputElement>(null)

  function openFilePicker() {
    fileRef.current?.click()
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }
    if (file.size > MAX_AVATAR_BYTES) {
      window.alert('Use uma imagem de até 2 MB.')
      e.target.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onAvatarChange(reader.result)
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const initials =
    (nomeGuerra || fullName || 'AL')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join('') || 'AL'

  return (
    <section className="rounded-[1.125rem] border border-slate-800 bg-slate-900 p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative mx-auto h-28 w-28 shrink-0 sm:mx-0">
          {avatarDataUrl ? (
            <img
              src={avatarDataUrl}
              alt=""
              className="h-full w-full rounded-full object-cover ring-2 ring-slate-700"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-800 text-2xl font-bold text-blue-400 ring-2 ring-slate-700">
              {initials}
            </div>
          )}
          <button
            type="button"
            onClick={openFilePicker}
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-full bg-slate-950/0 text-xs font-medium text-white opacity-0 transition-all duration-300 hover:bg-slate-950/65 hover:opacity-100 focus-visible:bg-slate-950/65 focus-visible:opacity-100"
          >
            <Camera className="h-5 w-5" aria-hidden />
            Alterar Foto
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
          />
        </div>

        <div className="min-w-0 flex-1 space-y-4 text-center sm:text-left">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Identificação militar
            </p>
            <label htmlFor="nome-guerra" className="sr-only">
              Nome de guerra
            </label>
            <input
              id="nome-guerra"
              type="text"
              value={nomeGuerra}
              onChange={(e) => onNomeGuerraChange(e.target.value)}
              placeholder="Ex: SD PM SILVA ou CADETE OLIVEIRA"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-lg font-semibold uppercase tracking-wide text-slate-50 placeholder:normal-case placeholder:font-normal placeholder:text-slate-500 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
            />
            {fullName ? (
              <p className="mt-1 text-sm text-slate-400">{fullName}</p>
            ) : null}
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap">
            {navLabel ? (
              <span className={badgeClass}>{navLabel}</span>
            ) : null}
            <Link to="/selecionar-carreira" className={btnSecondarySm}>
              Trocar Foco de Estudo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
