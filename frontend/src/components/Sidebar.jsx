import Logo from '../elements/Logo.jsx';
import { useState } from "react";
import {
    AppstoreOutlined,
    FileZipOutlined,
    UserOutlined,
    BarChartOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { Menu } from "antd";
import { Layout } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

export default function Sidebar () {

    const navigate = useNavigate();
    const location = useLocation();

    function getItem(label, key, icon, children) {
        return { key, icon, children, label };
    }

    const items = [
        getItem('Dashboard', '/dashboard', <BarChartOutlined />),
        getItem('Pengguna', '/pengguna', <UserOutlined />),
        getItem('Kategori', '/kategori', <AppstoreOutlined />),
        getItem('Arsip', '/arsip', <FileZipOutlined />),
    ];

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{ backgroundColor: '#002140' }}
            trigger={null}
        >
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <Logo
                        collapsed={collapsed}
                        />

                    <Menu
                        style={{ backgroundColor: '#002140' }}
                        theme="dark"
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        items={items}
                        onClick={({ key }) => navigate(key)}
                        />
                </div>

                <div
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                    backgroundColor: 'rgb(2 38 71)',
                    color: '#fff',
                    textAlign: 'center',
                    height: '64px',
                    lineHeight: '64px',
                    cursor: 'pointer',
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </div>
            </div>
        </Sider>
    )
}