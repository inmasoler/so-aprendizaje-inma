import React from 'react';
import data from '@site/src/data/frameworks.json';
import shared from './CraftShared.module.css';

type Fw = {
  id: string;
  cat: string;
  name: string;
  color: string;
  tagline: string;
  desc: string;
  uses: string[];
};

type Criteria = {crit: string; cond: string; wins: Record<string, number>};
type Guide = {if_: string; then: string; note: string};

const {cats, catOrder, fws, criteria, guideRules} = data as {
  cats: Record<string, {label: string; color: string}>;
  catOrder: string[];
  fws: Fw[];
  criteria: Criteria[];
  guideRules: Guide[];
};

function winSymbol(v: number) {
  if (v === 2) return '★';
  if (v === 1) return '◆';
  return '·';
}

export default function CraftFrameworks(): React.ReactElement {
  const fwOrder: Fw[] = [];
  catOrder.forEach((c) => fws.filter((f) => f.cat === c).forEach((f) => fwOrder.push(f)));

  return (
    <div>
      <h2 className={shared.sectionTitle}>Matriz por criterio</h2>
      <div className={shared.tableWrap}>
        <table className={shared.table}>
          <thead>
            <tr>
              <th scope="col">Criterio</th>
              <th scope="col">Cuando esta es tu prioridad…</th>
              {fwOrder.map((f) => (
                <th key={f.id} scope="col">
                  {f.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criteria.map((row) => (
              <tr key={row.crit}>
                <td>{row.crit}</td>
                <td>{row.cond}</td>
                {fwOrder.map((f) => (
                  <td key={f.id}>{winSymbol(row.wins[f.id] || 0)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={shared.sectionTitle}>Perfiles por categoría</h2>
      {catOrder.map((catId) => {
        const cat = cats[catId];
        const group = fws.filter((f) => f.cat === catId);
        return (
          <div key={catId}>
            <h3 className={shared.sectionTitle} style={{color: cat.color}}>
              {cat.label}
            </h3>
            <ul className={shared.craftGrid}>
              {group.map((f) => (
                <li key={f.id} className={shared.card}>
                  <h4 className={shared.cardTitle} style={{color: f.color}}>
                    {f.name}
                  </h4>
                  <p className={shared.cardMeta}>{f.tagline}</p>
                  <p className={shared.cardBody}>{f.desc}</p>
                  <p className={shared.cardBody}>
                    <strong>Ideal cuando…</strong>
                  </p>
                  <ul>
                    {f.uses.map((u) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <h2 className={shared.sectionTitle}>Guía rápida</h2>
      <ul className={shared.craftGrid}>
        {guideRules.map((r) => (
          <li key={r.if_} className={shared.card}>
            <p className={shared.cardBody}>
              <strong>Si…</strong> {r.if_}
            </p>
            <p className={shared.cardBody}>
              <strong>→</strong> {r.then}
            </p>
            <p className={shared.cardBody}>{r.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
