import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import AppFooter from './components/AppFooter';

export default function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <AppHeader />
        <AppContent />
        <AppFooter />
      </Layout>
    </Layout>
  );
}
