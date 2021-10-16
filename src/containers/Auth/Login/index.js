import { Col, Row } from 'antd';
import React from 'react';
import SCButton from '../../../components/Button';
import SCForm, { SCInput } from '../../../components/Form';
import Layout from '../../Layout';
import styles from './login.module.scss';

const Login = () => (
  <Layout>
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <SCForm name="login" onSubmit={console.log}>
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
                    min: 8,
                  },
                ]}
              />
            </Col>
          </Row>
          <Row justify="end">
            <Col span={5}>
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

export default Login;
