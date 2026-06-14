import React from 'react';
import items from '@site/src/data/hosting.json';
import shared from './CraftShared.module.css';

type Host = {
  name: string;
  color: string;
  tagline: string;
  desc: string;
  pills: string[];
  best: string;
};

export default function CraftHosting(): React.ReactElement {
  const hosts = items as Host[];
  return (
    <ul className={shared.craftGrid}>
      {hosts.map((h) => (
        <li key={h.name} className={shared.card}>
          <h3 className={shared.cardTitle} style={{color: h.color === '#fff' ? undefined : h.color}}>
            {h.name}
          </h3>
          <p className={shared.cardMeta}>{h.tagline}</p>
          <p className={shared.cardBody}>{h.desc}</p>
          <div className={shared.pills}>
            {h.pills.map((p) => (
              <span key={p} className={shared.pill}>
                {p}
              </span>
            ))}
          </div>
          <p className={shared.cardBody}>
            <strong>Ideal cuando:</strong> {h.best}
          </p>
        </li>
      ))}
    </ul>
  );
}
