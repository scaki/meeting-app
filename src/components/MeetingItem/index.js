/* eslint-disable no-lone-blocks */
import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import moment from 'moment';
import styles from './meetingItem.module.scss';

const SCMeetingItem = ({ item }) => {
  const getTagColor = () => {
    if (item.status === 'CANCEL') {
      return '#f50';
    }
    if (item.type === 'INHOUSE') {
      return '#87d068';
    }
    if (item.type === 'ONLINE') {
      return '#2db7f5';
    }
  };

  return (
    <div className={styles.meetingItem}>
      <Tag color={getTagColor()}>
        <div
          style={
            item.status === 'CANCEL'
              ? { textDecorationLine: 'line-through' }
              : null
          }
        >
          {`${moment(item.date).format('HH:mm')} - ${item.title}`}
        </div>
      </Tag>
    </div>
  );
};

SCMeetingItem.defaultProps = {};

SCMeetingItem.propTypes = {
  item: PropTypes.object.isRequired,
};
export default SCMeetingItem;
{
  /* <div
      role="button"
      tabIndex={0}
      className={styles.meetingItem}
      style={item.status === 'CANCEL' ? { color: 'red' } : null}
    >
      <div className={styles.status}>
        <Badge color={getBadgeColor(item.status)} />
      </div>
      <div className={styles.time}>{moment(item.date).format('HH:mm')}</div>
      <div className={styles.title}>{item.title}</div>
    </div> */
}
