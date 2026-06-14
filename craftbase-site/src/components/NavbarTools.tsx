import React from 'react';
import SearchBar from '@theme/SearchBar';
import TextSizeToggle from '@site/src/components/TextSizeToggle';
import styles from './NavbarTools.module.css';

export default function NavbarTools(): React.ReactElement {
  return (
    <div className={`${styles.tools} craftbase-navbar-tools`}>
      <SearchBar />
      <TextSizeToggle />
    </div>
  );
}
