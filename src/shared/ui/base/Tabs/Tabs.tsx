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
                  ? 'text-[#73a5ff33] cursor-not-allowed border-b-3 border-[#234e99CC]' //todo: не понятно зачем бордер, если дизейбл и как выглядит невыбранный таб
                  : activeTab === tab.id
                    ? 'bg-[#73a5ff33] text-[#397DF6] border-b-3 border-blue-500'
                    : 'text-[#397DF6] hover:bg-[#234e9933]'
              }
            `}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="text-white min-h-[80px]">{activeTabContent}</div>
    </div>
  )
}
