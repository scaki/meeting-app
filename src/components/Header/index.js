import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import styles from './header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div
          role="button"
          tabIndex={0}
          className={styles.brand}
          onClick={() => dispatch(push('/'))}
        >
          Meeting App
        </div>
      </div>

      <div className={styles.right} />
    </header>
  );
};

export default Header;
