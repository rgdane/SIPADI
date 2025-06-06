import { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table, Input } from 'antd';
import { deleteCategoryData, getCategoriesData, updateCategoryData } from '../services/categoryService';
import TambahDataButton from '../elements/TambahDataButton';
import TambahKategoriModal from '../modals/TambahKategoriModal';
import UbahKategoriModal from '../modals/UbahKategoriModal';
import DeleteButton from '../elements/DeleteButton';

export default function Kategori() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [searchText, setSearchText] = useState('');

    const filteredData = dataSource.filter(item =>
        item.code.toLowerCase().includes(searchText.toLowerCase()) ||
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.note?.toLowerCase().includes(searchText.toLowerCase())
    );


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        getCategoriesData()
            .then((data) => setDataSource(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleDelete = async (id) => {
        try {
            await deleteCategoryData(id);
            message.success('Kategori berhasil dihapus');
            fetchData();
        } catch (error) {
            console.error('Gagal hapus kategori:', error);
            message.error('Gagal hapus kategori');
        }
    }

    const openEditModal = (record) => {
        setEditingData(record);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (values) => {
        try {
            await updateCategoryData(editingData.id, values);
            message.success('Berhasil memperbarui kategori');
            setIsEditModalOpen(false);
            fetchData(); // refresh tabel
        } catch (error) {
            console.error('Gagal memperbarui kategori:', error);
            message.error('Gagal memperbarui kategori');
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
            title: 'Kode',
            dataIndex:'code',
            key: 'code'
        },
        {
            title: 'Nama',
            dataIndex:'name',
            key: 'name'
        },
        {
            title: 'Catatan',
            dataIndex: 'note',
            key: 'note',
            render: (text) => (text ? text : '-')
        },
        {
            title: 'Aksi',
            key: 'aksi',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => openEditModal(record)}>Ubah</Button>
                    <DeleteButton onConfirm={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2>Daftar Kategori</h2>
                <Space>
                    <Input.Search
                        placeholder="Cari kategori..."
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 200 }}
                    />
                    <TambahDataButton onClick={() => setIsModalOpen(true)} />
                </Space>
            </div>
            <Table dataSource={filteredData} columns={columns} loading={loading} />
            
            <TambahKategoriModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                fetchData={fetchData}
            />

            <UbahKategoriModal
                isModalOpen={isEditModalOpen}
                handleCancel={() => setIsEditModalOpen(false)}
                editingData={editingData}
                handleUpdate={handleUpdate}
            />
        </div>
    );
}
