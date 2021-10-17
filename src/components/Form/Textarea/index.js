import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
// import styles from './date.module.scss';

const SCTextarea = ({ label, name, rules, cols, rows }) => (
  <Form.Item label={label} name={name} rules={rules}>
    <Input.TextArea cols={cols} rows={rows} />
  </Form.Item>
);

SCTextarea.defaultProps = {
  label: null,
  rules: [],
  cols: 0,
  rows: 5,
};

SCTextarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array,
  cols: PropTypes.number,
  rows: PropTypes.number,
};
export default SCTextarea;
