export type CraftTocItem = {
  value: string;
  id: string;
  level: number;
  children?: CraftTocItem[];
};

/** Si un h3 solo tiene un h4 hijo, mostrar solo el h3 en el índice lateral. */
function collapseSingleChild(items: CraftTocItem[]): CraftTocItem[] {
  return items.map((item) => {
    const children = item.children
      ? collapseSingleChild(item.children)
      : undefined;

    if (
      children?.length === 1 &&
      item.level === 3 &&
      children[0].level === 4
    ) {
      return {...item, children: undefined};
    }

    return children ? {...item, children} : item;
  });
}

export function collapseCraftToc(toc: CraftTocItem[]): CraftTocItem[] {
  return collapseSingleChild(toc);
}
