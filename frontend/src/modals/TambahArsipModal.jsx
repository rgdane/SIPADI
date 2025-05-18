import { DatePicker, Form, Input, Modal, Select } from "antd";
import { createArchiveData } from "../services/archiveService";
import { getCategoriesData } from "../services/categoryService";
import { useEffect, useState } from "react";

export default function TambahArsipModal({ isModalOpen, setIsModalOpen, fetchData }) {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            getCategoriesData()
                .then((data) => setCategories(data))
                .catch((err) => console.error(err));
        };
        fetchData();
    }, []);

    const handleSubmit = async (values) => {
        try {
            const formattedValues = {
                ...values,
                date: values.date.format('YYYY-MM-DD'),
            };

            await createArchiveData(formattedValues);
            fetchData();
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error('Gagal menambah data arsip:', error?.response?.data || error.message);
        }
    };


    return (
        <Modal
            title="Tambah Data Arsip"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => form.submit()}
            okText="Simpan"
            cancelText="Batal"
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="category_id"
                    label="Kategori"
                    rules={[{ required: true, message: 'Pilih kategori!' }]}
                >
                    <Select placeholder="Pilih Kategori Arsip" >
                        {categories.map((category) => (
                            <Select.Option key={category.id} value={category.id}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="title"
                    label="Judul"
                    rules={[{ required: true, message: 'Masukkan judul!' }]}
                >
                    <Input placeholder="Masukkan Judul Arsip" />
                </Form.Item>
                <Form.Item name="date" label="Tanggal" rules={[{ required: true, message: 'Pilih tanggal!'  }]}>
                    <DatePicker placeholder="Pilih Tanggal Arsip" format="YYYY/MM/DD" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="note"
                    label="Catatan"
                >
                    <Input placeholder="Masukkan Catatan Arsip" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
