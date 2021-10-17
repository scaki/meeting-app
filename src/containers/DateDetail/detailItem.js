import React from 'react';
import PropTypes from 'prop-types';
import styles from './dateDetail.module.scss';

const DetailItem = ({ label, content }) => (
  <div className={styles.detailItem}>
    <div className={styles.label}>{label}</div>
    <div className={styles.content}>
      {content !== null && content !== '' ? content : '-'}
    </div>
  </div>
);

DetailItem.defaultProps = {
  content: null,
};

DetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export default DetailItem;
