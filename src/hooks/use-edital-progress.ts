import { useCallback, useMemo, useSyncExternalStore } from 'react'

import { listTopicoIds } from '../lib/edital-data'
import type { CargoConcurso, EditalDisciplina } from '../types/edital'

function storageKey(cargo: CargoConcurso) {
  return `edital-${cargo}-topicos-estudados`
}

function readStudiedIds(cargo: CargoConcurso): Set<string> {
  try {
    const raw = localStorage.getItem(storageKey(cargo))
    if (!raw) {
      return new Set()
    }
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      return new Set()
    }
    return new Set(parsed.filter((id): id is string => typeof id === 'string'))
  } catch {
    return new Set()
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange)
  window.addEventListener('edital-progress', onStoreChange)
  return () => {
    window.removeEventListener('storage', onStoreChange)
    window.removeEventListener('edital-progress', onStoreChange)
  }
}

function getSnapshot(cargo: CargoConcurso) {
  return localStorage.getItem(storageKey(cargo)) ?? '[]'
}

function persist(cargo: CargoConcurso, ids: Set<string>) {
  localStorage.setItem(storageKey(cargo), JSON.stringify([...ids]))
  window.dispatchEvent(new Event('edital-progress'))
}

export function useEditalProgress(cargo: CargoConcurso, disciplinas: EditalDisciplina[]) {
  const topicoIds = useMemo(() => listTopicoIds(disciplinas), [disciplinas])
  const totalTopicos = topicoIds.length

  const storageSnapshot = useSyncExternalStore(
    subscribe,
    () => getSnapshot(cargo),
    () => getSnapshot(cargo),
  )

  const studiedIds = useMemo(() => {
    void storageSnapshot
    return readStudiedIds(cargo)
  }, [cargo, storageSnapshot])

  const studiedCount = useMemo(
    () => topicoIds.filter((id) => studiedIds.has(id)).length,
    [topicoIds, studiedIds],
  )

  const percent =
    totalTopicos > 0 ? Math.round((studiedCount / totalTopicos) * 100) : 0

  const markTopicoStudied = useCallback(
    (topicoId: string) => {
      const next = readStudiedIds(cargo)
      if (!next.has(topicoId)) {
        next.add(topicoId)
        persist(cargo, next)
      }
    },
    [cargo],
  )

  const isTopicoStudied = useCallback(
    (topicoId: string) => studiedIds.has(topicoId),
    [studiedIds],
  )

  return {
    studiedCount,
    percent,
    totalTopicos,
    markTopicoStudied,
    isTopicoStudied,
  }
}
