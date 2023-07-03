'use client';

import { useEffect, useState } from 'react';

import { StoreModal } from '@/components/modals/store-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // to prevent a hydration error
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};