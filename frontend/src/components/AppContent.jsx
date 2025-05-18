import { Breadcrumb, Layout, theme } from 'antd';

const { Content } = Layout;

export default function AppContent() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Pengguna</Breadcrumb.Item>
        </Breadcrumb>
        <div
            style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            }}
        >
            Ini isi konten pengguna
        </div>
        </Content>
    );
}
