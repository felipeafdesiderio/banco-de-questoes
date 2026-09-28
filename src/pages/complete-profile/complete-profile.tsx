import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { AuthPageShell } from '../../components/auth-page-shell/auth-page-shell'
import { CpfField } from '../../components/cpf-field/cpf-field'
import { useAuth } from '../../hooks/use-auth'
import { stripCpf } from '../../lib/cpf'
import { authSubmitClass } from '../../lib/form-styles'
import { supabase } from '../../lib/supabase'
import {
  completeProfileSchema,
  type CompleteProfileFormValues,
} from './complete-profile-schema'

export function CompleteProfile() {
  const navigate = useNavigate()
  const { user, profile, loading, refreshProfile } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompleteProfileFormValues>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: { cpf: '' },
  })

  useEffect(() => {
    if (!loading && profile?.cpf) {
      navigate('/', { replace: true })
    }
  }, [loading, profile?.cpf, navigate])

  async function onSubmit(values: CompleteProfileFormValues) {
    if (!user) {
      return
    }

    setFormError(null)

    const { error } = await supabase
      .from('profiles')
      .update({ cpf: stripCpf(values.cpf) })
      .eq('id', user.id)

    if (error) {
      setFormError(error.message)
      return
    }

    await refreshProfile()
    navigate('/')
  }

  if (loading) {
    return (
      <section className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <p className="text-sm text-muted">Carregando perfil...</p>
      </section>
    )
  }

  return (
    <AuthPageShell
      title="Complete seu cadastro"
      subtitle="Informe seu CPF para concluir o cadastro e usar a plataforma."
      error={formError}
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <CpfField
          control={control}
          name="cpf"
          id="complete-profile-cpf"
          error={errors.cpf}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${authSubmitClass} disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <Save className="h-4 w-4" aria-hidden />
          Salvar e continuar
        </button>
      </form>
    </AuthPageShell>
  )
}
