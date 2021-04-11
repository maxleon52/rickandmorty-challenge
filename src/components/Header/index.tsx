import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from 'antd';

import banner from '../../assets/images/banner.png';
import styles from './header.module.scss';

function Header() {
  const [page, setPage] = useState('home');

  return (
    <div className={styles.container}>
      <img src={banner} alt="banner" height="100px" />
      <div className={styles.buttons}>
        <Link to="/">
          <Button
            type={page === 'home' ? 'primary' : 'ghost'}
            onClick={() => setPage('home')}
          >
            Criar epísodios
          </Button>
        </Link>
        <Link to="/my-episodes">
          <Button
            type={page === 'myEpisodes' ? 'primary' : 'ghost'}
            onClick={() => setPage('myEpisodes')}
          >
            Meus epísodios
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
