'use client'

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export const tabs = [
  { label: "General information", path: "general-information" },
  { label: "Devices", path: "devices" },
  { label: "Account Management", path: "account-management" },
  { label: "My payments", path: "my-payments" },
]

const TabNavigation = () => {
 const params = useParams() //для получения params.userId из URL
  const pathname = usePathname()//с помощью usePathname() сохраняем текущий путь страницы
  const base = `/users/profile/${params.userId}/settings`
    return (
        <div className="grid grid-cols-4 border-b border-dark-300 mb-8 w-[100%]">
{tabs.map(tab => {
  const href = `${base}/${tab.path}`
  const isActive = pathname === href
  return (
    <Link
     key={tab.path}
     href={href}
      className={`py-3 px-4 text-medium_text14 transition-colors w-[100%] text-center ${
              isActive
                ? 'text-light-100 border-b-2 border-accent-500'
                : 'text-light-900 hover:text-light-500'
            }`}
          >
            {tab.label}
          </Link>
  )
})}
        </div>
       
    )
}

export default TabNavigation