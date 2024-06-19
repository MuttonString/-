import React, { useRef, useEffect, useState } from 'react';
import { LockOutlined, PhoneOutlined, KeyOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal, Col, Row } from 'antd';
// import axios from 'axios';

import request from '../../../utils/request'

interface LoginFormValues {
  phone: string;
  password: string;
  remember: boolean;
}
interface LoginContentProps {
  changeState: (stateValue: number) => void;
}

const LoginContent: React.FC<LoginContentProps> = ({ changeState }) => {
  useEffect(() => {
    setTimeout(() => {
      if (animation.current !== null) {
        animation.current.style.opacity = '1';
      }
    });
  }, [])

  const animation = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function changeStateToRegister() {
    changeState(0);
    if (animation.current !== null) {
      animation.current.style.opacity = "0";
    }
  }

  const onFinish = (values: LoginFormValues) => {
    login(values)
  };

  const validatePhone = (_rule: object, value: string) => {

    const isNumeric = /^\d+$/.test(value);
    if (value !== undefined) {

      if (!isNumeric && value.length !== 0) {
        return Promise.reject(new Error('请正确输入手机号，只能包含数字!'));
      }

      if (value.charAt(0) !== "1" && value.length !== 0) {
        return Promise.reject(new Error('请输入以1开头的手机号!'))
      }

      if (value.length !== 11 && value.length !== 0) {
        return Promise.reject(new Error('手机号必须是11位!'));
      }
    }

    return Promise.resolve();
  };

  async function login(values: LoginFormValues) {

    interface ApiResponse {
      code: number;
      msg: string;
      data: {
        refreshToken: string;
        token: string;
      };
    }

    await request.post<ApiResponse, ApiResponse>(values.remember ? '/user/autoLogin' : '/user/login', {
      password: values.password,
      phone: values.phone
    }).then((res) => {
      console.log(res);
      if (res.code === 200) {
        localStorage.setItem('token', res.data.token);
        if (res.data.refreshToken) {
          localStorage.setItem('refreshToken', res.data.refreshToken);
        }
      }
    })
  }

  return (
    <div ref={animation}
      style={{
        opacity: '0',
        transition: 'opacity 1s ease-in-out'
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: '请输入手机号!' },
            { validator: validatePhone }
          ]}
        >
          <Input
            autoFocus
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="手机号"
            autoComplete="current-password" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
            autoComplete="current-password"
          />
        </Form.Item>
        <Form.Item>
          <div style={{ marginTop: '5%', display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="" onClick={showModal}>
              忘记密码
            </a>
            <Modal title="忘记密码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <Form
                name="forgetPassword"
                className="login-form"
                onFinish={onFinish}
              >
                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: '请输入您的手机号!' },
                    { validator: validatePhone }
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined className="site-form-item-icon" />}
                    placeholder="手机号" />
                </Form.Item>

                <Form.Item>
                  <Row gutter={20}>
                    <Col span={18}>
                      <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="请输入验证码" />
                    </Col>
                    <Col span={6}>
                      <Button type="primary">
                        发送验证码
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入您的密码!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    autoComplete="current-password"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="密码"
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请确认您的密码!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('您输入的新密码不匹配!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    autoComplete="current-password"
                    prefix={<KeyOutlined className="site-form-item-icon" />}
                    placeholder="确认密码"
                  />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Form.Item>

        <Form.Item>
          <div style={{
            marginTop: "5%",
            padding: "0 5% 0",
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Button size='large' type="primary" htmlType="submit">
              登录
            </Button>

            <Button size='large' type="primary" onClick={changeStateToRegister}>
              加入
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginContent;