'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect when the component has hydrated on the client side.
 * Returns false during SSR and initial client render, true after hydration.
 */
export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
