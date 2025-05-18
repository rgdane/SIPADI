import { Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';

export default function TambahDataButton( {onClick}) {
    return (
        <Button type="primary" icon={<PlusOutlined />} onClick={onClick}>
            Tambah Data
        </Button>
    )
}