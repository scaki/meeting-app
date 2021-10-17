import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Form } from 'antd';
import styles from './date.module.scss';

const SCDate = ({ label, name, rules }) => (
  <Form.Item label={label} name={name} rules={rules}>
    <DatePicker
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      className={styles.scDate}
    />
  </Form.Item>
);

SCDate.defaultProps = {
  label: null,
  rules: [],
};

SCDate.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array,
};
export default SCDate;
