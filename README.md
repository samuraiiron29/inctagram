pnpm install
pnpm dev
pnpm build - сборка в production

- Next.js
- TS
- pnpm
- FSD
- Radix UI + Tailwind CSS
- clsx
- React Hook Form

src/
├── app/ # Основная папка с роутами Next.js (app router)
│ ├── layout.tsx # Общий layout для всего приложения
│ ├── page.tsx # Корневая страница "/"
│ ├── dashboard/ # Пример вложенного маршрута
│ │ ├── layout.tsx # Layout для /dashboard
│ │ └── page.tsx # Страница /dashboard
│ └── ... # Другие маршруты
│
├── shared/ # Повторно используемые сущности (UI, hooks, utils)
│ ├── ui/
│ ├── hooks/
│ ├── lib/
│ └── types/
│
├── entities/ # Сущности (User, Post, Product и т.п.)
│ ├── User/
│ │ ├── model/
│ │ ├── ui/
│ │ └── types.ts
│ └── Product/
│ ├── model/
│ ├── ui/
│ └── types.ts
│
├── features/ # Фичи (например, авторизация, поиск)
│ ├── Auth/
│ │ ├── ui/
│ │ ├── model/
│ │ └── api/
│ └── Search/
│ ├── ui/
│ └── model/
│
├── widgets/ # Крупные компоненты из нескольких фич и сущностей
│ └── Sidebar/
│ ├── ui/
│ ├── model/
│ └── types.ts
│
├── processes/ # Последовательности, процессы (например, заказ)
│ └── Checkout/
│ ├── ui/
│ ├── model/
│ └── types.ts
│
└── styles/ # Глобальные стили
