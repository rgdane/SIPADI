import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Pengguna from '../pages/Pengguna';
import Kategori from '../pages/Kategori';
import Arsip from '../pages/Arsip';
import { Breadcrumb, Layout } from 'antd';
import { useMemo } from 'react';
import Dashboard from '../pages/Dashboard';

const { Content } = Layout;

export default function AppContent() {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);

    // Optional: bisa kasih label human readable
    const breadcrumbNameMap = {
        dashboard: 'Dashboard',
        pengguna: 'Pengguna',
        kategori: 'Kategori',
        arsip: 'Arsip',
    };

    const breadcrumbItems = useMemo(() => {
        return pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
            {breadcrumbNameMap[pathSnippets[index]] || pathSnippets[index]}
            </Breadcrumb.Item>
        );
        });
    }, [location]);

    return (
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbItems}
        </Breadcrumb>
        <div
            style={{
            padding: 24,
            minHeight: 360,
            background: '#fff',
            }}
        >
            <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pengguna" element={<Pengguna />} />
            <Route path="/kategori" element={<Kategori />} />
            <Route path="/arsip" element={<Arsip />} />
            </Routes>
        </div>
        </Content>
    );
}
