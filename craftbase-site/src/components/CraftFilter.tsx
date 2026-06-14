import React, {useId, useMemo, useState} from 'react';
import clsx from 'clsx';
import glossaryData from '@site/src/data/glossary.json';
import {
  GLOSSARY_CATEGORIES,
  type GlossaryCategoryId,
  type GlossaryCategorySlug,
  type GlossaryItem,
} from '@site/src/components/craft-types';
import styles from './CraftFilter.module.css';

type Props = {
  variant: 'glossary';
};

const CAT_TAG_CLASS: Record<GlossaryCategorySlug, string> = {
  rendering: styles.catRendering,
  arquitectura: styles.catArquitectura,
  datos: styles.catDatos,
  deploy: styles.catDeploy,
  ds: styles.catDs,
  ecosistema: styles.catEcosistema,
};

function categoryLabel(id: string): string {
  return GLOSSARY_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export default function CraftFilter({variant}: Props): React.ReactElement | null {
  const items = glossaryData as GlossaryItem[];
  const searchId = useId();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GlossaryCategoryId>('all');

  const filtered = useMemo(() => {
    if (variant !== 'glossary') return [];
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchCat = category === 'all' || item.cat === category;
      const haystack = `${item.term} ${item.def} ${item.example}`.toLowerCase();
      const matchQuery = !q || haystack.includes(q);
      return matchCat && matchQuery;
    });
  }, [variant, items, query, category]);

  if (variant !== 'glossary') {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <label className={styles.searchLabel} htmlFor={searchId}>
        Buscar en el glosario
      </label>
      <input
        id={searchId}
        type="search"
        className={styles.search}
        placeholder="Buscar término… (ej: npm, hydration, MCP, frontmatter)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div
        className={styles.chips}
        role="group"
        aria-label="Filtrar por categoría">
        {GLOSSARY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={clsx(
              styles.chip,
              category === cat.id && styles.chipActive,
              cat.id === 'ecosistema' && styles.chipEcosystem,
            )}
            aria-pressed={category === cat.id}
            onClick={() => setCategory(cat.id)}>
            {cat.label}
          </button>
        ))}
      </div>

      <p className={styles.resultCount} aria-live="polite" aria-atomic="true">
        {filtered.length === items.length
          ? `${items.length} términos`
          : `${filtered.length} de ${items.length} términos`}
      </p>

      <ul className={styles.list}>
        {filtered.map((item) => {
          const catClass =
            CAT_TAG_CLASS[item.cat as GlossaryCategorySlug] ??
            styles.catEcosistema;

          return (
            <li key={item.term} className={styles.term}>
              <div className={styles.termHead}>
                <h3 className={styles.termName}>{item.term}</h3>
                <span className={clsx(styles.termCat, catClass)}>
                  {categoryLabel(item.cat)}
                </span>
              </div>
              <div className={styles.termBody}>
                <p className={styles.termDef}>{item.def}</p>
                <p className={styles.termExample}>
                  <span className={styles.exampleLabel}>Ejemplo: </span>
                  {item.example}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 ? (
        <p className={styles.empty} role="status">
          Ningún término coincide con la búsqueda.
        </p>
      ) : null}
    </div>
  );
}
