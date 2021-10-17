import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Badge, Col, Collapse, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
  loadMeeting,
  loadMeetingsByDate,
  putMeeting,
} from '../../actions/meeting';
import { showModal } from '../../actions/modal';
import SCButton from '../../components/Button';
import { capitalize } from '../../utils/convertCase';
import AddMeeting from '../AddMeeting';
import DetailItem from './detailItem';

const { Panel } = Collapse;
const DateDetail = ({ date }) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  const getMeetings = () => {
    dispatch(
      loadMeetingsByDate(date, res =>
        setItems(res.sort((a, b) => new Date(a.date) - new Date(b.date)))
      )
    );
  };

  useEffect(() => {
    getMeetings();
  }, []);

  const addMeeting = () => {
    dispatch(
      showModal({
        title: 'Add Meeting',
        component: <AddMeeting />,
        data: { onSubmit: getMeetings },
      })
    );
  };

  const editMeetingOnSubmit = res => {
    const meetings = items;
    const meetingIndex = meetings.findIndex(x => x.id === res.id);
    meetings[meetingIndex] = res;
    setItems(meetings.sort((a, b) => new Date(a.date) - new Date(b.date)));
    dispatch(putMeeting(res));
  };

  const editMeeting = id => {
    dispatch(
      loadMeeting(id, res =>
        dispatch(
          showModal({
            title: 'Edit Meeting',
            component: <AddMeeting />,
            data: { onSubmit: editMeetingOnSubmit, values: res, isEdit: true },
          })
        )
      )
    );
  };

  const getTime = meetingDate => moment(meetingDate).format('HH:mm');
  const getBadgeColor = item => {
    if (item.status === 'CANCEL') {
      return '#f50';
    }
    if (item.type === 'INHOUSE') {
      return '#87d068';
    }
    if (item.type === 'ONLINE') {
      return '#2db7f5';
    }
  };
  const getPanelHeader = item => {
    const time = getTime(item.date);
    return (
      <>
        <Badge color={getBadgeColor(item)} text={`${time} - ${item.title}`} />
      </>
    );
  };
  return (
    <>
      <Row>
        <Col span={24}>
          <Collapse accordion ghost>
            {items.map(item => (
              <Panel header={getPanelHeader(item)} key={item.id}>
                <DetailItem
                  label="Date"
                  content={moment(item.date).format('YYYY-MM-DD HH:mm')}
                />
                <DetailItem label="Description" content={item.description} />
                <DetailItem label="Status" content={capitalize(item.status)} />
                <DetailItem label="Type" content={capitalize(item.type)} />
                <SCButton
                  type="button"
                  onClick={() => editMeeting(item.id)}
                  variant="default"
                  icon={<EditOutlined />}
                >
                  Edit
                </SCButton>
              </Panel>
            ))}
          </Collapse>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={8} xs={24}>
          <SCButton
            type="button"
            onClick={addMeeting}
            block
            color="orange"
            style={{ marginTop: 20, fontWeight: 700 }}
          >
            Add Meeting
          </SCButton>
        </Col>
      </Row>
    </>
  );
};

DateDetail.defaultProps = {
  date: null,
};

DateDetail.propTypes = {
  date: PropTypes.any,
};

export default DateDetail;
