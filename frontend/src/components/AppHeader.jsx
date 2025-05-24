import { Layout } from 'antd';
import LogoutButton from '../elements/LogoutButton';
import { useAuth } from '../services/AuthContext';

const { Header } = Layout;

export default function AppHeader() {
    const { user } = useAuth();

    return (
        <Header style={{ background: '#F8F0E5', display: 'flex', justifyContent: 'space-between', alignItems: 'center',}} >
            <h3>Halo, {user?.name}</h3>
            <LogoutButton />
        </Header>
        
    );
}
