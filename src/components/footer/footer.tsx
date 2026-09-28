const footerLinks = [
  { label: 'Termos de uso', href: '#termos' },
  { label: 'Privacidade', href: '#privacidade' },
  { label: 'Contato', href: '#contato' },
] as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-muted">
            © {year} Banco de Questões. Todos os direitos reservados.
          </p>
          <nav className="flex flex-wrap justify-center gap-8" aria-label="Rodapé">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-600 transition-colors duration-300 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
