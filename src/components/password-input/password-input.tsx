import { Eye, EyeOff, Lock } from 'lucide-react'
import { useState, type InputHTMLAttributes } from 'react'

import { passwordFieldClass } from '../../lib/form-styles'

type PasswordInputProps = {
  id: string
  autoComplete?: string
  placeholder?: string
  hasError?: boolean
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export function PasswordInput({
  id,
  autoComplete,
  placeholder = '••••••••',
  hasError = false,
  className,
  ...inputProps
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Lock
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden
      />
      <input
        id={id}
        type={showPassword ? 'text' : 'password'}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={className ?? passwordFieldClass(hasError)}
        {...inputProps}
      />
      <button
        type="button"
        onClick={() => setShowPassword((current) => !current)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400"
        aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" aria-hidden />
        ) : (
          <Eye className="h-4 w-4" aria-hidden />
        )}
      </button>
    </div>
  )
}
