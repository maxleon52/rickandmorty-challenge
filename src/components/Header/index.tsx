import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from 'antd';

import banner from '../../assets/images/banner.png';
import styles from './header.module.scss';

function Header() {
  const url = useLocation();
  const rota = url.pathname;

  return (
    <div className={styles.container}>
      <img src={banner} alt="banner" height="100px" />
      <div className={styles.buttons}>
        <Link to="/">
          <Button type={rota === '/' ? 'primary' : 'ghost'}>
            Criar epísodios
          </Button>
        </Link>
        <Link to="/my-episodes">
          <Button type={rota === '/my-episodes' ? 'primary' : 'ghost'}>
            Meus epísodios
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
