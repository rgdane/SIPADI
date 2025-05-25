import { Layout } from 'antd';
import LogoutButton from '../elements/LogoutButton';
import { useAuth } from '../services/AuthContext';
import batik from '../assets/batik.jpg';


const { Header } = Layout;

export default function AppHeader() {
    const { user } = useAuth();

    return (
        <Header style={{
            background: '#F8F0E5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundImage: `url(${batik})`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'contain',
            }}
        >
            <h3 style={{ color: '#fff'}}>Halo, {user?.name}</h3>
            <LogoutButton />
        </Header>
        
    );
}
