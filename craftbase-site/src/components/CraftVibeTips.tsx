import React, {useId, useMemo, useState} from 'react';
import clsx from 'clsx';
import items from '@site/src/data/vibetips.json';
import styles from './CraftVibeTips.module.css';
import shared from './CraftShared.module.css';

const FW_OPTIONS = [
  {id: 'all', label: 'Todos'},
  {id: 'next', label: 'Next.js'},
  {id: 'astro', label: 'Astro'},
  {id: 'react', label: 'React'},
  {id: 'fastapi', label: 'FastAPI'},
  {id: 'supabase', label: 'Supabase'},
  {id: 'general', label: 'General'},
];

type Tip = {
  fw: string;
  fwlabel: string;
  fwcolor: string;
  type: string;
  title: string;
  desc: string;
  prompt: string;
};

export default function CraftVibeTips(): React.ReactElement {
  const searchId = useId();
  const [fw, setFw] = useState('all');
  const [query, setQuery] = useState('');
  const tips = items as Tip[];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tips.filter((t) => {
      const matchFw = fw === 'all' || t.fw === fw;
      const hay = `${t.title} ${t.desc} ${t.type} ${t.prompt}`.toLowerCase();
      return matchFw && (!q || hay.includes(q));
    });
  }, [tips, fw, query]);

  return (
    <div>
      <label className={styles.visuallyHidden} htmlFor={searchId}>
        Buscar VibeTips
      </label>
      <input
        id={searchId}
        type="search"
        className={styles.search}
        placeholder="Buscar prompt o framework…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className={styles.chips} role="group" aria-label="Filtrar por framework">
        {FW_OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            className={clsx(styles.chip, fw === o.id && styles.chipActive)}
            aria-pressed={fw === o.id}
            onClick={() => setFw(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
      <p className={styles.count} aria-live="polite">
        {filtered.length} prompts
      </p>
      <ul className={shared.craftGrid}>
        {filtered.map((t) => (
          <li key={t.title} className={shared.card}>
            <p className={shared.cardMeta}>
              <span style={{color: t.fwcolor}}>{t.fwlabel}</span> · {t.type}
            </p>
            <h3 className={shared.cardTitle}>{t.title}</h3>
            <p className={shared.cardBody}>{t.desc}</p>
            <pre className={shared.prompt}>{t.prompt}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
