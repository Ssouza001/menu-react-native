import { useEffect } from 'react';

// Minimal hook to satisfy the import used in app/index.jsx.
// In a real app this could load fonts or perform other startup tasks.
export function useFrameworkReady() {
  useEffect(() => {
    // no-op for now
  }, []);
}
