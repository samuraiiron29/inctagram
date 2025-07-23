'use client'
import { TabsRadix } from '@/shared/ui/base/TabsRadix/TabsRadix'
import TabsComponent, { Tab } from '@/shared/ui/base/Tabs/Tabs'
import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
export default function Page() {
  const router = useRouter()
  const tab: any = [
    { id: '1', title: 'Home', content: 'Homefsdfsdafsadfasdfasdf', disabled: false },
    { id: '2', title: 'Dog', content: 'fdsf231231231', disabled: true },
    { id: '3', title: 'Cat', content: 'fsdaklk;l312318', disabled: false },
  ]
  return (
    <>
      <Button onClick={() => router.back()}>Назад</Button>
      <div>
        <div style={{ marginTop: '40px' }}>
          <TabsComponent tabs={tab} />
        </div>

        <div style={{ marginTop: '40px' }}>
          <h1 style={{ textAlign: 'center', width: '200px' }}>
            TabsRadix <br />
            <span>↓</span>
          </h1>
          <TabsRadix tabs={tab} width={'300px'} />
        </div>
      </div>
    </>
  )
}
