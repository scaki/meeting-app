import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

const { Option } = Select;
const SCSelect = ({ label, name, rules, options }) => (
  <Form.Item label={label} name={name} rules={rules}>
    <Select>
      {options.map(option => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  </Form.Item>
);

SCSelect.defaultProps = {
  label: null,
  rules: [],
  options: [],
};

SCSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array,
  options: PropTypes.array,
};
export default SCSelect;
