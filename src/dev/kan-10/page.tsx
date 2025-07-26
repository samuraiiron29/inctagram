'use client'

import { useState } from 'react'
import { RadioGroupComponent } from '@/shared/ui/base/RadioGroup/RadioGroup'

export default function Page() {
  const [delivery, setDelivery] = useState('mail')
  const [car, setCar] = useState('BMW')

  return (
    <>
      <RadioGroupComponent
        name="delivery"
        options={[
          { label: 'Почта', value: 'mail' },
          { label: 'Курьер', value: 'courier' },
          { label: 'Самовывоз', value: 'pickup' },
        ]}
        value={delivery}
        onChangeAction={setDelivery}
        disabled={false}
      />
      <RadioGroupComponent
        name="car"
        options={[
          { label: 'БМВ', value: 'BMW' },
          { label: 'Ауди', value: 'Audi' },
        ]}
        value={car}
        onChangeAction={setCar}
        disabled={true}
      />
    </>
  )
}
