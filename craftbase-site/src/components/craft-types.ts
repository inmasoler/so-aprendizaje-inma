export type GlossaryItem = {
  term: string;
  cat: string;
  def: string;
  example: string;
};

export type GlossaryCategoryId =
  | 'all'
  | 'rendering'
  | 'arquitectura'
  | 'datos'
  | 'deploy'
  | 'ds'
  | 'ecosistema';

export const GLOSSARY_CATEGORIES: {
  id: GlossaryCategoryId;
  label: string;
}[] = [
  {id: 'all', label: 'Todos'},
  {id: 'rendering', label: 'Renderizado'},
  {id: 'arquitectura', label: 'Arquitectura'},
  {id: 'datos', label: 'Datos y estado'},
  {id: 'deploy', label: 'Deploy'},
  {id: 'ds', label: 'Design Systems'},
  {id: 'ecosistema', label: 'Ecosistema dev'},
];

export type GlossaryCategorySlug = Exclude<GlossaryCategoryId, 'all'>;

export type DnsRecord = {
  type: string;
  full: string;
  desc: string;
  example: string;
  warn: string;
};

export type DnsConcept = {
  name: string;
  type: string;
  color: string;
  def: string;
  example: string;
  warn: string;
};
