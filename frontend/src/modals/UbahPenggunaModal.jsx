import { Form, Input, Modal } from "antd";
import { useEffect } from "react";

export default function UbahPenggunaModal({isModalOpen, handleCancel, editingData, handleUpdate}){
    const [form] = Form.useForm();

    useEffect(() => {
        if (editingData) {
            form.setFieldsValue({
                name: editingData.name,
                email: editingData.email,
                password: editingData.password,
            });
        }
    }, [editingData, form]);

    const handleSubmit = async () => {
        try {
        const values = await form.validateFields();
        console.log(values);
        
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
                >
                    <Input.Password placeholder="Kosongkan jika tidak ingin diubah" />
                </Form.Item>
            </Form>
        </Modal>
    )
}