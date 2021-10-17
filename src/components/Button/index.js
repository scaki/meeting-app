import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './button.module.scss';

const SCButton = props => {
  const {
    variant,
    type,
    onClick,
    children,
    loading,
    disabled,
    block,
    color,
    style,
  } = props;

  const getStyle = () => {
    if (color === 'orange') {
      return styles.orange;
    }
    if (color === 'white') {
      return styles.white;
    }
    return null;
  };

  return (
    <Button
      type={variant}
      htmlType={type}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      block={block}
      className={getStyle()}
      style={style}
    >
      {children}
    </Button>
  );
};

SCButton.defaultProps = {
  type: 'button',
  onClick: () => {},
  children: null,
  variant: 'primary',
  loading: false,
  disabled: false,
  block: false,
  color: 'orange',
  style: {},
};

SCButton.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  onClick: PropTypes.func,
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'primary',
    'default',
    'dashed',
    'link',
    'text',
    'ghost',
  ]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  color: PropTypes.oneOf(['orange', 'white']),
  style: PropTypes.object,
};
export default SCButton;
