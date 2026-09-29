import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { AuthPageShell } from '../../components/auth-page-shell/auth-page-shell'
import { PasswordFieldWithHint } from '../../components/password-field-with-hint/password-field-with-hint'
import { PasswordInput } from '../../components/password-input/password-input'
import { authCardClass, authSubmitClass, fieldErrorClass } from '../../lib/form-styles'
import { linkAccent } from '../../lib/ui-styles'
import { supabase } from '../../lib/supabase'
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from './reset-password-schema'

export function ResetPassword() {
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)
  const [recoveryReady, setRecoveryReady] = useState(false)
  const [recoveryInvalid, setRecoveryInvalid] = useState(false)
  const recoveryReadyRef = useRef(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  })

  const passwordValue = watch('password')

  useEffect(() => {
    function hasRecoveryTokenInUrl() {
      const hash = window.location.hash.startsWith('#')
        ? window.location.hash.slice(1)
        : ''
      const hashParams = new URLSearchParams(hash)
      const searchParams = new URLSearchParams(window.location.search)

      return (
        hashParams.get('type') === 'recovery' ||
        searchParams.get('type') === 'recovery'
      )
    }

    function markReady() {
      recoveryReadyRef.current = true
      setRecoveryReady(true)
      setRecoveryInvalid(false)
    }

    if (hasRecoveryTokenInUrl()) {
      markReady()
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        markReady()
      }
    })

    const timeoutId = window.setTimeout(() => {
      if (!recoveryReadyRef.current) {
        setRecoveryInvalid(true)
      }
    }, 4000)

    return () => {
      subscription.unsubscribe()
      window.clearTimeout(timeoutId)
    }
  }, [])

  async function onSubmit(values: ResetPasswordFormValues) {
    setFormError(null)

    const { error } = await supabase.auth.updateUser({
      password: values.password,
    })

    if (error) {
      setFormError(error.message)
      return
    }

    await supabase.auth.signOut()
    navigate('/login', {
      state: { message: 'Senha redefinida com sucesso. Faça login novamente.' },
    })
  }

  if (!recoveryReady && !recoveryInvalid) {
    return (
      <section className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <p className="text-sm text-muted">Validando link de recuperação...</p>
      </section>
    )
  }

  if (recoveryInvalid) {
    return (
      <section className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <div className={`${authCardClass} text-center`}>
          <p className="text-sm text-red-600 dark:text-red-300" role="alert">
            Link inválido ou expirado. Solicite um novo link de recuperação.
          </p>
          <Link
            to="/forgot-password"
            className={`mt-4 inline-block text-sm ${linkAccent}`}
          >
            Ir para recuperar senha
          </Link>
        </div>
      </section>
    )
  }

  return (
    <AuthPageShell
      title="Nova senha"
      subtitle="Defina uma nova senha para sua conta."
      error={formError}
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label
            htmlFor="reset-password"
            className="mb-1.5 block text-sm font-medium text-title"
          >
            Nova senha
          </label>
          <PasswordFieldWithHint
            id="reset-password"
            autoComplete="new-password"
            hasError={Boolean(errors.password)}
            passwordValue={passwordValue}
            registration={register('password')}
          />
          {errors.password ? (
            <p className={fieldErrorClass} role="alert">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="reset-password-confirm"
            className="mb-1.5 block text-sm font-medium text-title"
          >
            Confirmar nova senha
          </label>
          <PasswordInput
            id="reset-password-confirm"
            autoComplete="new-password"
            hasError={Boolean(errors.passwordConfirm)}
            {...register('passwordConfirm')}
          />
          {errors.passwordConfirm ? (
            <p className={fieldErrorClass} role="alert">
              {errors.passwordConfirm.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${authSubmitClass} disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <KeyRound className="h-4 w-4" aria-hidden />
          Redefinir senha
        </button>
      </form>
    </AuthPageShell>
  )
}
