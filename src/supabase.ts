import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabasePublic: SupabaseClient
let supabasePrivate: SupabaseClient

export function getSupabasePublic() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error('process.env.NEXT_PUBLIC_SUPABASE_URL is required')
  if (!process.env.NEXT_PUBLIC_SUPABASE_KEY) throw new Error('process.env.NEXT_PUBLIC_SUPABASE_KEY is required')
  return supabasePublic || (supabasePublic = createSupabase(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY))
}

export function getSupabasePrivate() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error('process.env.NEXT_PUBLIC_SUPABASE_URL is required')
  if (!process.env.NEXT_PRIVATE_SUPABASE_KEY) throw new Error('process.env.NEXT_PRIVATE_SUPABASE_KEY is required')
  return supabasePrivate || (supabasePrivate = createSupabase(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PRIVATE_SUPABASE_KEY))
}

export function createSupabase(supabaseUrl: string, supabaseKey: string) {
  if (!supabaseUrl) throw new Error('supabaseUrl is required')
  if (!supabaseKey) throw new Error('supabaseKey is required')
  return createClient(supabaseUrl, supabaseKey)
}

export async function sb<T>(supabaseResult: Promise<{ data: T | null; error: Error | null }>): Promise<T> {
  const { data, error } = await supabaseResult
  if (error) throw error
  if (data === null) throw new Error('Supabase: data is null') // should never happen according to Supabase function definitions
  return data
}

export interface SupabaseError {
  message: string
  status: number
}

export function isSupabaseError(error: unknown): error is SupabaseError {
  const $error = error as SupabaseError
  return typeof $error === 'object' && typeof $error.message === 'string' && typeof $error.status === 'number'
}
