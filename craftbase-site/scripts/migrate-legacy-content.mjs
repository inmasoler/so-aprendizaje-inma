/**
 * Migra contenido legacy → docs/ (Markdown) + src/data/ (JSON)
 * Uso: node scripts/migrate-legacy-content.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import {gfm} from 'turndown-plugin-gfm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const repoRoot = path.join(root, '..');
const docsDir = path.join(root, 'docs');
const dataDir = path.join(root, 'src', 'data');

const html = fs.readFileSync(path.join(repoRoot, 'index.html'), 'utf8');
const legacyJs = fs.readFileSync(path.join(repoRoot, 'script.js'), 'utf8');
const $ = cheerio.load(html);

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
});
turndown.use(gfm);
turndown.addRule('removeButtons', {
  filter: ['button'],
  replacement: () => '',
});
turndown.addRule('removeNav', {
  filter: (node) => {
    const cls = node.getAttribute?.('class') || '';
    return /sidenav|subtabs|git-subtabs|dep-stabs|ds-subtabs|js-sn-wrap|diseno-sn-wrap|sn-arr/.test(
      cls,
    );
  },
  replacement: () => '',
});
turndown.addRule('craftbaseFencedCode', {
  filter: (node) => node.nodeName === 'PRE',
  replacement: (_content, node) => {
    const codeEl = node.querySelector('code');
    const lang = codeEl?.getAttribute('data-lang') || '';
    const code = (codeEl?.textContent ?? node.textContent ?? '').replace(/\n$/, '');
    return `\n\n\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
  },
});

const CRAFT_CLASS_PREFIXES = [
  'craft-card',
  'craft-card-grid',
  'craft-steps',
  'craft-aside',
  'craft-intro',
  'craft-section-label',
  'craft-card-label',
  'craft-group-label',
  'craft-card-title',
  'craft-step',
];

function hasCraftClass(node) {
  const cls = node.getAttribute?.('class') || '';
  return CRAFT_CLASS_PREFIXES.some((prefix) => cls.includes(prefix));
}

function craftHtmlReplacement(content, node) {
  const cls = node.getAttribute('class') || '';
  const id = node.getAttribute('id') || '';
  const tag = node.nodeName.toLowerCase();
  const clsAttr = cls ? ` class="${cls}"` : '';
  const idAttr = id ? ` id="${id}"` : '';
  return `\n\n<${tag}${clsAttr}${idAttr}>\n${content.trim()}\n</${tag}>\n\n`;
}

turndown.addRule('craftHeadings', {
  filter: ['h2', 'h3', 'h4'],
  replacement: (content, node) => {
    const level = Number(node.nodeName.charAt(1));
    const id = node.getAttribute('id');
    const prefix = '#'.repeat(level);
    const text = content.trim();
    const idSuffix = id ? ` {#${id}}` : '';
    return `\n\n${prefix} ${text}${idSuffix}\n\n`;
  },
});

turndown.addRule('craftHtmlShell', {
  filter: (node) => {
    if (!node.getAttribute) return false;
    const tag = node.nodeName;
    if (tag === 'DIV' && hasCraftClass(node)) return true;
    if (tag === 'BLOCKQUOTE' && hasCraftClass(node)) return true;
    if (tag === 'P' && hasCraftClass(node)) return true;
    if (tag === 'OL' && hasCraftClass(node)) return true;
    if (tag === 'LI' && hasCraftClass(node)) return true;
    return false;
  },
  replacement: craftHtmlReplacement,
});

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Etiquetas meta (Hook fundamental…) → h3 = título; temáticas (Estado con objetos) → h3 = label, h4 = título */
const META_CARD_LABEL =
  /^(Hook |Concepto |Principio|Actualizaciones |Compartir |Prop |Reglas |Patrón |Resumen |Ejemplo |Anti-pattern|Alternativa|Cuándo |Dónde |Cómo |Flujo |Paso |Capa |Nivel )/i;

function planCardHeadings(label, title, num) {
  const fullTitle = num && title ? `${num} · ${title}` : title || label;
  if (!label || META_CARD_LABEL.test(label) || label === fullTitle) {
    return {showLabel: Boolean(label), primary: fullTitle, secondary: null};
  }
  return {showLabel: false, primary: label, secondary: fullTitle};
}

function appendHeading($f, $parent, tag, text, usedIds) {
  if (!text) return;
  let id = slugify(text);
  if (usedIds.has(id)) {
    let n = 2;
    while (usedIds.has(`${id}-${n}`)) n++;
    id = `${id}-${n}`;
  }
  usedIds.add(id);
  $parent.append($f(`<${tag} id="${id}"></${tag}>`).text(text));
}

function inferLang(className, text) {
  const cls = className || '';
  const trimmed = text.trimStart();

  if (cls.includes('git-code')) return 'bash';
  if (cls.includes('aria-code')) return 'html';
  if (cls.includes('js-code') || cls.includes('js-method')) return 'javascript';
  if (cls.includes('api-code')) {
    return trimmed.startsWith('--') ? 'sql' : 'javascript';
  }
  if (cls.includes('wa-flow-block')) return 'text';
  if (cls.includes('wa-card-code') || cls.includes('wa-hook-code')) {
    if (trimmed.startsWith('---')) return 'yaml';
    if (trimmed.startsWith('--color') || trimmed.startsWith('--')) return 'css';
    if (trimmed.includes('client:') || trimmed.includes('<')) return 'astro';
    return 'typescript';
  }
  if (cls.includes('rt-')) return 'tsx';
  return '';
}

function normalizePreBlocks($f) {
  $f('pre').each((_, el) => {
    const $pre = $f(el);
    const cls = $pre.attr('class') || '';
    const text = $pre.text().replace(/\n$/, '');
    const lang = inferLang(cls, text);
    const $code = $f('<code></code>').attr('data-lang', lang);
    if (lang) {
      $code.addClass(`language-${lang}`);
    }
    $code.text(text);
    $pre.empty().removeAttr('class').append($code);
  });
}

function transformGitSteps($f) {
  $f('.git-steps').each((_, steps) => {
    const $steps = $f(steps);
    const $ol = $f('<ol class="craft-steps craft-steps--git"></ol>');
    $steps.find('.git-step').each((_, step) => {
      const $step = $f(step);
      const title = $step.find('strong').first().text().trim();
      const innerHtml = $step.find('div').first().html() || '';
      const cmd = innerHtml
        .split(/<br\s*\/?>/i)
        .slice(1)
        .join('\n')
        .replace(/<[^>]+>/g, '')
        .trim();
      const $li = $f('<li class="craft-step"></li>');
      if (title) {
        $li.append($f('<p></p>').append($f('<strong></strong>').text(title)));
      }
      if (cmd) {
        const $pre = $f('<pre></pre>').append(
          $f('<code></code>').addClass('language-bash').attr('data-lang', 'bash').text(cmd),
        );
        $li.append($pre);
      }
      $ol.append($li);
    });
    $steps.replaceWith($ol);
  });
}

function transformGitCards($f) {
  const usedIds = new Set();
  $f('.git-card').each((_, card) => {
    const $c = $f(card);
    const title = $c.find('.git-card-title').text().trim();
    $c.find('.git-card-title').remove();
    $c.find('.git-list').removeClass('git-list');
    const $body = $f('<div class="craft-card craft-card--git"></div>');
    $body.append($c.contents());
    const $block = $f('<div></div>');
    if (title) {
      appendHeading($f, $block, 'h3', title, usedIds);
    }
    $block.append($body);
    $c.replaceWith($block.contents());
  });
}

function transformCards($f, sel, variant) {
  const usedIds = new Set();
  $f(sel.card).each((_, card) => {
    const $c = $f(card);
    const $body = $f(`<div class="craft-card craft-card--${variant}"></div>`);
    const label = sel.label ? $c.find(sel.label).text().trim() : '';
    const num = sel.num ? $c.find(sel.num).text().trim() : '';
    const title = $c.find(sel.title).text().trim();
    const plan = planCardHeadings(label, title, num);

    if (plan.showLabel && label) {
      $body.append($f('<p class="craft-card-label"></p>').text(label));
    }

    const $block = $f('<div></div>');
    if (plan.secondary) {
      appendHeading($f, $block, 'h3', plan.primary, usedIds);
      appendHeading($f, $block, 'h4', plan.secondary, usedIds);
    } else if (plan.primary) {
      appendHeading($f, $block, 'h3', plan.primary, usedIds);
    }
    if (sel.path) {
      const path = $c.find(sel.path).text().trim();
      if (path) {
        $body.append(
          $f('<p></p>').html(`<strong>Ruta:</strong> <code>${path}</code>`),
        );
      }
    }
    const def = $c.find(sel.def).html();
    if (def) {
      $body.append($f('<p></p>').html(def));
    }
    const why = $c.find(sel.why).html();
    if (why) {
      $body.append(
        $f(
          `<blockquote class="craft-aside craft-aside--why craft-aside--${variant}"></blockquote>`,
        ).html(`<p><strong>Por qué:</strong> ${why}</p>`),
      );
    }
    $c.find('pre').each((_, pre) => {
      $body.append($f(pre).clone());
    });
    const tip = sel.tip ? $c.find(sel.tip).html() : '';
    if (tip) {
      $body.append(
        $f(
          `<blockquote class="craft-aside craft-aside--tip craft-aside--${variant}"></blockquote>`,
        ).html(`<p><strong>Tip:</strong> ${tip}</p>`),
      );
    }
    $block.append($body);
    $c.replaceWith($block.contents());
  });
}

function transformHookCards($f, variant) {
  const usedIds = new Set();
  $f('.rt-hook-card').each((_, card) => {
    const $c = $f(card);
    const $body = $f(
      `<div class="craft-card craft-card--hook craft-card--${variant}"></div>`,
    );
    const $block = $f('<div></div>');
    const $name = $c.find('.rt-hook-name').first();
    const tag = $name.find('.rt-hook-tag').text().trim();
    const hookName = $name
      .clone()
      .children('.rt-hook-tag')
      .remove()
      .end()
      .text()
      .trim();
    const title = tag ? `${hookName} · ${tag}` : hookName;
    if (title) {
      appendHeading($f, $block, 'h3', title, usedIds);
    }
    const when = $c.find('.rt-hook-when').html();
    if (when) {
      $body.append($f('<p></p>').html(`<strong>Cuándo:</strong> ${when}`));
    }
    const why = $c.find('.rt-hook-why').html();
    if (why) {
      $body.append(
        $f(
          `<blockquote class="craft-aside craft-aside--why craft-aside--${variant}"></blockquote>`,
        ).html(`<p><strong>Por qué:</strong> ${why}</p>`),
      );
    }
    $c.find('pre').each((_, pre) => {
      $body.append($f(pre).clone());
    });
    $block.append($body);
    $c.replaceWith($block.contents());
  });
}

function transformReactSteps($f, variant) {
  $f('.rt-step-list').addClass(`craft-steps craft-steps--${variant}`);
  $f('.rt-step').addClass('craft-step');
  $f('.rt-step').each((_, step) => {
    const $s = $f(step);
    const title = $s.find('.rt-step-title').text().trim();
    const desc = $s.find('.rt-step-desc').html();
    const pres = $s
      .find('pre')
      .toArray()
      .map((pre) => $f(pre).clone());
    $s.find('pre').remove();
    $s.empty();
    if (title) {
      $s.append($f('<h4></h4>').text(title));
    }
    if (desc) {
      $s.append($f('<p></p>').html(desc));
    }
    for (const $pre of pres) {
      $s.append($pre);
    }
  });
  $f('.rt-step-num').remove();
}

function wrapCardGrid($f, gridSel) {
  $f(gridSel).each((_, grid) => {
    $f(grid).replaceWith($f(grid).contents());
  });
}

function transformStructure($f, variant = 'default') {
  $f('.git-note, .rt-note, .wa-note').each((_, el) => {
    const $el = $f(el);
    $el.replaceWith(
      $f(`<blockquote class="craft-intro craft-intro--${variant}"></blockquote>`).html(
        $el.html() || '',
      ),
    );
  });

  $f('.js-intro').each((_, el) => {
    const $el = $f(el);
    $el.replaceWith(
      $f('<blockquote class="craft-intro craft-intro--js"></blockquote>').html(
        $el.html() || '',
      ),
    );
  });

  $f('.rt-section-label').each((_, el) => {
    const text = $f(el).text().trim();
    $f(el).replaceWith(
      $f(`<h2 id="${slugify(text)}"></h2>`).text(text),
    );
  });

  $f('.wa-section-label').each((_, el) => {
    const text = $f(el).text().trim();
    $f(el).replaceWith(
      $f(`<h2 id="${slugify(text)}"></h2>`).text(text),
    );
  });

  $f('.js-section-label').each((_, el) => {
    const text = $f(el).text().trim();
    $f(el).replaceWith(
      $f(`<h2 id="${slugify(text)}"></h2>`).text(text),
    );
  });

  transformGitCards($f);
  transformGitSteps($f);

  transformCards($f, {
    card: '.rt-card',
    label: '.rt-card-label',
    title: '.rt-card-title',
    path: '.rt-card-path',
    def: '.rt-card-def',
    why: '.rt-card-why',
    tip: '.rt-card-tip',
  }, 'react');

  transformCards($f, {
    card: '.wa-card',
    title: '.wa-card-title',
    path: '.wa-card-path',
    def: '.wa-card-def',
    why: '.wa-card-why',
    num: '.wa-card-num',
  }, 'astro');

  transformHookCards($f, 'react');
  transformReactSteps($f, 'react');

  $f('.rt-card-bar, .wa-card-bar').remove();
  $f('.subtabs, .js-stab, .stab').remove();
  $f('.js-subpanel').each((_, el) => {
    const $el = $f(el);
    $el.replaceWith($el.contents());
  });

  $f('.js-section-hdr').each((_, el) => {
    const $h = $f(el);
    const desc = $h.find('.js-section-desc').text().trim();
    $h.replaceWith(
      desc ? $f('<p></p>').append($f('<em></em>').text(desc)) : '',
    );
  });

  wrapCardGrid($f, '.rt-grid');
  wrapCardGrid($f, '.wa-grid');
  wrapCardGrid($f, '.git-grid');

  normalizePreBlocks($f);
}

function extractObject(name) {
  const start = legacyJs.indexOf(`const ${name} = {`);
  if (start < 0) throw new Error(`Missing const ${name}`);
  let i = legacyJs.indexOf('{', start);
  let depth = 0;
  for (; i < legacyJs.length; i++) {
    if (legacyJs[i] === '{') depth++;
    else if (legacyJs[i] === '}') {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  // eslint-disable-next-line no-eval
  return eval(`(${legacyJs.slice(legacyJs.indexOf('{', start), i)})`);
}

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

function cleanHtml(fragment, variant = 'default') {
  const $f = cheerio.load(`<div id="root">${fragment}</div>`);
  $f('#root button').remove();
  $f('#root [onclick]').removeAttr('onclick');
  $f('#root style').remove();
  $f('#root .git-subtabs, .dep-stabs, .ds-subtabs, .subtabs, .js-sn-wrap, .diseno-sn-wrap, .sn-arr').remove();
  $f('#root [style]').each((_, el) => {
    $f(el).removeAttr('style');
  });
  transformStructure($f, variant);
  return $f('#root').html() || '';
}

function toMarkdown(fragment, variant = 'default') {
  return postProcessMarkdown(turndown.turndown(cleanHtml(fragment, variant)).trim());
}

function postProcessMarkdown(md) {
  const lines = md.split('\n');
  let inFence = false;
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();
    if (trimmed.startsWith('```')) {
      if (!inFence && trimmed === '```') {
        const next = lines[i + 1] || '';
        if (/^(git |npm |docker )/.test(next.trim())) {
          out.push('```bash');
          inFence = true;
          continue;
        }
      }
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }
    out.push(
      line
        .replace(/<script>/gi, '`<script>`')
        .replace(/<\/script>/gi, '`<\/script>`'),
    );
  }

  return out
    .join('\n')
    .replace(/```bash\n[ \t]+([^\n]+)\n[ \t]+```/g, '```bash\n$1\n```');
}

function yamlQuote(value) {
  return JSON.stringify(String(value));
}

function writeMd(outDir, slug, title, body, position) {
  const dir = path.join(docsDir, outDir);
  fs.mkdirSync(dir, {recursive: true});
  const fm = `---\ntitle: ${yamlQuote(title)}\nsidebar_position: ${position}\nvisibility: public\nformat: md\n---\n\n`;
  fs.writeFileSync(path.join(dir, `${slug}.md`), `${fm}${body}\n`);
}

function extractSections(panelSel, sectionSel, outDir, slugFn, titleFn, variant = 'default') {
  const panel = $(panelSel);
  if (!panel.length) return [];
  const slugs = [];
  panel.find(sectionSel).each((idx, el) => {
    const id = $(el).attr('id') || `section-${idx}`;
    const slug = slugFn(id);
    const title = titleFn($(el), id);
    const md = toMarkdown($(el).html() || '', variant);
    writeMd(outDir, slug, title, md, idx + 2);
    slugs.push({slug, title});
  });
  return slugs;
}

function writeIndex(outDir, title, desc, pages) {
  const links = pages
    .map((p) => `- [${p.title}](./${p.slug})`)
    .join('\n');
  writeMd(
    outDir,
    'index',
    title,
    `# ${title}\n\n${desc}\n\n## Contenido\n\n${links}`,
    1,
  );
}

// ── JSON data ──
fs.mkdirSync(dataDir, {recursive: true});

const jsonExports = {
  'frameworks.json': {
    cats: extractObject('CATS'),
    catOrder: extractArray('CAT_ORDER'),
    fws: extractArray('FWS'),
    criteria: extractArray('CRITERIA'),
    guideRules: extractArray('GUIDE_RULES'),
  },
  'vibetips.json': extractArray('VIBETIPS'),
  'hosting.json': extractArray('HOSTING'),
  'phases.json': extractArray('PHASES'),
  'cpanel-concepts.json': extractArray('CPANEL_CONCEPTS'),
  'cache-types.json': extractArray('CACHE_TYPES'),
  'cache-concepts.json': extractArray('CACHE_CONCEPTS'),
  'docker-concepts.json': extractArray('DOCKER_CONCEPTS'),
  'security-items.json': extractArray('SECURITY_ITEMS'),
  'integration-concepts.json': extractArray('INTEGRATION_CONCEPTS'),
  'dsg-terms.json': extractArray('DSG_TERMS'),
  'dsg-cats.json': extractArray('DSG_CATS'),
  'dst-tools.json': extractArray('DST_SEED_TOOLS'),
  'dst-cats.json': extractArray('DST_DEFAULT_CATS'),
  'dst-color-tips.json': extractArray('DST_COLOR_TIPS'),
  'docker-curso.json': {
    fundamentos: extractArray('DK_FUNDAMENTOS'),
    cheatsheet: extractArray('DK_CHEATSHEET'),
    dockerfile: extractArray('DK_DOCKERFILE'),
    imgCards: extractArray('DK_IMG_CARDS'),
    networks: extractArray('DK_NETWORKS'),
    volumes: extractArray('DK_VOLUMES'),
    netConcepts: extractArray('DK_NET_CONCEPTS'),
    composeAnatomy: extractArray('DK_COMPOSE_ANATOMY'),
    composeCards: extractArray('DK_COMPOSE_CARDS'),
    tools: extractArray('DK_TOOLS'),
    k8sConcepts: extractArray('DK_K8S_CONCEPTS'),
    k8sObjects: extractArray('DK_K8S_OBJECTS'),
    cases: extractArray('DK_CASES'),
  },
  'api-mysql.json': {
    types: extractArray('API_TYPES'),
    principles: extractArray('API_REST_PRINCIPLES'),
    httpMethods: extractArray('API_HTTP_METHODS'),
    dataLocations: extractArray('API_DATA_LOCATIONS'),
    httpCodes: extractArray('API_HTTP_CODES'),
    restCompare: extractArray('API_REST_COMPARE'),
    mysqlTables: extractArray('MYSQL_TABLES'),
    reservaEstados: extractArray('RESERVA_ESTADOS'),
  },
};

// glossary + dns (keep in sync with extract-legacy-data)
const glossary = extractArray('GLOSSARY');
for (const t of [
  {
    term: 'Frontmatter',
    cat: 'ecosistema',
    def: 'Bloque YAML al inicio de un archivo Markdown o MDX con metadatos del documento: título, fecha, tags o visibilidad. No es el cuerpo del texto; el generador del sitio (Docusaurus, Astro) lo lee al compilar.',
    example:
      '---\\ntitle: Glosario\\nvisibility: public\\n---\\n\\n# Contenido del doc…',
  },
  {
    term: 'Zod',
    cat: 'ecosistema',
    def: 'Librería npm para validar en runtime que un objeto cumple un esquema. En sitios estáticos suele usarse en build para comprobar frontmatter o JSON antes de publicar.',
    example:
      'const schema = z.object({ title: z.string() }); schema.parse(frontmatter);',
  },
]) {
  if (!glossary.some((g) => g.term === t.term)) glossary.push(t);
}
jsonExports['glossary.json'] = glossary;
jsonExports['dns-records.json'] = extractArray('DNS_RECORDS');
jsonExports['dns-concepts.json'] = extractArray('DNS_CONCEPTS');

for (const [file, data] of Object.entries(jsonExports)) {
  fs.writeFileSync(
    path.join(dataDir, file),
    JSON.stringify(data, null, 2),
  );
}

// ── HTML → Markdown panels ──

const gitPages = extractSections(
  '#panel-git',
  '.git-panel',
  'git-docs',
  (id) => id.replace(/^git-/, ''),
  (_, id) =>
    ({
      'git-fundamentos': 'Fundamentos',
      'git-guia-completa': 'Guía completa',
      'git-conventional': 'Conventional Commits',
      'git-flow': 'Flujo Git y Rebase',
    })[id] || id,
  'git',
);
writeIndex(
  'git-docs',
  'Git & Documentación',
  'Convenciones de commits, flujo add/commit/push/pull, rebase y buenas prácticas de documentación.',
  gitPages,
);

const astroPages = extractSections(
  '#panel-watan',
  '.wa-panel',
  'astro',
  (id) =>
    ({
      'wa-flujo': 'flujo',
      'wa-capas': 'capas',
      'wa-react': 'islands',
      'wa-script': 'script-vs-frontmatter',
    })[id] || id.replace(/^wa-/, ''),
  (_, id) =>
    ({
      'wa-flujo': 'Flujo completo',
      'wa-capas': 'Las 15 capas',
      'wa-react': 'React · Islands',
      'wa-script': 'Frontmatter vs script',
    })[id] || id,
  'astro',
);
writeIndex(
  'astro',
  'Astro (Watan)',
  'Flujo de build, capas de la arquitectura Watan, islands y frontmatter.',
  astroPages,
);

const reactPages = extractSections(
  '#panel-react',
  '.rt-panel',
  'react',
  (id) => id.replace(/^rt-/, ''),
  (_, id) =>
    ({
      'rt-fundamentos': 'Fundamentos',
      'rt-estado': 'Estado y eventos',
      'rt-estado-avanzado': 'Gestión del estado',
      'rt-hooks': 'Hooks y efectos',
      'rt-pensar': 'Pensar en React',
    })[id] || id,
  'react',
);
writeIndex(
  'react',
  'React',
  'Componentes, estado, hooks y mental model de React.',
  reactPages,
);

const jsPages = extractSections(
  '#panel-javascript',
  '.js-section',
  'javascript',
  (id) => id.replace(/^js-/, ''),
  (el) => el.find('.js-section-title').first().text().trim() || 'JavaScript',
  'js',
);
writeIndex(
  'javascript',
  'JavaScript',
  'Fundamentos, DOM, arrays, objetos, promesas y temporizadores.',
  jsPages,
);

// Diseño: métricas (each ds-panel) + accesibilidad (each a11y-panel)
const metricsSection = $('#diseno-ds-metrics');
const metricPages = [];
metricsSection.find('.ds-panel').each((idx, el) => {
  const id = $(el).attr('id') || `ds-${idx}`;
  const slug = id.replace(/^ds-/, '');
  const title =
    ({
      'ds-adopcion': 'Adopción y uso',
      'ds-eficiencia': 'Eficiencia',
      'ds-calidad': 'Calidad y consistencia',
      'ds-equipo': 'Equipo y cultura',
      'ds-negocio': 'Impacto de negocio',
      'ds-tamano': 'Por tamaño de equipo',
    })[id] || slug;
  const md = toMarkdown($(el).html() || '');
  writeMd('diseno/metricas', slug, title, md, idx + 1);
  metricPages.push({slug, title});
});
writeMd(
  'diseno',
  'metricas',
  'DS Métricas',
  `# Métricas de Design Systems\n\nLista exhaustiva de métricas por categoría.\n\n${metricPages.map((p) => `- [${p.title}](./metricas/${p.slug})`).join('\n')}`,
  2,
);

const a11ySection = $('#diseno-accesibilidad');
const a11yPages = [];
a11ySection.find('.a11y-tabpanel').each((idx, el) => {
  const id = $(el).attr('id') || `a11y-${idx}`;
  const slug = id.replace(/^a11y-/, '');
    const title =
      ({
        'a11y-principios': 'Principios POUR',
        'a11y-niveles': 'Niveles y conformidad',
        'a11y-wcag': 'WCAG 2.2 extendida',
        'a11y-aria': 'Patrones ARIA',
        'a11y-tools': 'Herramientas de testing',
        'ds-adopcion': 'Adopción y uso',
        'ds-eficiencia': 'Eficiencia',
        'ds-calidad': 'Calidad y consistencia',
        'ds-equipo': 'Equipo y cultura',
        'ds-negocio': 'Impacto de negocio',
        'ds-tamano': 'Por tamaño de equipo',
      })[id] ||
      $(el).find('.ds-note strong, .a11y-section-title').first().text().trim() ||
      slug.replace(/-/g, ' ');
  const md = toMarkdown($(el).html() || '');
  writeMd('diseno/accesibilidad', slug, title, md, idx + 1);
  a11yPages.push({slug, title});
});
writeMd(
  'diseno',
  'accesibilidad',
  'Accesibilidad',
  `# Accesibilidad\n\nPrincipios, WCAG, ARIA y herramientas.\n\n${a11yPages.map((p) => `- [${p.title}](./accesibilidad/${p.slug})`).join('\n')}`,
  5,
);

// API auth/middleware static panels
const apiAuthMd = toMarkdown($('#api-auth').html() || '', 'api');
writeMd('apis-mysql', 'auth', 'Bearer key y auth', apiAuthMd, 3);
const apiMwMd = toMarkdown($('#api-middleware').html() || '', 'api');
writeMd('apis-mysql', 'middleware', 'Middleware y Express', apiMwMd, 4);

// Frameworks index is MDX with CraftFrameworks component — do not overwrite

writeMd(
  'diseno',
  'index',
  'Diseño',
  `# Diseño\n\nDesign Systems, herramientas, color y accesibilidad.\n\n- [DS Métricas](/docs/diseno/metricas)\n- [DS Glosario](/docs/diseno/glosario-ds)\n- [DS Herramientas](/docs/diseno/herramientas)\n- [Gestión de color](/docs/diseno/color)\n- [Accesibilidad](/docs/diseno/accesibilidad)`,
  1,
);

console.log('Migration complete.');
console.log('JSON files:', Object.keys(jsonExports).length);
console.log('Git pages:', gitPages.length);
console.log('Astro pages:', astroPages.length);
console.log('React pages:', reactPages.length);
console.log('JS pages:', jsPages.length);
console.log('DS metric pages:', metricPages.length);
console.log('A11y pages:', a11yPages.length);

const mdFiles = [];
function walkMd(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMd(full);
    else if (entry.name.endsWith('.md')) mdFiles.push(full);
  }
}
walkMd(docsDir);
const fenceCount = mdFiles.reduce((n, file) => {
  const body = fs.readFileSync(file, 'utf8').split('---').slice(2).join('---');
  return n + (body.match(/^```/gm) || []).length;
}, 0);
console.log('Markdown files:', mdFiles.length);
console.log('Fenced code blocks:', fenceCount);
