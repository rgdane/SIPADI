import { Layout, theme } from 'antd';
import LogoutButton from '../elements/LogoutButton';
import { useAuth } from '../services/AuthContext';

const { Header } = Layout;

export default function AppHeader() {
    const { user } = useAuth();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Header style={{ background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center',}} >
            <h3>Halo, {user?.name}</h3>
            <LogoutButton />
        </Header>
        
    );
}
