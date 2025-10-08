import TabNavigation from './TabNavigation'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TabNavigation />
      <div className="mt-6">{children}</div>
    </div>
  )
}