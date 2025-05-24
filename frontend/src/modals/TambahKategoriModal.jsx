import { Form, Input, message, Modal } from "antd";
import { createCategoryData } from "../services/categoryService";

export default function TambahKategoriModal({ isModalOpen, setIsModalOpen, fetchData }) {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            await createCategoryData(values);
            fetchData();
            setIsModalOpen(false);
            form.resetFields();
            message.success("Berhasil menambah data kategori");
        } catch (error) {
            console.error('Gagal menambah data kategori:', error?.response?.data || error.message);
            message.error("Gagal menambah data kategori");
        }
    };

    return (
        <Modal
            title="Tambah Data Kategori"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => form.submit()}
            okText="Simpan"
            cancelText="Batal"
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="code"
                    label="Kode"
                    rules={[{ required: true, message: 'Masukkan kode!' }]}
                >
                    <Input placeholder="Masukkan Kode Kategori" />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Nama"
                    rules={[{ required: true, message: 'Masukkan nama!' }]}
                >
                    <Input placeholder="Masukkan Nama Kategori" />
                </Form.Item>
                <Form.Item
                    name="note"
                    label="Catatan"
                >
                    <Input placeholder="Masukkan Catatan Kategori" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
