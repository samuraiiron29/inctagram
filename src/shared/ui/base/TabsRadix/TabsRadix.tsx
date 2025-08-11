'use client'
import { Tabs } from 'radix-ui'

export type Tab = {
  id: string
  title: string
  content: React.ReactNode
  disabled: boolean
}

type TabsProps = {
  tabs: Tab[]
  width?: string
}

export const TabsRadix = ({ tabs, width }: TabsProps) => {
  return (
    <Tabs.Root defaultValue={tabs[0]?.id} className={`flex w-[${width}] flex-col gap-2" defaultValue="tab1`}>
      <Tabs.List className="flex" aria-label="Manage your account">
        {tabs.map(tab => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            disabled={tab.disabled}
            className={`
              relative px-4 py-1 text-sm font-medium outline-none transition
              text-accent-500
              disabled:border-b-3 disabled:border-[#234e99CC] disabled:cursor-not-allowed disabled:text-[#73a5ff33] disabled:hover:bg-[]

              data-[state=active]:bg-[#73a5ff33]
              data-[state=active]:text-accent-500
              data-[state=active]:border-b-[3px] data-[state=active]:border-accent-500

              not-disabled:hover:bg-[#234e9933]
            `}
          >
            {tab.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabs.map(tab => (
        <Tabs.Content key={tab.id} value={tab.id} className="mt-2 text-amber-50">
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
