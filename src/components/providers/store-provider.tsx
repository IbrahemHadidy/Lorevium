'use client';

import { initializeAuth } from '@/lib/features/auth/auth.slice';
import { type AppStore, makeStore } from '@/lib/store';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current!;
    store.dispatch(initializeAuth());

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      if (state.auth.isInitialized) {
        unsubscribe();
      }
    });
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
