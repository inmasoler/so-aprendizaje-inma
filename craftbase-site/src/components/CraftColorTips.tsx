import React from 'react';
import tips from '@site/src/data/dst-color-tips.json';
import shared from './CraftShared.module.css';

type Tip = {kicker: string; title: string; text: string; points: string[]};

export default function CraftColorTips(): React.ReactElement {
  const list = tips as Tip[];
  return (
    <ul className={shared.craftGrid}>
      {list.map((t) => (
        <li key={t.title} className={shared.card}>
          <p className={shared.cardMeta}>{t.kicker}</p>
          <h3 className={shared.cardTitle}>{t.title}</h3>
          <p className={shared.cardBody}>{t.text}</p>
          <ul>
            {t.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
