import { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table } from 'antd';
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
            title: 'Catatan',
            dataIndex: 'note',
            key: 'note'
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
                <TambahDataButton onClick={() => setIsModalOpen(true)} />
            </div>
            <Table dataSource={dataSource} columns={columns} loading={loading} />
            
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
