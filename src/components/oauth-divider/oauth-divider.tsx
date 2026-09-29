import { authDividerClass } from '../../lib/form-styles'

export function OauthDivider() {
  return (
    <div className="my-6 flex items-center gap-3">
      <div className={authDividerClass} />
      <span className="text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400">
        ou
      </span>
      <div className={authDividerClass} />
    </div>
  )
}
