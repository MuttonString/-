import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

const LoginContent: React.FC = () => {
  const onFinish = (values: LoginFormValues) => {
    console.log('Received values of form: ', values);
  };

  const validatePhone = (_rule: object, value: string) => {

    const isNumeric = /^\d+$/.test(value);
    if (value !== undefined) {
      if (!isNumeric && value.length !== 0) {
        return Promise.reject(new Error('请正确输入手机号，只能包含数字!'));
      }

      if (value.length !== 11 && value.length !== 0) {
        return Promise.reject(new Error('手机号必须是11位!'));
      }
    }

    return Promise.resolve();
  };

  return (
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
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="手机号" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            忘记密码
          </a>
        </div>
      </Form.Item>

      <Form.Item>
        <div style={{marginTop: "2%", padding: "0 5% 0", display: 'flex', justifyContent: 'space-between' }}>
          <Button size='large' type="primary" htmlType="submit">
            登录
          </Button>

          <Button size='large' type="primary">
            加入
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default LoginContent;