'use client'
import { useState } from 'react'

export type Tab = {
  id: string
  title: string
  content: React.ReactNode
  disabled: boolean
}

type TabsProps = {
  tabs: Tab[]
  defaultTab?: string
}

export default function TabsComponent({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState('')

  const handleTabChange = (id: string, disabled: boolean) => {
    if (!disabled) setActiveTab(id)
  }

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 pb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id, tab.disabled)}
            disabled={tab.disabled}
            className={`
              px-4 py-1 text-sm font-medium transition
              ${
                tab.disabled
                  ? 'text-accent-100/20 cursor-not-allowed border-b-3 border-accent-900/80' //todo: не понятно зачем бордер, если дизейбл и как выглядит невыбранный таб
                  : activeTab === tab.id
                    ? 'bg-accent-100/20 text-accent-500 border-accent-500 border-b-3 '
                    : 'text-accent-500 hover:bg-accent-900/20'
              }
            `}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="text-light-100 min-h-[80px]">{activeTabContent}</div>
    </div>
  )
}
