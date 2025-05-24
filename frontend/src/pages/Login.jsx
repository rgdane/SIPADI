import { Layout, Form, Input, Button, message } from 'antd';
import { useAuth } from '../services/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AppFooter from '../components/AppFooter';
import logo from '../assets/kejayan.PNG';
import { LoginOutlined } from '@ant-design/icons'

const { Content } = Layout;

export default function Login() {
    const [form] = Form.useForm();
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            await loginUser(values);
            message.success("Login berhasil");
            form.resetFields();
            navigate('/');
        } catch (error) {
            console.error(error);
            message.error("Gagal login");
        }
    };

    useEffect(() => {
        form.resetFields();
    }, [form]);

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#002140'}}>
            <Content style={{ maxWidth: 400, margin: 'auto', paddingTop: 100}}>
                <div style={{ 
                    backgroundColor: '#f8f3ed',
                    padding: '20px',
                    borderRadius: '15px',
                    justifyItems: 'center'
                }}>
                <img
                    src={logo}
                    alt="kejayan"
                    style={{ height: 64 }}
                />
                <h2>SIPADI Kejayan</h2>
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Email wajib diisi' }]}
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Password wajib diisi' }]}
                        >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            <LoginOutlined />
                            Masuk
                        </Button>
                    </Form.Item>
                </Form>
                </div>
            </Content>
            <AppFooter />
        </Layout>
    );
}
