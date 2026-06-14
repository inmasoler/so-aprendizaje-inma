import React from 'react';
import data from '@site/src/data/docker-curso.json';
import shared from './CraftShared.module.css';

type Card = {
  name: string;
  cat?: string;
  color?: string;
  def: string;
  cmd?: string;
  tip?: string;
};

type CheatRow = {section?: string; cmd?: string; desc?: string; note?: string};

const sections: {key: keyof typeof data; title: string}[] = [
  {key: 'fundamentos', title: 'Fundamentos'},
  {key: 'imgCards', title: 'Imágenes'},
  {key: 'networks', title: 'Redes'},
  {key: 'volumes', title: 'Volúmenes'},
  {key: 'netConcepts', title: 'Conceptos de red'},
  {key: 'composeCards', title: 'Docker Compose'},
  {key: 'tools', title: 'Herramientas'},
  {key: 'k8sConcepts', title: 'Kubernetes — conceptos'},
  {key: 'k8sObjects', title: 'Kubernetes — objetos'},
  {key: 'cases', title: 'Casos de uso'},
];

function CardGrid({items}: {items: Card[]}): React.ReactElement {
  return (
    <ul className={shared.craftGrid}>
      {items.map((item) => (
        <li key={item.name} className={shared.card}>
          {item.cat ? (
            <p className={shared.cardMeta} style={{color: item.color}}>
              {item.cat}
            </p>
          ) : null}
          <h3 className={shared.cardTitle}>{item.name}</h3>
          <p className={shared.cardBody}>{item.def}</p>
          {item.cmd ? (
            <pre className={shared.cardBody}>
              <code>{item.cmd}</code>
            </pre>
          ) : null}
          {item.tip ? <p className={shared.cardBody}>{item.tip}</p> : null}
        </li>
      ))}
    </ul>
  );
}

export default function CraftDockerCurso(): React.ReactElement {
  const d = data as Record<string, unknown>;
  return (
    <div>
      {sections.map(({key, title}) => {
        const items = d[key];
        if (!Array.isArray(items) || !items.length) return null;
        return (
          <section key={key}>
            <h2 className={shared.sectionTitle}>{title}</h2>
            <CardGrid items={items as Card[]} />
          </section>
        );
      })}

      <h2 className={shared.sectionTitle}>Cheatsheet de comandos</h2>
      <div className={shared.tableWrap}>
        <table className={shared.table}>
          <thead>
            <tr>
              <th>Comando</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {(d.cheatsheet as CheatRow[]).map((row, i) =>
              row.section ? (
                <tr key={row.section}>
                  <th colSpan={2} scope="colgroup">
                    {row.section}
                  </th>
                </tr>
              ) : (
                <tr key={`${row.cmd}-${i}`}>
                  <td>
                    <code>{row.cmd}</code>
                  </td>
                  <td>
                    {row.desc}
                    {row.note ? ` — ${row.note}` : ''}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

      <h2 className={shared.sectionTitle}>Anatomía docker-compose.yml</h2>
      <ul className={shared.craftGrid}>
        {(d.composeAnatomy as {key: string; fields: {k: string; d: string}[]}[]).map((b) => (
          <li key={b.key} className={shared.card}>
            <h3 className={shared.cardTitle}>
              <code>{b.key}</code>
            </h3>
            <ul>
              {b.fields.map((f) => (
                <li key={f.k}>
                  <code>{f.k}</code> — {f.d}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h2 className={shared.sectionTitle}>Dockerfile línea a línea</h2>
      <ul className={shared.craftGrid}>
        {(d.dockerfile as {instr: string; code: string; desc: string}[]).map((l) => (
          <li key={l.instr} className={shared.card}>
            <h3 className={shared.cardTitle}>
              <code>
                {l.instr} {l.code}
              </code>
            </h3>
            <p className={shared.cardBody}>{l.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
