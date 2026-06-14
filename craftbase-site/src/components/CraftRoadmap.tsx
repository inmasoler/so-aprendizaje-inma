import React from 'react';
import phases from '@site/src/data/phases.json';
import CraftBadge from '@site/src/components/CraftBadge';
import shared from './CraftShared.module.css';

type PhaseItem = {name: string; tag: string; desc: string};
type Phase = {
  num: string;
  title: string;
  status: 'live' | 'wip' | 'plan';
  statusLabel: string;
  why: string;
  connection: string;
  items: PhaseItem[];
};

const STATUS_MAP = {
  live: 'live' as const,
  next: 'wip' as const,
  later: 'plan' as const,
};

export default function CraftRoadmap(): React.ReactElement {
  const list = phases as Phase[];
  return (
    <div className={shared.craftGrid}>
      {list.map((p) => (
        <article key={p.num} className={shared.card}>
          <p className={shared.cardMeta}>
            {p.num} · <CraftBadge status={STATUS_MAP[p.status as keyof typeof STATUS_MAP] ?? 'plan'} label={p.statusLabel} />
          </p>
          <h3 className={shared.cardTitle}>{p.title}</h3>
          <p className={shared.cardBody}>{p.why}</p>
          <p className={shared.cardBody}>
            <strong>Conexión:</strong> {p.connection}
          </p>
          <ul>
            {p.items.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong> — {item.desc}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
