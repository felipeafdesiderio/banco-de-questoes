import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, User, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { AuthPageShell } from '../../components/auth-page-shell/auth-page-shell'
import { CpfField } from '../../components/cpf-field/cpf-field'
import { GoogleOauthButton } from '../../components/google-oauth-button/google-oauth-button'
import { OauthDivider } from '../../components/oauth-divider/oauth-divider'
import { PasswordFieldWithHint } from '../../components/password-field-with-hint/password-field-with-hint'
import { PasswordInput } from '../../components/password-input/password-input'
import { stripCpf } from '../../lib/cpf'
import {
  authSubmitClass,
  fieldClass,
  fieldErrorClass,
} from '../../lib/form-styles'
import { linkAccent } from '../../lib/ui-styles'
import { supabase } from '../../lib/supabase'
import { registerSchema, type RegisterFormValues } from './register-schema'

export function Register() {
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [oauthLoading, setOauthLoading] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      cpf: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const passwordValue = watch('password')

  async function onSubmit(values: RegisterFormValues) {
    setFormError(null)
    setSuccessMessage(null)

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName.trim(),
          cpf: stripCpf(values.cpf),
        },
      },
    })

    if (error) {
      setFormError(error.message)
      return
    }

    if (data.user && !data.session) {
      setSuccessMessage(
        'Cadastro realizado! Verifique seu e-mail para confirmar a conta antes de entrar.',
      )
      return
    }

    setSuccessMessage('Cadastro realizado com sucesso!')
  }

  return (
    <AuthPageShell
      title="Criar conta"
      subtitle="Preencha os dados abaixo para começar."
      error={formError}
      success={successMessage}
      footer={
        <p className="mt-6 text-center text-sm text-muted">
          Já tem uma conta?{' '}
          <Link to="/login" className={linkAccent}>
            Entrar
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label
            htmlFor="register-full-name"
            className="mb-1.5 block text-sm font-medium text-title"
          >
            Nome completo
          </label>
          <div className="relative">
            <User
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <input
              id="register-full-name"
              type="text"
              autoComplete="name"
              placeholder="Seu nome completo"
              className={fieldClass(Boolean(errors.fullName))}
              {...register('fullName')}
            />
          </div>
          {errors.fullName ? (
            <p className={fieldErrorClass} role="alert">
              {errors.fullName.message}
            </p>
          ) : null}
        </div>

        <CpfField
          control={control}
          name="cpf"
          id="register-cpf"
          error={errors.cpf}
        />

        <div>
          <label
            htmlFor="register-email"
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
              id="register-email"
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
            htmlFor="register-password"
            className="mb-1.5 block text-sm font-medium text-title"
          >
            Senha
          </label>
          <PasswordFieldWithHint
            id="register-password"
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
            htmlFor="register-password-confirm"
            className="mb-1.5 block text-sm font-medium text-title"
          >
            Confirmar senha
          </label>
          <PasswordInput
            id="register-password-confirm"
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
          disabled={isSubmitting || oauthLoading}
          className={`${authSubmitClass} disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <UserPlus className="h-4 w-4" aria-hidden />
          Criar Conta
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
