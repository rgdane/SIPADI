import { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table, Input } from 'antd';
import { deleteArchiveData, getArchivesData, updateArchiveData } from '../services/archiveService';
import TambahDataButton from '../elements/TambahDataButton';
import TambahArsipModal from '../modals/TambahArsipModal';
import UbahArsipModal from '../modals/UbahArsipModal';

export default function Arsip() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [searchText, setSearchText] = useState('');

    const filteredData = dataSource.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.note?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category?.name?.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        getArchivesData()
            .then((data) => setDataSource(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleDelete = async (id) => {
        try {
            await deleteArchiveData(id);
            message.success('Arsip berhasil dihapus');
            fetchData();
        } catch (error) {
            console.error('Gagal hapus arsip:', error);
            message.error('Gagal hapus arsip');
        }
    }

    const openEditModal = (record) => {
        setEditingData(record);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (values) => {
        try {
            await updateArchiveData(editingData.id, values);
            message.success('Berhasil memperbarui arsip!');
            setIsEditModalOpen(false);
            fetchData(); // refresh tabel
        } catch (error) {
            console.error('Gagal update arsip:', error);
            message.error('Gagal update arsip!');
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
            title: 'Kategori',
            dataIndex:['category', 'name'],
            key: 'name'
        },
        {
            title: 'Nomor Dokumen',
            dataIndex:'code',
            key: 'code'
        },
        {
            title: 'Judul',
            dataIndex:'title',
            key: 'title'
        },
        {
            title: 'Tanggal',
            dataIndex:'date',
            key: 'date'
        },
        {
        title: 'Dokumen',
        dataIndex: 'file',
        key: 'file',
        render: (text) =>
            text ? (
            <a href={`http://localhost:8000${text}`} target="_blank" rel="noopener noreferrer">
                Lihat Dokumen
            </a>
            ) : (
            <span style={{ color: 'gray' }}>Tidak ada</span>
            ),
        },
        {
            title: 'Aksi',
            key: 'aksi',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => openEditModal(record)}>Ubah</Button>
                    <Popconfirm
                        title="Yakin ingin hapus arsip ini?"
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
                <h2>Daftar Arsip</h2>
                <Space>
                    <Input.Search
                        placeholder="Cari arsip..."
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 200 }}
                    />
                    <TambahDataButton onClick={() => setIsModalOpen(true)} />
                </Space>
            </div>

            <Table dataSource={filteredData} columns={columns} loading={loading} />
            
            <TambahArsipModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                fetchData={fetchData}
            />

            <UbahArsipModal
                isModalOpen={isEditModalOpen}
                handleCancel={() => setIsEditModalOpen(false)}
                editingData={editingData}
                handleUpdate={handleUpdate}
            />
        </div>
    );
}
