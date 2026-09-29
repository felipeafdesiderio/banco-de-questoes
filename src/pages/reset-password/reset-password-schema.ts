import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
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

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
