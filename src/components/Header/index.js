import React, { useEffect } from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { DownOutlined, PoweroffOutlined } from '@ant-design/icons';
import styles from './header.module.scss';
import SCButton from '../Button';
import AddMeeting from '../../containers/AddMeeting';
import { showModal } from '../../actions/modal';
import { loadMe } from '../../actions/user';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user).toJS();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      dispatch(loadMe());
    }
  }, []);

  const onClickAddMeeting = () => {
    dispatch(
      showModal({ title: 'Add Meeting', component: <AddMeeting />, data: {} })
    );
  };
  const logOut = () => {
    localStorage.removeItem('token');
    dispatch(push('/'));
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<PoweroffOutlined />} onClick={logOut}>
        Logout
      </Menu.Item>
    </Menu>
  );
  const avatar = `${user.name.first[0]}${user.name.last[0]}`;
  const userName = `${user.name.first} ${user.name.last}`;
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div
          role="button"
          tabIndex={0}
          className={styles.brand}
          onClick={() => dispatch(push('/'))}
        >
          Meeting App
        </div>
      </div>

      <div className={styles.right}>
        <SCButton
          type="button"
          onClick={onClickAddMeeting}
          color="white"
          style={{ fontWeight: 700 }}
        >
          Add Meeting
        </SCButton>
        <Dropdown overlay={userMenu} trigger="click">
          <Button type="text" style={{ color: '#FFFFFF', fontWeight: 700 }}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                <Avatar
                  size="small"
                  style={{
                    lineHeight: '25px',
                    textAlign: 'center',
                    background: '#37474F',
                    color: '#FFF',
                  }}
                >
                  {avatar}
                </Avatar>
              </div>
              <div className={styles.userName}>{userName}</div>
              <div className={styles.arrow}>
                <DownOutlined />
              </div>
            </div>
          </Button>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
