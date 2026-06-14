import React, {useCallback, useEffect, useState} from 'react';
import clsx from 'clsx';
import styles from './TextSizeToggle.module.css';

const STORAGE_KEY = 'craftbase-text-size';

type TextSize = 'normal' | 'large';

function applyTextSize(size: TextSize) {
  document.documentElement.dataset.textSize = size === 'large' ? 'large' : '';
}

export default function TextSizeToggle(): React.ReactElement {
  const [size, setSize] = useState<TextSize>('normal');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial: TextSize = stored === 'large' ? 'large' : 'normal';
    setSize(initial);
    applyTextSize(initial);
  }, []);

  const toggle = useCallback(() => {
    setSize((prev) => {
      const next: TextSize = prev === 'large' ? 'normal' : 'large';
      localStorage.setItem(STORAGE_KEY, next);
      applyTextSize(next);
      return next;
    });
  }, []);

  return (
    <button
      type="button"
      className={clsx(styles.toggle, size === 'large' && styles.active)}
      onClick={toggle}
      aria-pressed={size === 'large'}
      aria-label={
        size === 'large'
          ? 'Restablecer tamaño de texto normal'
          : 'Aumentar tamaño de texto'
      }
      title="Texto +">
      A+
    </button>
  );
}
