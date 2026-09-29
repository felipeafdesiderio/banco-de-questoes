import type { ReactNode } from 'react'

export type ProfileTabId = 'stats' | 'achievements'

type TabItem = {
  id: ProfileTabId
  label: string
}

type TabsProps = {
  tabs: TabItem[]
  activeTab: ProfileTabId
  onChange: (id: ProfileTabId) => void
  children: ReactNode
}

export function Tabs({ tabs, activeTab, onChange, children }: TabsProps) {
  return (
    <div>
      <div
        role="tablist"
        aria-label="Seções do perfil"
        className="flex flex-wrap gap-2 border-b border-slate-800 pb-1"
      >
        {tabs.map((tab) => {
          const selected = tab.id === activeTab
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={`rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                selected
                  ? 'border-b-2 border-blue-600 text-blue-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="pt-6"
      >
        {children}
      </div>
    </div>
  )
}
