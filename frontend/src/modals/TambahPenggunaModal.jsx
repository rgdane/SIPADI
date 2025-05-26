import { Form, Input, message, Modal, Select } from "antd";
import { createUserData } from "../services/userService";

export default function TambahPenggunaModal({ isModalOpen, setIsModalOpen, fetchData }) {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            await createUserData(values);
            fetchData();
            setIsModalOpen(false);
            form.resetFields();
            message.success("Berhasil menambah data pengguna");
        } catch (error) {
            console.error('Gagal menambah data pengguna:', error?.response?.data || error.message);
            message.gagal("Gagal menambah data pengguna");
        }
    };

    return (
        <Modal
            title="Tambah Data Pengguna"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => form.submit()}
            okText="Simpan"
            cancelText="Batal"
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="role"
                    label="Jenis Pengguna"
                    rules={[{ required: true, message: 'pilih jenis pengguna!' }]}
                    >
                    <Select placeholder="Pilih Jenis Pengguna">
                        <Select.Option value={'admin'}>Admin</Select.Option>
                        <Select.Option value={'pengguna'}>Pengguna</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Nama"
                    rules={[{ required: true, message: 'Masukkan nama!' }]}
                >
                    <Input placeholder="Masukkan Nama Pengguna" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Masukkan email!' }]}
                >
                    <Input placeholder="Masukkan Email Pengguna" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Masukkan password!' }]}
                >
                    <Input.Password placeholder="Masukkan Password Pengguna" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
