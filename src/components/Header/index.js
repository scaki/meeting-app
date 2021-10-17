import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import styles from './header.module.scss';
import SCButton from '../Button';
import AddMeeting from '../../containers/AddMeeting';
import { showModal } from '../../actions/modal';

const Header = () => {
  const dispatch = useDispatch();

  const onClickAddMeeting = () => {
    dispatch(
      showModal({ title: 'Add Meeting', component: <AddMeeting />, data: {} })
    );
  };

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
      </div>
    </header>
  );
};

export default Header;
