import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Col, Row } from 'antd';
import SCForm, {
  SCDate,
  SCInput,
  SCSelect,
  SCTextarea,
} from '../../components/Form';
import SCButton from '../../components/Button';
import { editMeeting, postMeeting } from '../../actions/meeting';
import { hideModal } from '../../actions/modal';

const AddMeeting = ({ data }) => {
  const dispatch = useDispatch();
  const onSubmit = values => {
    if (data.isEdit) {
      dispatch(
        editMeeting({ ...values, id: data.values.id }, res => {
          if (data.onSubmit) {
            data.onSubmit(res);
          }
          dispatch(hideModal());
        })
      );
    } else {
      dispatch(
        postMeeting(values, res => {
          if (data.onSubmit) {
            data.onSubmit(res);
          }
          dispatch(hideModal());
        })
      );
    }
  };

  const getInitials = data.isEdit
    ? { ...data.values, date: moment(data.values.date) }
    : {};

  return (
    <SCForm name="AddMeeting" onSubmit={onSubmit} initialValues={getInitials}>
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
            minuteStep={15}
            showNow={false}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <SCTextarea name="description" label="Description" />
        </Col>
      </Row>
      {data.isEdit ? (
        <Row>
          <Col span={24}>
            <SCSelect
              name="status"
              label="Status"
              options={[
                { value: 'ACTIVE', label: 'Active' },
                { value: 'CANCEL', label: 'Cancel' },
              ]}
              rules={[{ required: true }]}
            />
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col span={24}>
          <SCSelect
            name="type"
            label="Type"
            options={[
              { value: 'INHOUSE', label: 'In House' },
              { value: 'ONLINE', label: 'Online' },
            ]}
            rules={[{ required: true }]}
          />
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <SCButton type="submit" color="orange">
            {data.isEdit ? 'Update' : 'Save'}
          </SCButton>
        </Col>
      </Row>
    </SCForm>
  );
};

AddMeeting.defaultProps = {
  data: {
    onSubmit: () => {},
    isEdit: false,
    values: {},
  },
};

AddMeeting.propTypes = {
  data: PropTypes.object,
};

export default AddMeeting;
