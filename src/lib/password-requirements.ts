export type PasswordRequirementChecks = {
  minLength: boolean
  uppercase: boolean
  number: boolean
}

export function getPasswordRequirementChecks(
  password: string,
): PasswordRequirementChecks {
  return {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
  }
}

export const passwordRequirementLabels = [
  { key: 'minLength' as const, label: 'Mínimo de 8 caracteres' },
  { key: 'uppercase' as const, label: 'Pelo menos 1 letra maiúscula' },
  { key: 'number' as const, label: 'Pelo menos 1 número' },
]
