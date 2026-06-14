import React from 'react';
import clsx from 'clsx';
import styles from './CraftBadge.module.css';

export type BadgeStatus = 'live' | 'wip' | 'plan';

type Props = {
  status: BadgeStatus;
  label?: string;
};

const DEFAULT_LABELS: Record<BadgeStatus, string> = {
  live: 'Live',
  wip: 'WIP',
  plan: 'Plan',
};

export default function CraftBadge({status, label}: Props): React.ReactElement {
  return (
    <span className={clsx(styles.badge, styles[status])}>
      {label ?? DEFAULT_LABELS[status]}
    </span>
  );
}
