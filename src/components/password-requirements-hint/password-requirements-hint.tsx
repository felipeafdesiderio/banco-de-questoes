import { Check, Circle } from 'lucide-react'

import {
  getPasswordRequirementChecks,
  passwordRequirementLabels,
} from '../../lib/password-requirements'

type PasswordRequirementsHintProps = {
  password: string
  open: boolean
}

export function PasswordRequirementsHint({
  password,
  open,
}: PasswordRequirementsHintProps) {
  if (!open) {
    return null
  }

  const checks = getPasswordRequirementChecks(password)

  return (
    <div
      role="tooltip"
      className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-line bg-card px-3 py-2.5 shadow-soft"
    >
      <p className="mb-2 text-xs font-medium text-title">
        Requisitos da senha
      </p>
      <ul className="space-y-1.5">
        {passwordRequirementLabels.map((item) => {
          const met = checks[item.key]

          return (
            <li
              key={item.key}
              className={`flex items-center gap-2 text-xs transition-colors ${
                met ? 'text-title' : 'text-muted'
              }`}
            >
              {met ? (
                <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />
              ) : (
                <Circle className="h-3.5 w-3.5 shrink-0" aria-hidden />
              )}
              {item.label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
