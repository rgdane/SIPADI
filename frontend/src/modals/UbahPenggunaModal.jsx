import { Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

export default function UbahPenggunaModal({isModalOpen, handleCancel, editingData, handleUpdate}){
    const [form] = Form.useForm();

    useEffect(() => {
        if (editingData) {
            form.setFieldsValue({
                role: editingData.role,
                name: editingData.name,
                email: editingData.email,
                password: editingData.password,
            });
        }
    }, [editingData, form]);

    const handleSubmit = async () => {
        try {
        const values = await form.validateFields();
        handleUpdate(values); // kirim ke parent
        } catch (error) {
        console.error('Gagal submit:', error);
        }
    };
    
    return (
        <Modal
            title="Ubah Data Pengguna"
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical">
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
                    rules={[
                        { min: 8, message: 'Password minimal 8 karakter!' },
                    ]}
                >
                    <Input.Password placeholder="Kosongkan jika tidak ingin diubah" />
                </Form.Item>
            </Form>
        </Modal>
    )
}