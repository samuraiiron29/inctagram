import React from 'react'
import { Select } from '@/shared/ui/base/Select/Select'

type Props = {
  totalItems: number
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
  setPageSize: (page: number) => void
  siblingCount?: number
}

const Pagination = ({ totalItems, pageSize, currentPage, onPageChange, setPageSize, siblingCount = 1 }: Props) => {
  const totalPages = Math.ceil(totalItems / pageSize)

  const getPagination = (): (number | string)[] => {
    // добавляем точки
    const range: (number | string)[] = []
    const totalNumbers = siblingCount * 2 + 5

    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const left = Math.max(currentPage - siblingCount, 2)
    const right = Math.min(currentPage + siblingCount, totalPages - 1)

    range.push(1)
    if (left > 2) range.push('...')

    for (let i = left; i <= right; i++) {
      range.push(i)
    }

    if (right < totalPages - 1) range.push('...')
    range.push(totalPages)

    return range
  }

  const pagination = getPagination()

  return (
    <div className="flex gap-2 items-center text-amber-50">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-2 py-1 rounded disabled:opacity-30 cursor-pointer"
      >
        ‹
      </button>

      {pagination.map((page, idx) => (
        <button
          key={idx}
          disabled={page === '...'}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`px-2 py-1 rounded cursor-pointer ${currentPage === page ? 'bg-amber-50 text-dark-900' : 'hover:bg-dark-100'}`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-2 py-1 rounded disabled:opacity-30 cursor-pointer"
      >
        ›
      </button>
      <Select options={['10', '20', '30', '50', '100']} onChange={value => setPageSize(Number(value))} width={'70px'} />
    </div>
  )
}

export default Pagination
