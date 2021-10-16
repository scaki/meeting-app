import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const SCInput = ({ label, name, rules, type }) => (
  <Form.Item label={label} name={name} rules={rules}>
    <Input type={type} />
  </Form.Item>
);

SCInput.defaultProps = {
  label: null,
  rules: [],
  type: 'text',
};

SCInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array,
  type: PropTypes.string,
};
export default SCInput;
