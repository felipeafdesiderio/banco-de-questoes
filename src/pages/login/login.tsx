import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn, Mail } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { AuthPageShell } from '../../components/auth-page-shell/auth-page-shell'
import { GoogleOauthButton } from '../../components/google-oauth-button/google-oauth-button'
import { OauthDivider } from '../../components/oauth-divider/oauth-divider'
import { PasswordInput } from '../../components/password-input/password-input'
import {
  authSubmitClass,
  fieldClass,
  fieldErrorClass,
} from '../../lib/form-styles'
import { linkAccent } from '../../lib/ui-styles'
import { getPostAuthPath } from '../../lib/career-labels'
import { hasStoredCareer } from '../../lib/career-storage'
import { supabase } from '../../lib/supabase'
import { loginSchema, type LoginFormValues } from './login-schema'

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const successMessage =
    (location.state as { message?: string } | null)?.message ?? null
  const [formError, setFormError] = useState<string | null>(null)
  const [oauthLoading, setOauthLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: LoginFormValues) {
    setFormError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      setFormError(error.message)
      return
    }

    const from = (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname
    navigate(getPostAuthPath(hasStoredCareer(), from ?? '/estudar'))
  }

  return (
    <AuthPageShell
      title="Entrar"
      subtitle="Acesse sua conta para continuar estudando."
      error={formError}
      success={successMessage}
      footer={
        <p className="mt-6 text-center text-sm text-muted">
          Ainda não tem conta?{' '}
          <Link to="/register" className={linkAccent}>
            Cadastre-se
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label
            htmlFor="login-email"
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
              id="login-email"
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

        <div>
          <label
            htmlFor="login-password"
            className="mb-1.5 block text-sm font-medium text-title"
          >
            Senha
          </label>
          <PasswordInput
            id="login-password"
            autoComplete="current-password"
            hasError={Boolean(errors.password)}
            {...register('password')}
          />
          {errors.password ? (
            <p className={fieldErrorClass} role="alert">
              {errors.password.message}
            </p>
          ) : null}
          <div className="mt-2 flex justify-end">
            <Link to="/forgot-password" className={`text-xs ${linkAccent}`}>
              Esqueceu sua senha?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || oauthLoading}
          className={`${authSubmitClass} disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <LogIn className="h-4 w-4" aria-hidden />
          Entrar
        </button>
      </form>

      <OauthDivider />

      <GoogleOauthButton
        disabled={isSubmitting}
        loading={oauthLoading}
        onStart={() => {
          setFormError(null)
          setOauthLoading(true)
        }}
        onError={(message) => {
          setFormError(message)
          setOauthLoading(false)
        }}
      />
    </AuthPageShell>
  )
}
