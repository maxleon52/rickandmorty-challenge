import React from 'react';
import Routes from '../../routes';
import Header from '../Header';

import styles from './layout.module.scss';

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <Routes />
      </main>
    </div>
  );
}

export default Layout;
