import React, { useRef, useEffect, useState } from 'react';
import { LockOutlined, PhoneOutlined, KeyOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal, Col, Row, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import request from '../../../utils/request'

interface LoginFormValues {
  phone: string;
  password: string;
  remember: boolean;
}

interface LoginContentProps {
  changeState: (stateValue: number) => void;
}

interface ApiResponse {
  code: number;
  msg: string;
  data: string;
}

interface ForgetPwdFormValues {
  phone: string;
  password: string;
  verificationCodeForgetPassword: string;
}

interface ApiType {
  code: number;
  msg: string;
  data: string;
}

const LoginContent: React.FC<LoginContentProps> = ({ changeState }) => {
  useEffect(() => {
    setTimeout(() => {
      if (animation.current !== null) {
        animation.current.style.opacity = '1';
      }
    });
  }, [])

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const { Paragraph } = Typography;

  const animation = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const [phone, setPhone] = useState('');

  const [messageApi, contextHolder] = message.useMessage();

  const [messageApiResetPassword, contextHolderResetPassword] = message.useMessage();

  const showModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
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

  async function onResetPassword(values: ForgetPwdFormValues) {

    console.log(values);

    await request.put<ApiType, ApiType>('/user/forgetPwd', {
      code: values.verificationCodeForgetPassword,
      phone: values.phone,
      password: values.password
    }).then((res) => {
      console.log(res);
      if (res.code === 200) {
        setIsModalOpen(false);
        form.resetFields();
        messageApiResetPassword.success(`密码重置${res.msg}`);
      }
      if (res.code === 220) {
        messageApiResetPassword.warning(res.msg);
      }
    })
  }

  const validatePhone = (_rule: object, value: string) => {

    const isNumeric = /^\d+$/.test(value);
    if (value !== undefined) {

      if (!isNumeric && value.length !== 0) {
        setIsPhoneValid(false);
        return Promise.reject(new Error('请正确输入手机号，只能包含数字!'));
      }

      if (value.charAt(0) !== "1" && value.length !== 0) {
        setIsPhoneValid(false);
        return Promise.reject(new Error('请输入以1开头的手机号!'))
      }

      if (value.length !== 11 && value.length !== 0) {
        setIsPhoneValid(false);
        return Promise.reject(new Error('手机号必须是11位!'));
      }
    }

    setPhone(value)
    setIsPhoneValid(true);
    return Promise.resolve();
  };

  let msg = ''


  const info = () => {
    messageApi.info(`登录${msg}`);
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
      msg = res.msg;
      if (res.code === 200) {
        localStorage.setItem('token', res.data.token);
        navigate("/admin/list")
        if (res.data.refreshToken) {
          localStorage.setItem('refreshToken', res.data.refreshToken);
          navigate("/admin/list")
        }
      }
      info();
    })
  }

  async function SendVerificationCode() {
    if (isPhoneValid) {
      //发送验证码

      await request.get<ApiResponse, ApiResponse>(`/user/code/${phone}/${2}`).then(res => {
        console.log(res);

        const success = (data: string | null = localStorage.getItem('verificationCodeForgetPassword')) => {
          messageApi.open({
            type: 'success',
            content:
              <div style={{
                display: 'flex',
                alignContent: 'center',
                height: '24px'
              }}>
                <span style={{ fontSize: '20' }}>
                  您的验证码为:
                </span>
                &nbsp;
                <span style={{ fontSize: '20px', fontWeight: '700' }}>
                  <Paragraph copyable>{data}</Paragraph>
                </span>
              </div>,
            duration: 5,
          });
        };

        const info = () => {
          messageApi.open({
            type: 'warning',
            content:
              <div>
                验证码五分钟内有效，请查看
                <a onClick={() => success()}>短信</a>
              </div>,
            duration: 5,
          });
        };

        const warning = () => {
          messageApi.info("请重新发送验证码")
        }

        if (res.code === 200) {
          success(res.data);
          localStorage.setItem("verificationCodeForgetPassword", res.data)
        } else if (res.code === 222) {
          if (localStorage.getItem('verificationCodeForgetPassword') === null) {
            warning()
          } else {
            info();
          }
        } else {
          const error = () => {
            messageApi.open({
              type: 'error',
              content: res.msg,
              duration: 5,
            });
          }
          error();
        }
      })

    } else {
      console.log("请输入正确的手机号");
    }
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
              <Checkbox>自动登录</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="" onClick={showModal}>
              忘记密码
            </a>
            {contextHolderResetPassword}
            <Modal
              title="忘记密码"
              open={isModalOpen}
              footer={null}
              onCancel={handleCancel}
            >
              <Form
                name="forgetPassword"
                className="login-form"
                onFinish={onResetPassword}
                form={form}
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

                <Form.Item
                  name="verificationCodeForgetPassword"
                  rules={[
                    { required: true, message: '请输入你的验证码!' },
                  ]}
                >
                  <Row gutter={20}>
                    <Col span={18}>
                      <Input
                        autoComplete="off"
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="请输入验证码" />
                    </Col>
                    <Col span={6}>
                      {contextHolder}
                      <Button type="primary" onClick={SendVerificationCode}>
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

                <Form.Item>
                  <div key="submit" style={{ display: 'flex', justifyContent: 'center' }}>
                    {contextHolderResetPassword}
                    <Button size='large' type="primary" htmlType="submit">
                      重置密码
                    </Button>
                  </div>
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
            {contextHolder}
            <Button size='large' type="primary" htmlType="submit">
              登录
            </Button>

            <Button size='large' type="primary" onClick={changeStateToRegister}>
              加入
            </Button>

          </div>
        </Form.Item>
      </Form>
    </div >
  );
};

export default LoginContent;