import { Layout } from 'antd';
import batik from '../assets/batik.jpg';

const { Footer } = Layout;

export default function AppFooter() {
    return (
        <Footer
            style={{
                textAlign: 'center',
                backgroundImage: `url(${batik})`,
                backgroundRepeat: 'repeat',
                backgroundSize: 'contain', // atau 'cover' jika ingin penuh
                color: 'white', // pastikan teks kontras
                padding: '20px',
                height: '64px',
            }}
        >
            SIPADI Kejayan ©2025 Sarjana Terapan Administrasi Negara, Fakultas Vokasi, Universitas Negeri Surabaya
        </Footer>
    );
}
