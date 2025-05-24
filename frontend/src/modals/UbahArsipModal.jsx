import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { getCategoriesData } from "../services/categoryService";
import dayjs from "dayjs";

export default function UbahArsipModal({ isModalOpen, handleCancel, editingData, handleUpdate }) {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (isModalOpen) {
            getCategoriesData()
                .then((data) => setCategories(data))
                .catch((err) => console.error(err));
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (editingData && categories.length > 0) {
            form.setFieldsValue({
                category_id: String(editingData.category_id),
                code: editingData.code,
                nik: editingData.nik,
                title: editingData.title,
                date: editingData.date ? dayjs(editingData.date) : null,
            });

            if (editingData.file) {
                setFileList([
                    {
                        uid: '-1',
                        name: editingData.file.split('/').pop(),
                        status: 'done',
                        url: editingData.file,
                    },
                ]);
            } else {
                setFileList([]);
            }
        }
    }, [editingData, categories]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            values.date = values.date.format("YYYY-MM-DD");

            let file = null;

            // Ambil file hanya jika user upload baru
            if (fileList.length > 0 && fileList[0].originFileObj) {
                file = fileList[0].originFileObj;
            }

            // Kirim file hanya jika user memilih file baru
            const payload = new FormData();
            payload.append("category_id", values.category_id);
            payload.append("nik", values.nik);
            payload.append("title", values.title);
            payload.append("date", values.date);
            if (file) {
                payload.append("file", file); // file baru
            }

            handleUpdate(payload); // Pastikan handleUpdate mengirim FormData
        } catch (error) {
            console.error("Gagal submit:", error);
        }
    };

    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(-1)); // Hanya satu file yang disimpan
    };

    return (
        <Modal
            title="Ubah Data Arsip"
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="category_id"
                    label="Kategori"
                    rules={[{ required: true, message: 'Pilih kategori!' }]}
                >
                    <Select placeholder="Pilih Kategori Arsip">
                        {categories.map((category) => (
                            <Select.Option key={category.id} value={String(category.id)}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="nik"
                    label="NIK"
                    rules={[{ required: true, message: 'Masukkan nik!' }]}
                >
                    <Input placeholder="Masukkan NIK" />
                </Form.Item>
                <Form.Item
                    name="title"
                    label="Judul"
                    rules={[{ required: true, message: 'Masukkan judul!' }]}
                >
                    <Input placeholder="Masukkan Judul Arsip" />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Tanggal"
                    rules={[{ required: true, message: 'Pilih tanggal!' }]}
                >
                    <DatePicker placeholder="Pilih Tanggal Arsip" format="YYYY/MM/DD" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Upload Dokumen">
                    <Upload
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={handleFileChange}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Upload Dokumen</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
}
