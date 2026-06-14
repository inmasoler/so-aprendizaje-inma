import React from 'react';
import data from '@site/src/data/api-mysql.json';
import shared from './CraftShared.module.css';

const {
  types,
  principles,
  httpMethods,
  dataLocations,
  httpCodes,
  restCompare,
  mysqlTables,
  reservaEstados,
} = data;

export function CraftApiOverview(): React.ReactElement {
  return (
    <div>
      <div className={shared.tableWrap}>
        <table className={shared.table}>
          <caption>Tipos de API</caption>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Cuándo</th>
            </tr>
          </thead>
          <tbody>
            {(types as {type: string; desc: string; when: string}[]).map((r) => (
              <tr key={r.type}>
                <td>{r.type}</td>
                <td>{r.desc}</td>
                <td>{r.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className={shared.craftGrid}>
        {(principles as {name: string; desc: string}[]).map((p) => (
          <li key={p.name} className={shared.card}>
            <h3 className={shared.cardTitle}>{p.name}</h3>
            <p className={shared.cardBody}>{p.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CraftApiRoutes(): React.ReactElement {
  return (
    <div>
      <h2 className={shared.sectionTitle}>Métodos HTTP</h2>
      <div className={shared.tableWrap}>
        <table className={shared.table}>
          <thead>
            <tr>
              <th>Método</th>
              <th>Uso</th>
              <th>Idempotente</th>
              <th>Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            {(httpMethods as {method: string; use: string; idempotent: string; example: string}[]).map((r) => (
              <tr key={r.method}>
                <td>
                  <code>{r.method}</code>
                </td>
                <td>{r.use}</td>
                <td>{r.idempotent}</td>
                <td>
                  <code>{r.example}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className={shared.sectionTitle}>Dónde van los datos</h2>
      <div className={shared.tableWrap}>
        <table className={shared.table}>
          <thead>
            <tr>
              <th>Ubicación</th>
              <th>Regla</th>
              <th>Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            {(dataLocations as {where: string; rule: string; example: string}[]).map((d) => (
              <tr key={d.where}>
                <td>{d.where}</td>
                <td>{d.rule}</td>
                <td>
                  <code>{d.example}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className={shared.sectionTitle}>Códigos HTTP</h2>
      <div className={shared.tableWrap}>
        <table className={shared.table}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            {(httpCodes as {code: string; desc: string; example: string}[]).map((r) => (
              <tr key={r.code}>
                <td>{r.code}</td>
                <td>{r.desc}</td>
                <td>{r.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className={shared.sectionTitle}>Buenas prácticas REST</h2>
      <div className={shared.tableWrap}>
        <table className={shared.table}>
          <thead>
            <tr>
              <th>Evitar</th>
              <th>Preferir</th>
              <th>Por qué</th>
            </tr>
          </thead>
          <tbody>
            {(restCompare as {bad: string; good: string; why: string}[]).map((r) => (
              <tr key={r.bad}>
                <td>
                  <code>{r.bad}</code>
                </td>
                <td>
                  <code>{r.good}</code>
                </td>
                <td>{r.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CraftApiMysqlTables(): React.ReactElement {
  return (
    <div>
      <h2 className={shared.sectionTitle}>Tablas MySQL (ejemplo reserva)</h2>
      <ul className={shared.craftGrid}>
        {(mysqlTables as {name: string; fields: {col: string; type: string; note: string}[]}[]).map((t) => (
          <li key={t.name} className={shared.card}>
            <h3 className={shared.cardTitle}>{t.name}</h3>
            <ul>
              {t.fields.map((c) => (
                <li key={c.col}>
                  <code>{c.col}</code> ({c.type}) — {c.note}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <h2 className={shared.sectionTitle}>Estados de reserva</h2>
      <div className={shared.tableWrap}>
        <table className={shared.table}>
          <thead>
            <tr>
              <th>Estado</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {(reservaEstados as {estado: string; desc: string}[]).map((r) => (
              <tr key={r.estado}>
                <td>{r.estado}</td>
                <td>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
