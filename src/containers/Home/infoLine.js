import React from 'react';
import styles from './home.module.scss';

const InfoLine = () => (
  <div className={styles.infoLine}>
    <div className={styles.lineItem}>
      <div className={`${styles.itemType} ${styles.canceled}`} />
      <div className={styles.text}>Canceled</div>
    </div>
    <div className={styles.lineItem}>
      <div className={`${styles.itemType} ${styles.inhouse}`} />
      <div className={styles.text}>In House</div>
    </div>
    <div className={styles.lineItem}>
      <div className={`${styles.itemType} ${styles.online}`} />
      <div className={styles.text}>Online</div>
    </div>
  </div>
);

export default InfoLine;
