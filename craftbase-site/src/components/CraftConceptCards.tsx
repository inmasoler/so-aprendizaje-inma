import React from 'react';
import type {DnsConcept} from '@site/src/components/craft-types';
import styles from './CraftConceptCards.module.css';

type Props = {
  items: DnsConcept[];
};

export default function CraftConceptCards({items}: Props): React.ReactElement {
  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={item.name} className={styles.card}>
          <div className={styles.cardHead}>
            <h3 className={styles.name} style={{color: item.color}}>
              {item.name}
            </h3>
            <span className={styles.type}>{item.type}</span>
          </div>
          <p className={styles.def}>{item.def}</p>
          <p className={styles.example}>
            <span className={styles.exampleLabel}>Ejemplo: </span>
            {item.example}
          </p>
          {item.warn ? (
            <p className={styles.warn} role="note">
              {item.warn}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
