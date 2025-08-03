'use client'
import { useAskMutation } from '@/shared/api/baseDeepApi'
import { Button, TextArea } from '@radix-ui/themes'
import { useState } from 'react'

export const DeepSeekChat = () => {
  const [prompt, setPrompt] = useState('')
  const [ask, { data, isLoading, isError }] = useAskMutation()
  console.log(data)
  const handleSubmit = async () => {
    if (!prompt.trim()) return
    await ask(prompt)
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">🤖 DeepSeek Chat</h2>

      <TextArea
        className="w-full min-h-[100px] p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Введите ваш вопрос..."
      />

      <Button
        onClick={handleSubmit}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Загрузка...' : 'Спросить'}
      </Button>

      {isError && <div className="mt-3 text-red-500">❌ Произошла ошибка. Проверь ключ.</div>}

      {data?.choices?.[0]?.message?.content && (
        <div className="mt-6 bg-gray-100 border border-gray-200 rounded-xl p-4 whitespace-pre-wrap text-sm">
          <strong>Ответ:</strong>
          <p className="mt-2">{data.choices[0].message.content.trim()}</p>
        </div>
      )}
    </div>
  )
}
