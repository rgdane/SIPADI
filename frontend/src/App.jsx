import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import AppFooter from './components/AppFooter';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Layout style={{ minHeight: '100vh' }}>
              <Sidebar />
              <Layout>
                <AppHeader />
                <AppContent />
                <AppFooter />
              </Layout>
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
