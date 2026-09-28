/**
 * Design system — Slate/Blue operacional (light + dark via CSS vars + utilitários).
 */

const transition = 'transition-colors duration-300 ease-out'

export const shadowSoft = 'shadow-soft'
export const shadowSoftLg = 'shadow-soft-lg'

export const cardBase = `rounded-[1.125rem] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 ${shadowSoft}`

export const badgeClass = `inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-blue-800/60 dark:bg-blue-950/60 dark:text-blue-300 ${transition} hover:border-blue-300 dark:hover:border-blue-700`

const btnPrimaryCore = `inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-950/50 ${transition} hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:hover:bg-blue-500`

export const btnPrimary = btnPrimaryCore

export const btnPrimaryLg = `${btnPrimaryCore} px-6 py-3.5 text-base`

const btnSecondaryCore = `inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-800 ${shadowSoft} ${transition} hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800`

export const btnSecondary = btnSecondaryCore

export const btnSecondaryLg = `${btnSecondaryCore} px-6 py-3.5 text-base`

export const btnSecondarySm = `${btnSecondaryCore} px-4 py-2 text-sm`

export const btnHeaderEntrar = `rounded-lg px-3 py-2 text-sm font-medium text-slate-600 ${transition} hover:text-slate-900 dark:text-slate-300 dark:hover:text-white`

export const btnBack = `inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 ${transition} hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50`

export const linkAccent = `font-medium text-blue-600 ${transition} hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300`

export const sectionDivider = 'border-b border-slate-200 dark:border-slate-800'

export const heroGlow =
  'pointer-events-none absolute -inset-10 rounded-full bg-blue-600/15 blur-3xl dark:bg-blue-500/20'

export const heroImageWrap = `relative overflow-hidden rounded-[1.125rem] border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900 ${shadowSoftLg} ring-1 ring-slate-200/80 dark:ring-slate-800/80`

export const heroImageClass = 'relative z-10 w-full rounded-[14px] object-cover'

export const authCardClass = `${cardBase} mx-auto w-full max-w-lg p-8 sm:p-10`

export const authSubmitClass = `${btnPrimary} w-full py-3`

export const authDividerClass = 'h-px min-h-px flex-1 bg-slate-200 dark:bg-slate-800'

export const pillarCardClass = `${cardBase} p-6 ${transition} hover:border-blue-300 hover:shadow-soft-lg dark:hover:border-blue-700`
