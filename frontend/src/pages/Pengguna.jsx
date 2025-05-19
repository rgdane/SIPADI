import { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table, Input } from 'antd';
import { deleteUserData, getUsersData, updateUserData } from '../services/userService';
import TambahDataButton from '../elements/TambahDataButton';
import TambahPenggunaModal from '../modals/TambahPenggunaModal';
import UbahPenggunaModal from '../modals/UbahPenggunaModal';

export default function Pengguna() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [searchText, setSearchText] = useState('');

    const filteredData = dataSource.filter(item =>
        item.email.toLowerCase().includes(searchText.toLowerCase()) ||
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        getUsersData()
            .then((data) => setDataSource(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleDelete = async (id) => {
        try {
            await deleteUserData(id);
            message.success('Pengguna berhasil dihapus');
            fetchData();
        } catch (error) {
            console.error('Gagal hapus pengguna:', error);
            message.error('Gagal hapus pengguna');
        }
    }

    const openEditModal = (record) => {
        setEditingData(record);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (values) => {
        try {
            await updateUserData(editingData.id, values);
            message.success('Berhasil memperbarui pengguna!');
            setIsEditModalOpen(false);
            fetchData(); // refresh tabel
        } catch (error) {
            console.error('Gagal update pengguna:', error);
            message.error('Gagal update pengguna!');
        }
    };

    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        { 
            title: 'Nama',
            dataIndex:'name',
            key: 'name'
        },
        { 
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Aksi',
            key: 'aksi',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => openEditModal(record)}>Ubah</Button>
                    <Popconfirm
                        title="Yakin ingin hapus pengguna ini?"
                        description="Data yang dihapus tidak bisa dikembalikan."
                        okText="Ya, hapus"
                        cancelText="Batal"
                        onConfirm={() => handleDelete(record.id)}
                    >
                    <Button danger>Hapus</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2>Daftar Pengguna</h2>
                <Space>
                    <Input.Search
                        placeholder="Cari pengguna..."
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 200 }}
                    />
                    <TambahDataButton onClick={() => setIsModalOpen(true)} />
                </Space>
            </div>
            <Table dataSource={filteredData} columns={columns} loading={loading} />
            
            <TambahPenggunaModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                fetchData={fetchData}
            />

            <UbahPenggunaModal
                isModalOpen={isEditModalOpen}
                handleCancel={() => setIsEditModalOpen(false)}
                editingData={editingData}
                handleUpdate={handleUpdate}
            />
        </div>
    );
}
