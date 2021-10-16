import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import styles from './layout.module.scss';

const Layout = props => {
  const { children } = props;
  return (
    <div className={styles.layout}>
      <div className={styles.headerWrapper}>
        <Header />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
