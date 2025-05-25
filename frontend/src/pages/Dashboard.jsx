import { Card, Col, Row, Button, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardData } from '../services/dashboardService'; // kamu perlu bikin ini

export default function Dashboard() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDashboardData()
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false); // tetap false walau error
            });
    }, []);

    const handleMoreClick = (categoryId) => {
        navigate(`/arsip?category=${categoryId}`);
    };

    return (
        <Spin spinning={loading}>
            <div>
                <h2>Statistik Arsip</h2>
                <Row gutter={[16, 16]}>
                    {data.map((item) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={item.category_id}>
                            <Card
                                className='custom-card'
                                title={item.category_name}
                                variant='bordered'
                                actions={[
                                    <Button type="link" onClick={() => handleMoreClick(item.category_id)}>
                                        Selengkapnya
                                    </Button>,
                                ]}
                            >
                                <p>Total Arsip: {item.total}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Spin>
    );
}
