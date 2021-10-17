import React, { useEffect } from 'react';
import { Calendar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Layout from '../Layout';
import styles from './Home.module.scss';
import { loadMeeting } from '../../actions/meeting';
import SCMenuItem from '../../components/MeetingItem';

const Home = () => {
  const dispatch = useDispatch();
  const meeting = useSelector(state => state.meeting).toJS();

  useEffect(() => {
    dispatch(loadMeeting());
  }, []);

  const onClickItem = id => {
    console.log(id);
  };

  const dateCellRender = value => {
    const listData = meeting.filter(
      item =>
        moment(item.date).format('DD-MM-YYYY') === value.format('DD-MM-YYYY')
    );
    return (
      <>
        {listData.map(item => (
          <SCMenuItem key={item.id} item={item} onClick={onClickItem} />
        ))}
      </>
    );
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Calendar dateCellRender={dateCellRender} />
      </div>
    </Layout>
  );
};

export default Home;
