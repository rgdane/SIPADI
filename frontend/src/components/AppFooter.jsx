import { Layout } from 'antd';
import batik from '../assets/batik.jpg';
import unesa from '../assets/unesa.jpg';

const { Footer } = Layout;

export default function AppFooter() {
    return (
        <Footer
            style={{
                backgroundImage: `url(${batik})`,
                backgroundRepeat: 'repeat',
                backgroundSize: 'contain',
                color: 'white',
                padding: '15px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'left',
                gap: '16px',
            }}
        >
            <img
                src={unesa}
                alt="Logo Unesa"
                style={{
                    height: '32px',
                    width: '32px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                }}
            />
            <span style={{ maxWidth: '800px' }}>
                SIPADI Kejayan ©2025 Sarjana Terapan Administrasi Negara, Fakultas Vokasi, Universitas Negeri Surabaya
            </span>
        </Footer>
    );
}
