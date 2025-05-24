import { Card, Col, Row, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardData } from '../services/dashboardService'; // kamu perlu bikin ini

export default function Dashboard() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDashboardData()
            .then(setData)
            .catch((err) => console.error(err));
    }, []);

    const handleMoreClick = (categoryId) => {
        navigate(`/arsip?category=${categoryId}`);
    };

    return (
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
    );
}
