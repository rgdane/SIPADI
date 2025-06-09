import { Button, DatePicker, Form, Input, message, Modal, Select, Upload } from "antd";
import { createArchiveData } from "../services/archiveService";
import { getCategoriesData } from "../services/categoryService";
import { useEffect, useState } from "react";
import { UploadOutlined } from '@ant-design/icons';

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
            const formData = new FormData();

            formData.append('category_id', values.category_id);
            formData.append('concern', values.concern);
            formData.append('title', values.title);
            formData.append('date', values.date.format('YYYY-MM-DD'));
            formData.append('note', values.note || '');

            if (values.file?.file) {
                formData.append('file', values.file.file); // Ambil file dari Upload
            }

            await createArchiveData(formData); // kirim FormData
            fetchData();
            setIsModalOpen(false);
            form.resetFields();
            message.success("Berhasil menambah data arsip");
        } catch (error) {
            console.error('Gagal menambah data arsip:', error?.response?.data || error.message);
            message.error("Gagal menambah data arsip");
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
                    <Select 
                        showSearch
                        placeholder="Pilih Kategori Arsip"
                        optionFilterProp="children"
                    >
                        {categories.map((category) => (
                            <Select.Option key={category.id} value={category.id}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="concern"
                    label="Perihal"
                    rules={[{ message: 'Masukkan perihal!' }]}
                >
                    <Input placeholder="Masukkan Perihal" />
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
                <Form.Item name="file" label="Upload Dokumen" valuePropName="file" getValueFromEvent={(e) => e}>
                    <Upload beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Upload Dokumen</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
}
