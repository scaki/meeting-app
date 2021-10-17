import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import SCInput from './Input';
import SCDate from './Date';
import SCTextarea from './Textarea';
import SCSelect from './select';
import styles from './form.module.scss';

const SCForm = ({ name, onSubmit, initialValues, children }) => (
  <Form
    name={name}
    onFinish={onSubmit}
    initialValues={initialValues}
    autoComplete="off"
    layout="vertical"
    className={styles.scForm}
  >
    {children}
  </Form>
);

SCForm.defaultProps = {
  initialValues: {},
  children: null,
};

SCForm.propTypes = {
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  children: PropTypes.node,
};

export { SCInput, SCDate, SCTextarea, SCSelect };
export default SCForm;
