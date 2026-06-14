import React from 'react';
import tools from '@site/src/data/dst-tools.json';
import cats from '@site/src/data/dst-cats.json';
import shared from './CraftShared.module.css';

type Tool = {
  name: string;
  cat: string;
  url: string;
  type: string;
  emoji: string;
  desc: string;
};

type Cat = {id: string; label: string; color: string};

export default function CraftDsTools(): React.ReactElement {
  const list = tools as Tool[];
  const categories = cats as Cat[];

  return (
    <div>
      {categories.map((cat) => {
        const group = list.filter((t) => t.cat === cat.id);
        if (!group.length) return null;
        return (
          <section key={cat.id}>
            <h2 className={shared.sectionTitle} style={{color: cat.color}}>
              {cat.label}
            </h2>
            <ul className={shared.craftGrid}>
              {group.map((t) => (
                <li key={t.name} className={shared.card}>
                  <h3 className={shared.cardTitle}>
                    {t.emoji}{' '}
                    <a href={t.url} target="_blank" rel="noopener noreferrer">
                      {t.name}
                    </a>
                  </h3>
                  <p className={shared.cardMeta}>{t.type}</p>
                  <p className={shared.cardBody}>{t.desc}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
