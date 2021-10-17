import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from 'antd';
import { hideDrawer } from '../../actions/drawer';

const SCDrawer = () => {
  const drawer = useSelector(state => state.drawer).toJS();
  const dispatch = useDispatch();
  const closeDrawer = () => {
    dispatch(hideDrawer());
  };
  return (
    <Drawer
      title={drawer.title}
      visible={drawer.visible}
      onClose={closeDrawer}
      destroyOnClose
      placement="right"
      width={450}
    >
      {React.cloneElement(drawer.component, { data: drawer.data })}
    </Drawer>
  );
};
export default SCDrawer;
