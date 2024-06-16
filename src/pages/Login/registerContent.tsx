import { UserOutlined, PhoneOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
import {
    Button, Form, Input,
} from 'antd';

interface LoginContentProps {
    changeState: (stateValue: number) => void;
}

const RegisterContent: React.FC<LoginContentProps> = ({ changeState }) => {
    interface RegisterFormValues {
        username: string;
        phone: string;
        password: string;
    }

    function changeStateToLogin() {
        changeState(0);
    }


    const onFinish = (values: RegisterFormValues) => {
        console.log('Received values of form: ', values);
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

    return (
        <Form
            name="register"
            onFinish={onFinish}
        >

            <Form.Item
                name="phone"
                rules={[
                    { required: true, message: '请输入你的手机号!' },
                    { validator: validatePhone }
                ]}
            >
                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="手机号" />
            </Form.Item>

            <Form.Item
                name="userName"
                rules={[{ required: true, message: '请输入你的用户名!' }]}
            >
                <Input autoComplete="current-password" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
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
                <Input.Password autoComplete="current-password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="密码" />
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
                <Input.Password autoComplete="current-password" prefix={<KeyOutlined className="site-form-item-icon" />} placeholder="确认密码" />
            </Form.Item>

            <Form.Item>
                <div style={{ textAlign: 'center', marginTop: '-4%', marginBottom: "5%" }}>
                    <span style={{ fontSize: '12px' }}>登录即表示同意平台 <a href="">协议</a></span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button size='large' type="primary" onClick={changeStateToLogin}>
                        返回
                    </Button>

                    <Button size='large' type="primary" htmlType="submit">
                        注册
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default RegisterContent;