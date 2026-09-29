import { z } from 'zod'

import { isValidCpf } from '../../lib/cpf'

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, 'Nome completo deve ter pelo menos 3 caracteres'),
    cpf: z
      .string()
      .trim()
      .min(1, 'CPF é obrigatório')
      .refine((value) => isValidCpf(value), 'CPF inválido'),
    email: z
      .string()
      .trim()
      .min(1, 'E-mail é obrigatório')
      .email('Informe um e-mail válido'),
    password: z
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Inclua pelo menos 1 letra maiúscula')
      .regex(/\d/, 'Inclua pelo menos 1 número'),
    passwordConfirm: z.string().min(1, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas devem ser iguais',
    path: ['passwordConfirm'],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
