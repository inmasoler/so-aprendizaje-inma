import React from 'react';
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import NavbarTools from '@site/src/components/NavbarTools';
import type {Props as NavbarItemConfig} from '@theme/NavbarItem';

function NavbarToolsItem({className}: NavbarItemConfig & {className?: string}) {
  return (
    <div className={className}>
      <NavbarTools />
    </div>
  );
}

export default {
  ...ComponentTypes,
  'custom-navbarTools': NavbarToolsItem,
};
