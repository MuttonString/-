import { UserOutlined, PhoneOutlined, LockOutlined, KeyOutlined, MailOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Modal, Typography, Row, Col } from 'antd';

import request from '../../../utils/request'

interface LoginContentProps {
    changeState: (stateValue: number) => void;
}

const RegisterContent: React.FC<LoginContentProps> = ({ changeState }) => {

    useEffect(() => {
        setTimeout(() => {
            if (animation.current !== null) {
                animation.current.style.opacity = '1';
            }
        });
    }, [])

    const { Title, Paragraph } = Typography;

    const animation = useRef<HTMLDivElement>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isPhoneValid, setIsPhoneValid] = useState(false);

    const [phone, setPhone] = useState('');

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const showModal = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
    };
    interface RegisterFormValues {
        username: string;
        phone: string;
        password: string;
    }

    function changeStateToLogin() {
        changeState(1);
    }

    async function SendVerificationCode() {
        if (isPhoneValid) {
            //发送验证码
            console.log("发送验证码");

            await request.post('/user/code', {
                phone: phone,
                type: 1
            }).then(res => {
                console.log(res);
            })

        } else {
            console.log("请输入正确的手机号");
        }
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
        setPhone(value)
        setIsPhoneValid(true);
        return Promise.resolve();
    };

    return (
        <div ref={animation}
            style={{
                opacity: '0',
                transition: 'opacity 1s ease-in-out'
            }}
        >
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
                    <Input
                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                        placeholder="手机号"
                    />
                </Form.Item>

                <Form.Item>
                    <Row gutter={20}>
                        <Col span={17}>
                            <Input
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                placeholder="请输入验证码" />
                        </Col>
                        <Col span={6}>
                            <Button type="primary" onClick={SendVerificationCode}>
                                发送验证码
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item
                    name="userName"
                    rules={[{ required: true, message: '请输入你的用户名!' }]}
                >
                    <Input
                        autoComplete="current-password"
                        prefix={<UserOutlined
                            className="site-form-item-icon" />}
                        placeholder="用户名"
                    />
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
                    <div style={{ textAlign: 'center', marginTop: "-2%" }}>
                        <span style={{ fontSize: '12px' }}>登录即表示同意平台
                            <a href="" onClick={showModal}> 协议</a>
                            <Modal
                                title={<Title level={4}>商品管理系统使用协议</Title>}
                                open={isModalOpen}
                                onOk={handleOk}
                                onCancel={handleCancel}
                            >
                                <Paragraph>
                                    一、协议双方<br />
                                    甲方（提供方）：小二集团<br />
                                    乙方（使用方）：用户
                                </Paragraph>
                                <Paragraph>
                                    二、协议目的<br />
                                    本协议旨在规范乙方使用甲方提供的商品管理系统（以下简称“系统”）的各项权利与义务，确保双方利益受到保护。
                                </Paragraph>
                                {/* ...省略其他协议条款... */}
                                <Paragraph>
                                    十、其他<br />
                                    1. 本协议未尽事宜，双方可另行签订补充协议，补充协议与本协议具有同等法律效力。<br />
                                    2. 甲方有权对本协议进行修订，修订内容将在系统公告中发布，乙方继续使用系统视为接受修订后的协议。
                                </Paragraph>
                            </Modal>
                        </span>
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
        </div >
    );
};

export default RegisterContent;