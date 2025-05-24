import Logo from '../elements/Logo.jsx';
import { useState } from "react";
import {
    AppstoreOutlined,
    FileZipOutlined,
    UserOutlined,
    BarChartOutlined,
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
            theme="light"
        >
            <Logo
                collapsed={collapsed}
            />

            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={items}
                onClick={({ key }) => navigate(key)}
            />
        </Sider>
    )
}