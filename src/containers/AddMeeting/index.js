import React from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import SCForm, { SCDate, SCInput, SCTextarea } from '../../components/Form';
import SCButton from '../../components/Button';
import { postMeeting } from '../../actions/meeting';
import { hideModal } from '../../actions/modal';

const AddMeeting = () => {
  const dispatch = useDispatch();
  const onSubmit = values => {
    dispatch(
      postMeeting(values, () => {
        dispatch(hideModal());
      })
    );
  };

  return (
    <SCForm name="AddMeeting" onSubmit={onSubmit}>
      <Row>
        <Col span={24}>
          <SCInput name="title" label="Title" rules={[{ required: true }]} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <SCDate
            name="date"
            label="Date"
            rules={[{ type: 'object', required: true }]}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <SCTextarea name="description" label="Description" />
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <SCButton type="submit">Save</SCButton>
        </Col>
      </Row>
    </SCForm>
  );
};

export default AddMeeting;
