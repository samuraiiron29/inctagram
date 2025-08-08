'use client'
import { DatePicker } from '@/shared/ui/base/DatePicker/DatePicker'

const Page = () => {
  return (
    <div className="p-8 space-y-8 text-light-100 bg-dark-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Тестирование компонента DatePicker</h2>

      {/* Режим одиночной даты  */}
      <div>
        <p className="text-sm text-light-800 mb-2">Одиночная дата:</p>
        <DatePicker label="Дата" mode="single" />
      </div>

      {/*  Режим выбора диапазона */}
      <div>
        <p className="text-sm text-light-800 mb-2">Диапазон дат:</p>
        <DatePicker label="Дата" mode="range" />
      </div>

      {/* Пример с ошибкой */}
      <div>
        <p className="text-sm text-light-800 mb-2">Ошибка при выборе даты:</p>
        <DatePicker label="Дата" mode="single" error={true} errorMessage="Это обязательное поле" />
      </div>
    </div>
  )
}

export default Page
