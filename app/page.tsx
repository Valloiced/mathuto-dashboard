'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthContext } from '@/context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    // Perform redirect upon component load
    // if (!user) {
    //   router.replace('/login');
    // }
    router.replace('/dashboard');
  }, [user, router]);

  return null;
}
