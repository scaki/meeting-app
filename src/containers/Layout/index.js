import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import styles from './layout.module.scss';
import SCModal from '../../components/Modal';
import SCDrawer from '../../components/Drawer';

const Layout = props => {
  const { children } = props;
  return (
    <div className={styles.layout}>
      <div className={styles.headerWrapper}>
        <Header />
      </div>
      <div className={styles.content}>
        {children}
        <SCModal />
        <SCDrawer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
