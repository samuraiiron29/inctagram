'use client';

import { useEffect, useState } from 'react';
import { useMeQuery } from '@/shared/api/authApi'
import LinearProgress from '@/shared/ui/base/Liner/LinearProgress'

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isSuccess } = useMeQuery();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setIsInitialized(true)
    }
  }, [isSuccess])

  if (!isInitialized) {
    return <LinearProgress />
  }

  return <>{children}</>;
}
