import { useState, type FocusEvent } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { PasswordInput } from '../password-input/password-input'
import { PasswordRequirementsHint } from '../password-requirements-hint/password-requirements-hint'

type PasswordFieldWithHintProps = {
  id: string
  autoComplete?: string
  hasError?: boolean
  passwordValue: string
  registration: UseFormRegisterReturn
}

export function PasswordFieldWithHint({
  id,
  autoComplete,
  hasError = false,
  passwordValue,
  registration,
}: PasswordFieldWithHintProps) {
  const [hintOpen, setHintOpen] = useState(false)

  return (
    <div className="relative">
      <PasswordInput
        id={id}
        autoComplete={autoComplete}
        hasError={hasError}
        {...registration}
        onFocus={() => setHintOpen(true)}
        onBlur={(event: FocusEvent<HTMLInputElement>) => {
          setHintOpen(false)
          void registration.onBlur(event)
        }}
      />
      <PasswordRequirementsHint password={passwordValue} open={hintOpen} />
    </div>
  )
}
