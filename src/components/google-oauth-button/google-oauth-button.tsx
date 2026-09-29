import { supabase } from '../../lib/supabase'
import { btnSecondary } from '../../lib/ui-styles'

type GoogleOauthButtonProps = {
  disabled?: boolean
  loading?: boolean
  onError?: (message: string) => void
  onStart?: () => void
}

export function GoogleOauthButton({
  disabled = false,
  loading = false,
  onError,
  onStart,
}: GoogleOauthButtonProps) {
  async function handleGoogleSignIn() {
    onStart?.()

    const base = import.meta.env.BASE_URL.replace(/\/$/, '')
    const redirectTo = `${window.location.origin}${base}`

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    })

    if (error) {
      onError?.(error.message)
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleGoogleSignIn()}
      disabled={disabled || loading}
      className={`${btnSecondary} w-full py-3 disabled:cursor-not-allowed disabled:opacity-60`}
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        aria-hidden
        focusable="false"
      >
        <path
          fill="#EA4335"
          d="M12 10.2v3.6h5.1c-.2 1.2-1.6 3.6-5.1 3.6-3.1 0-5.6-2.5-5.6-5.6S8.9 6.2 12 6.2c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.5 3.9 14.4 3 12 3 7 3 3 7 3 12s4 9 9 9c5.2 0 8.6-3.7 8.6-8.9 0-.6-.1-1-.2-1.3H12z"
        />
      </svg>
      {loading ? 'Redirecionando...' : 'Entrar com Google'}
    </button>
  )
}
