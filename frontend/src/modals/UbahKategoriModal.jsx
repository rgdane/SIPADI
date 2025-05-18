import { Form, Input, Modal } from "antd";
import { useEffect } from "react";

export default function UbahKategoriModal({isModalOpen, handleCancel, editingData, handleUpdate}){
    const [form] = Form.useForm();

    useEffect(() => {
        if (editingData) {
            form.setFieldsValue({
                code: editingData.code,
                name: editingData.name,
                note: editingData.note,
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
            title="Ubah Data Kategori"
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical">
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
    )
}