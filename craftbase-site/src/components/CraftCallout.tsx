import React from 'react';
import clsx from 'clsx';
import styles from './CraftCallout.module.css';

export type CalloutVariant = 'info' | 'warn' | 'tip';

type Props = {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
};

export default function CraftCallout({
  variant = 'info',
  title,
  children,
}: Props): React.ReactElement {
  const label =
    title ??
    (variant === 'warn' ? 'Aviso' : variant === 'tip' ? 'Consejo' : 'Nota');

  return (
    <aside
      className={clsx(styles.callout, styles[variant])}
      role="note"
      aria-label={label}>
      {title ? <p className={styles.title}>{title}</p> : null}
      <div className={styles.body}>{children}</div>
    </aside>
  );
}
