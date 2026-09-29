import { createClient } from '@supabase/supabase-js'

import type { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.error(
    '[supabase] Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env (copie de .env.example).',
  )
}

function createSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase não configurado: crie o arquivo .env com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.',
    )
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

export const supabase = isSupabaseConfigured
  ? createSupabaseClient()
  : (null as unknown as ReturnType<typeof createSupabaseClient>)
