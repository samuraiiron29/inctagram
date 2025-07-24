'use client'
import { useState } from 'react'
import Pagination from '@/shared/ui/base/Pagination/Pagination'
import { Select } from '@/shared/ui/base/Select/Select'
import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
export default function Page() {
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const totalItems = 550
  const currentData = Array.from({ length: pageSize }, (_, i) => `Item ${(currentPage - 1) * pageSize + i + 1}`)
  return (
    <div className="p-4 text-amber-50">
      <ul>
        {currentData.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <Pagination
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
        setPageSize={setPageSize}
        onPageChange={page => setCurrentPage(page)}
      />

      <Select options={['что то там 1', 'что то там 2', 'что то там 3', 'что то там 4']} onChange={() => {}} width={'150px'} />
      <Select onChange={() => {}} isLanguage={true} />
    </div>
  )
}
