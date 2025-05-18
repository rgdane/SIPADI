import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getUsersData } from '../services/userService';

export default function Pengguna() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsersData()
        .then((data) => setDataSource(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, []);

    const columns = [
        { title: 'Nama', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
    ];

    return (
        <div>
        <h2>Daftar Pengguna</h2>
        <Table dataSource={dataSource} columns={columns} loading={loading} />
        </div>
    );
}
