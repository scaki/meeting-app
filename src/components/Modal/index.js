import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { hideModal } from '../../actions/modal';

const SCModal = () => {
  const modal = useSelector(state => state.modal).toJS();
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(hideModal());
  };
  return (
    <Modal
      title={modal.title}
      visible={modal.visible}
      footer={null}
      onCancel={closeModal}
      destroyOnClose
      maskClosable={false}
    >
      {React.cloneElement(modal.component, { data: modal.data })}
    </Modal>
  );
};
export default SCModal;
