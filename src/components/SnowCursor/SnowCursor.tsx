'use client';

import { useEffect } from 'react';
import { snowflakeCursor } from 'cursor-effects';

export default function SnowCursor() {
  useEffect(() => {
    const effect = snowflakeCursor();
    return () => {

      effect.destroy?.();
    };
  }, []);

  return null;
}
