import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Pengguna from '../pages/Pengguna';
import Kategori from '../pages/Kategori';
import Arsip from '../pages/Arsip';
import { Breadcrumb, Layout } from 'antd';
import { useMemo } from 'react';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import Unauthorized from '../pages/Unauthorized';

const { Content } = Layout;

export default function AppContent() {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);

    // Optional: bisa kasih label human readable
    const breadcrumbNameMap = {
        dashboard: 'Dashboard',
        pengguna: 'Pengguna',
        kategori: 'Kategori',
        arsip: 'Tambah Arsip',
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
        <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbItems}
        </Breadcrumb>
        <div
            style={{
                padding: 24,
                minHeight: 360,
                background: '#fff',
                borderRadius: '15px',
                boxShadow: '-4px 4px 6px rgba(0,0,0,0.1)',
            }}
        >
            <Routes>
                {/* Redirect root ke dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" />} />

                {/* Bisa diakses oleh admin & pengguna */}
                <Route
                    path="/dashboard"
                    element={
                    <PrivateRoute roles={['admin', 'pengguna']}>
                        <Dashboard />
                    </PrivateRoute>
                    }
                />
                <Route
                    path="/kategori"
                    element={
                    <PrivateRoute roles={['admin']}>
                        <Kategori />
                    </PrivateRoute>
                    }
                />
                <Route
                    path="/arsip"
                    element={
                    <PrivateRoute roles={['admin', 'pengguna']}>
                        <Arsip />
                    </PrivateRoute>
                    }
                />

                {/* Khusus admin */}
                <Route
                    path="/pengguna"
                    element={
                    <PrivateRoute roles={['admin']}>
                        <Pengguna />
                    </PrivateRoute>
                    }
                />

                {/* Halaman unauthorized */}
                <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
        </div>
        </Content>
    );
}
