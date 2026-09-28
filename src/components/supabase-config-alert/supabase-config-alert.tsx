import { isSupabaseConfigured } from '../../lib/supabase'

export function SupabaseConfigAlert() {
  if (isSupabaseConfigured) {
    return null
  }

  return (
    <div className="border-b border-slate-200 bg-white px-4 py-3 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
      Supabase não configurado. Copie{' '}
      <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-blue-600 dark:bg-slate-950 dark:text-blue-400">
        .env.example
      </code>{' '}
      para{' '}
      <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-blue-600 dark:bg-slate-950 dark:text-blue-400">
        .env
      </code>{' '}
      e reinicie{' '}
      <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-blue-600 dark:bg-slate-950 dark:text-blue-400">
        npm run dev
      </code>
      .
    </div>
  )
}
