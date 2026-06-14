import React from 'react';
import CraftConceptCards from '@site/src/components/CraftConceptCards';
import shared from './CraftShared.module.css';

type Concept = {
  name: string;
  type: string;
  color: string;
  def: string;
  example: string;
  warn?: string;
};

type CacheType = {
  name: string;
  type: string;
  color: string;
  desc: string;
  pros: string;
  cons: string;
};

type SecurityItem = {
  icon: string;
  name: string;
  level: string;
  desc: string;
};

export function CraftConceptList({items}: {items: Concept[]}): React.ReactElement {
  return <CraftConceptCards items={items.map((i) => ({...i, warn: i.warn || ''}))} />;
}

export function CraftCacheCompare({items}: {items: CacheType[]}): React.ReactElement {
  return (
    <ul className={shared.craftGrid}>
      {items.map((c) => (
        <li key={c.name} className={shared.card}>
          <h3 className={shared.cardTitle} style={{color: c.color}}>
            {c.name}
          </h3>
          <p className={shared.cardMeta}>{c.type}</p>
          <p className={shared.cardBody}>{c.desc}</p>
          <p className={shared.cardBody}>✓ {c.pros}</p>
          <p className={shared.cardBody}>✗ {c.cons}</p>
        </li>
      ))}
    </ul>
  );
}

export function CraftSecurityGrid({items}: {items: SecurityItem[]}): React.ReactElement {
  return (
    <ul className={shared.craftGrid}>
      {items.map((s) => (
        <li key={s.name} className={shared.card}>
          <p className={shared.cardMeta}>
            {s.icon} · {s.level}
          </p>
          <h3 className={shared.cardTitle}>{s.name}</h3>
          <p
            className={shared.cardBody}
            dangerouslySetInnerHTML={{__html: s.desc}}
          />
        </li>
      ))}
    </ul>
  );
}
