import type { ReactNode } from 'react'

import {
  authCardClass,
  formAlertErrorClass,
  formAlertSuccessClass,
} from '../../lib/form-styles'

type AuthPageShellProps = {
  title: string
  subtitle: string
  children: ReactNode
  error?: string | null
  success?: string | null
  footer?: ReactNode
  className?: string
}

export function AuthPageShell({
  title,
  subtitle,
  children,
  error,
  success,
  footer,
  className = '',
}: AuthPageShellProps) {
  return (
    <section
      className={`flex w-full flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-12 ${className}`}
    >
      <div className={`${authCardClass} shrink-0`}>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-title">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
        </div>

        {success ? (
          <p className={formAlertSuccessClass} role="status">
            {success}
          </p>
        ) : null}

        {error ? (
          <p className={formAlertErrorClass} role="alert">
            {error}
          </p>
        ) : null}

        {children}

        {footer}
      </div>
    </section>
  )
}
