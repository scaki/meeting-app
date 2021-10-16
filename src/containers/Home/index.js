import React from 'react';
import Layout from '../Layout';
import styles from './Home.module.scss';

const Home = () => (
  <Layout>
    <div className={styles.container}>
      <span className={styles.message}>This is homepage</span>
    </div>
  </Layout>
);

export default Home;
