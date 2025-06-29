'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    
    const listener = () => {
      setMatches(media.matches);
    };

    // Set initial state
    listener();
    
    // Use addEventListener for modern browsers
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);

  }, [query]);

  return matches;
}
