'use client'

import { Button } from "@radix-ui/themes"
import { redirect } from "next/navigation"
import {useState} from "react";
import Pagination from "@/shared/ui/base/Pagination/Pagination";
import {Select} from "@/shared/ui/base/Select/Select";

export default function Home() {

    //имитация данных для пагинации
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const totalItems = 550

    const currentData = Array.from(
        { length: pageSize },
        (_, i) => `Item ${(currentPage - 1) * pageSize + i + 1}`
    );


  // redirect('/auth/sign-in');
  return (
    <div>
      <Button variant="outline" color="blue">
        TEST
      </Button>
      <div>
        <p className="text-h1 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, porro perferendis doloremque, asperiores voluptates itaque alias
          sed excepturi quam ipsam suscipit, pariatur ad dicta placeat veniam? Officiis eaque animi quia.
        </p>
        <p className="text-regular16">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, porro perferendis doloremque, asperiores voluptates itaque alias
          sed excepturi quam ipsam suscipit, pariatur ad dicta placeat veniam? Officiis eaque animi quia.
        </p>
        <p className="text-linkSmall text-amber-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, porro perferendis doloremque, asperiores voluptates itaque alias
          sed excepturi quam ipsam suscipit, pariatur ad dicta placeat veniam? Officiis eaque animi quia.
        </p>
        <p className="text-h1  ">Обычный текст</p>
        <p className="text-bold_text14 ">Жирный текст</p>
        <p className="text-linkSmall  ">Ссылка</p>
      </div>

      <div className="p-4 bg-black text-white">
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
      </div>

      <Select options={['что то там 1', 'что то там 2', 'что то там 3', 'что то там 4']} onChange={() => {}} width={'150px'} />
    </div>
  )
}
