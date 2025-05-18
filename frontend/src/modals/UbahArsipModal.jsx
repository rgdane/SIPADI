import { DatePicker, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { getCategoriesData } from "../services/categoryService";
import dayjs from "dayjs";

export default function UbahArsipModal({ isModalOpen, handleCancel, editingData, handleUpdate }) {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);

    // Ambil kategori saat pertama kali modal dibuka
    useEffect(() => {
        if (isModalOpen) {
            getCategoriesData()
                .then((data) => setCategories(data))
                .catch((err) => console.error(err));
        }
    }, [isModalOpen]);

    // Atur form field setelah kategori dan data siap
    useEffect(() => {
        if (editingData && categories.length > 0) {
            form.setFieldsValue({
                category_id: String(editingData.category_id), // pastikan string
                title: editingData.title,
                date: editingData.date ? dayjs(editingData.date) : null,
                note: editingData.note,
            });
        }
    }, [editingData, categories]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            values.date = values.date.format("YYYY-MM-DD"); // format ke string tanggal
            handleUpdate(values);
        } catch (error) {
            console.error("Gagal submit:", error);
        }
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
