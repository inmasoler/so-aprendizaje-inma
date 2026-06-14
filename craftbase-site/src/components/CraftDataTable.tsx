import React from 'react';
import clsx from 'clsx';
import type {DnsRecord} from '@site/src/components/craft-types';
import styles from './CraftDataTable.module.css';

type Props = {
  variant: 'dns';
  data: DnsRecord[];
  caption?: string;
};

export default function CraftDataTable({
  variant,
  data,
  caption = 'Registros DNS',
}: Props): React.ReactElement | null {
  if (variant !== 'dns') {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <caption className={styles.caption}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Tipo</th>
            <th scope="col">Nombre completo</th>
            <th scope="col">Para qué sirve</th>
            <th scope="col">Ejemplo</th>
            <th scope="col">Precaución</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.type}>
              <td>
                <code className={styles.typeCode}>{row.type}</code>
              </td>
              <td>{row.full}</td>
              <td>{row.desc}</td>
              <td className={styles.exampleCell}>
                <code>{row.example}</code>
              </td>
              <td
                className={clsx(
                  row.warn ? styles.warnCell : styles.warnEmpty,
                )}>
                {row.warn || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
