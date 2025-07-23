'use client'
import { TabsRadix } from '@/shared/ui/base/TabsRadix/TabsRadix'
import TabsComponent, { Tab } from '@/shared/ui/base/Tabs/Tabs'
import CustomCheckbox from '@/shared/ui/base/CheckBox/CheckBox'
import { useState } from 'react'
export default function Page() {
  const tab: any = [
    { id: '1', title: 'Home', content: 'Homefsdfsdafsadfasdfasdf', disabled: false },
    { id: '2', title: 'Dog', content: 'fdsf231231231', disabled: true },
    { id: '3', title: 'Cat', content: 'fsdaklk;l312318', disabled: false },
  ]

  const [agree, setAgree] = useState(false);
  return (
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

      <div style={{ marginTop: '40px', paddingLeft: '20px' }}>
        <CustomCheckbox onChange={setAgree} checked={agree} label={'dasdasd'}/>
      </div>
    </div>
  )
}

// export default Page
