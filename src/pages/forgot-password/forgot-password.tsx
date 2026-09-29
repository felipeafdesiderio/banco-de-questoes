import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { AuthPageShell } from '../../components/auth-page-shell/auth-page-shell'
import {
  authSubmitClass,
  fieldClass,
  fieldErrorClass,
} from '../../lib/form-styles'
import { linkAccent } from '../../lib/ui-styles'
import { supabase } from '../../lib/supabase'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from './forgot-password-schema'

export function ForgotPassword() {
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  async function onSubmit(values: ForgotPasswordFormValues) {
    setFormError(null)
    setSuccessMessage(null)

    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setFormError(error.message)
      return
    }

    setSuccessMessage(
      'Verifique seu e-mail para o link de redefinição de senha.',
    )
  }

  return (
    <AuthPageShell
      title="Recuperar senha"
      subtitle="Enviaremos um link para redefinir sua senha."
      error={formError}
      success={successMessage}
      footer={
        <p className="mt-6 text-center text-sm text-muted">
          <Link to="/login" className={linkAccent}>
            Voltar ao login
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label
            htmlFor="forgot-email"
            className="mb-1.5 block text-sm font-medium text-title"
          >
            E-mail
          </label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <input
              id="forgot-email"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              className={fieldClass(Boolean(errors.email))}
              {...register('email')}
            />
          </div>
          {errors.email ? (
            <p className={fieldErrorClass} role="alert">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${authSubmitClass} disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <Send className="h-4 w-4" aria-hidden />
          Enviar link
        </button>
      </form>
    </AuthPageShell>
  )
}
