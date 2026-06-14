/**
 * Copia arrays de script.js (legacy) a src/data/*.json
 * Uso: node scripts/extract-legacy-data.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const legacyJs = fs.readFileSync(
  path.join(__dirname, '..', '..', 'script.js'),
  'utf8',
);

function extractArray(name) {
  const start = legacyJs.indexOf(`const ${name} = [`);
  if (start < 0) throw new Error(`Missing const ${name}`);
  let i = legacyJs.indexOf('[', start);
  let depth = 0;
  for (; i < legacyJs.length; i++) {
    if (legacyJs[i] === '[') depth++;
    else if (legacyJs[i] === ']') {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  // eslint-disable-next-line no-eval
  return eval(legacyJs.slice(legacyJs.indexOf('[', start), i));
}

const outDir = path.join(__dirname, '..', 'src', 'data');
fs.mkdirSync(outDir, {recursive: true});

const glossary = extractArray('GLOSSARY');
const extraTerms = [
  {
    term: 'Frontmatter',
    cat: 'ecosistema',
    def: 'Bloque YAML al inicio de un archivo Markdown o MDX con metadatos del documento: título, fecha, tags o visibilidad. No es el cuerpo del texto; el generador del sitio (Docusaurus, Astro) lo lee al compilar.',
    example:
      '---\ntitle: Glosario\nvisibility: public\n---\n\n# Contenido del doc…',
  },
  {
    term: 'Zod',
    cat: 'ecosistema',
    def: 'Librería npm para validar en runtime que un objeto cumple un esquema. En sitios estáticos suele usarse en build para comprobar frontmatter o JSON antes de publicar.',
    example:
      'const schema = z.object({ title: z.string() }); schema.parse(frontmatter);',
  },
];

for (const t of extraTerms) {
  if (!glossary.some((g) => g.term === t.term)) glossary.push(t);
}

fs.writeFileSync(
  path.join(outDir, 'glossary.json'),
  JSON.stringify(glossary, null, 2),
);
fs.writeFileSync(
  path.join(outDir, 'dns-records.json'),
  JSON.stringify(extractArray('DNS_RECORDS'), null, 2),
);
fs.writeFileSync(
  path.join(outDir, 'dns-concepts.json'),
  JSON.stringify(extractArray('DNS_CONCEPTS'), null, 2),
);

console.log(
  `Extracted: glossary=${glossary.length}, dns-records=${extractArray('DNS_RECORDS').length}, dns-concepts=${extractArray('DNS_CONCEPTS').length}`,
);
