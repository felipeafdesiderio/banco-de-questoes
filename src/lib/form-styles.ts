/**
 * Tokens de formulário (campos, cartões de autenticação).
 * Visual global (botões, cards) permanece em ui-styles.
 */

const fieldTransition =
  'outline-none transition-all duration-300 ease-out focus:ring-2'

const fieldBase = `w-full rounded-xl border bg-ink py-2.5 pl-10 text-sm text-title placeholder:text-muted/60 ${fieldTransition}`

const fieldValid =
  'border-line focus:border-blue-500 focus:ring-blue-500/20'

const fieldInvalid =
  'border-red-500/80 focus:border-red-500 focus:ring-red-500/25'

export function fieldClass(hasError: boolean) {
  return [fieldBase, 'pr-3', hasError ? fieldInvalid : fieldValid].join(' ')
}

export function passwordFieldClass(hasError: boolean) {
  return [fieldBase, 'pr-10', hasError ? fieldInvalid : fieldValid].join(' ')
}

export const formAlertErrorClass =
  'mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300'

export const formAlertSuccessClass =
  'mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300'

export const fieldErrorClass = 'mt-1.5 text-sm text-red-600 dark:text-red-400'

export {
  authCardClass,
  authDividerClass,
  authSubmitClass,
} from './ui-styles'
