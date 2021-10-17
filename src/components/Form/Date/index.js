import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Form } from 'antd';
import styles from './date.module.scss';

const SCDate = ({ label, name, rules, minuteStep, showNow }) => (
  <Form.Item label={label} name={name} rules={rules}>
    <DatePicker
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      className={styles.scDate}
      showNow={showNow}
      minuteStep={minuteStep}
      secondStep={60}
    />
  </Form.Item>
);

SCDate.defaultProps = {
  label: null,
  rules: [],
  minuteStep: 1,
  showNow: true,
};

SCDate.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array,
  minuteStep: PropTypes.number,
  showNow: PropTypes.bool,
};
export default SCDate;
