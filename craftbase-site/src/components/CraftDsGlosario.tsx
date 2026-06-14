import React, {useId, useMemo, useState} from 'react';
import clsx from 'clsx';
import terms from '@site/src/data/dsg-terms.json';
import cats from '@site/src/data/dsg-cats.json';
import shared from './CraftShared.module.css';
import filterStyles from './CraftFilter.module.css';

type Term = {
  term: string;
  cat: string;
  def: string;
  example?: string;
  features?: string[];
};
type Cat = {id: string; label: string};

export default function CraftDsGlosario(): React.ReactElement {
  const searchId = useId();
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');
  const list = terms as Term[];
  const categories = cats as Cat[];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return list.filter((t) => {
      const matchCat = cat === 'all' || t.cat === cat;
      const hay = `${t.term} ${t.def}`.toLowerCase();
      return matchCat && (!q || hay.includes(q));
    });
  }, [list, cat, query]);

  return (
    <div>
      <label className={filterStyles.searchLabel} htmlFor={searchId}>
        Buscar en glosario DS
      </label>
      <input
        id={searchId}
        type="search"
        className={filterStyles.search}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar término DS…"
      />
      <div className={filterStyles.chips} role="group" aria-label="Categoría DS">
        <button
          type="button"
          className={clsx(filterStyles.chip, cat === 'all' && filterStyles.chipActive)}
          aria-pressed={cat === 'all'}
          onClick={() => setCat('all')}>
          Todos
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={clsx(filterStyles.chip, cat === c.id && filterStyles.chipActive)}
            aria-pressed={cat === c.id}
            onClick={() => setCat(c.id)}>
            {c.label}
          </button>
        ))}
      </div>
      <ul className={shared.craftGrid}>
        {filtered.map((t) => (
          <li key={t.term} className={shared.card}>
            <h3 className={shared.cardTitle}>{t.term}</h3>
            <p className={shared.cardMeta}>
              {categories.find((c) => c.id === t.cat)?.label ?? t.cat}
            </p>
            <p className={shared.cardBody} dangerouslySetInnerHTML={{__html: t.def}} />
            {t.example ? <p className={shared.cardBody}>{t.example}</p> : null}
            {t.features?.length ? (
              <ul>
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
