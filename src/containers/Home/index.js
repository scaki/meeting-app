import React, { useEffect } from 'react';
import { Calendar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Layout from '../Layout';
import styles from './home.module.scss';
import { loadMeetings } from '../../actions/meeting';
import SCMeetingItem from '../../components/MeetingItem';
import { showDrawer } from '../../actions/drawer';
import DateDetail from '../DateDetail';
import InfoLine from './infoLine';

const Home = () => {
  const dispatch = useDispatch();
  const meeting = useSelector(state => state.meeting).toJS();

  useEffect(() => {
    dispatch(loadMeetings());
  }, []);

  const dateCellRender = value => {
    const listData = meeting.filter(
      item =>
        moment(item.date).format('DD-MM-YYYY') === value.format('DD-MM-YYYY')
    );
    return (
      <>
        {listData.map(item => (
          <SCMeetingItem key={item.id} item={item} />
        ))}
      </>
    );
  };

  const selectDate = value => {
    dispatch(
      showDrawer({
        title: 'Details',
        component: <DateDetail date={value.format('DD-MM-YYYY')} />,
      })
    );
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Calendar dateCellRender={dateCellRender} onSelect={selectDate} />
        <InfoLine />
      </div>
    </Layout>
  );
};

export default Home;
