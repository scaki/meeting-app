import React from 'react';
import { Col, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import SCButton from '../../../components/Button';
import SCForm, { SCInput } from '../../../components/Form';
import { signIn } from '../../../actions/auth';
import Layout from '../../Layout';
import styles from './login.module.scss';

const Login = () => {
  const dispatch = useDispatch();

  const onSubmit = values => {
    dispatch(
      signIn(values, res => {
        localStorage.setItem('token', res.token);
        dispatch(push('/'));
      })
    );
  };

  const initialValues = {
    email: 'dwight.jensen@example.com',
    password: 'elvis1',
  };

  return (
    <Layout>
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <SCForm
            name="login"
            onSubmit={onSubmit}
            initialValues={initialValues}
          >
            <Row>
              <Col span={24}>
                <SCInput
                  label="Email Address"
                  name="email"
                  type="email"
                  rules={[
                    {
                      required: true,
                      type: 'email',
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <SCInput
                  label="Password"
                  name="password"
                  type="password"
                  rules={[
                    {
                      required: true,
                      min: 6,
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row justify="end">
              <Col xs={12} sm={12} md={12} lg={8} xxl={6}>
                <SCButton type="submit" block color="orange">
                  Login
                </SCButton>
              </Col>
            </Row>
          </SCForm>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
