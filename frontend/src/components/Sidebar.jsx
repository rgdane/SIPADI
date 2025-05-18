import Sider from "antd/es/layout/Sider";
import Logo from '../elements/Logo.jsx';
import { useState } from "react";
import {
    AppstoreOutlined,
    FileZipOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Menu } from "antd";

export default function Sidebar () {

    function getItem(label, key, icon, children) {
        return { key, icon, children, label };
    }

    const items = [
        getItem('Pengguna', '1', <UserOutlined />),
        getItem('Kategori', '2', <AppstoreOutlined />),
        getItem('Arsip', '3', <FileZipOutlined />),
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
                defaultSelectedKeys={['1']}
                mode="inline"
                items={items}
            />
        </Sider>
    )
}