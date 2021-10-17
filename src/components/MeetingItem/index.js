import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import moment from 'moment';
import styles from './meetingItem.module.scss';

const SCMenuItem = ({ item, onClick }) => {
  const getBadgeColor = status => {
    if (status === 'ACTIVE') {
      return 'green';
    }
    if (status === 'CANCEL') {
      return 'red';
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={styles.meetingItem}
      style={item.status === 'CANCEL' ? { color: 'red' } : null}
      onClick={() => onClick(item.id)}
    >
      <div className={styles.status}>
        <Badge color={getBadgeColor(item.status)} />
      </div>
      <div className={styles.time}>{moment(item.date).format('HH:mm')}</div>
      <div className={styles.title}>{item.title}</div>
    </div>
  );
};

SCMenuItem.defaultProps = {
  onClick: () => {},
};

SCMenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
export default SCMenuItem;
