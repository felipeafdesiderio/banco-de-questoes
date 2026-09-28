import { z } from 'zod'

import { isValidCpf } from '../../lib/cpf'

export const completeProfileSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, 'CPF é obrigatório')
    .refine((value) => isValidCpf(value), 'CPF inválido'),
})

export type CompleteProfileFormValues = z.infer<typeof completeProfileSchema>
