import { FileText } from 'lucide-react'
import type { Control, FieldError, FieldPath, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { formatCpf } from '../../lib/cpf'
import { fieldClass, fieldErrorClass } from '../../lib/form-styles'

type CpfFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  id: string
  label?: string
  error?: FieldError
}

export function CpfField<T extends FieldValues>({
  control,
  name,
  id,
  label = 'CPF',
  error,
}: CpfFieldProps<T>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-title">
        {label}
      </label>
      <div className="relative">
        <FileText
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              id={id}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="000.000.000-00"
              className={fieldClass(Boolean(error))}
              value={field.value}
              onBlur={field.onBlur}
              ref={field.ref}
              onChange={(event) => {
                field.onChange(formatCpf(event.target.value))
              }}
            />
          )}
        />
      </div>
      {error ? (
        <p className={fieldErrorClass} role="alert">
          {error.message}
        </p>
      ) : null}
    </div>
  )
}
