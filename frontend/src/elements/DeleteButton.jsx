import { Button, Popconfirm } from "antd";
import { useAuth } from "../services/AuthContext";

const DeleteButton = ({ onConfirm }) => {
    const { user } = useAuth();

    if (user?.role !== "admin") return null;

    return (
        <Popconfirm
        title="Yakin ingin hapus data ini?"
        description="Data yang dihapus tidak bisa dikembalikan."
        okText="Ya, hapus"
        cancelText="Batal"
        onConfirm={onConfirm}
        >
        <Button danger>Hapus</Button>
        </Popconfirm>
    );
};

export default DeleteButton;
