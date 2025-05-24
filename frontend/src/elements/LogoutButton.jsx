import { Button } from "antd";
import { useAuth } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons'

export default function LogoutButton(){
    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();    // clear user & session
        navigate('/login');    // redirect ke login
    };

    return (
        <Button
            danger
            onClick={handleLogout}
            className="custom-danger-button"
            >
            <LogoutOutlined />
            Keluar
        </Button>
    );
}