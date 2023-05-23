import { Row, Col, Image, Typography, Card } from 'antd';
import { useState } from 'react';

const { Title } = Typography;
const { Meta } = Card;

export default function Submissions(){
    const cols = [];
    const colCount = 3;
    const gutter = 1;
    const vgutter = 1;
    let colCode = '';
    for (let i = 0; i < colCount; i++) {
        cols.push(
        <Col key={i.toString()} span={24 / colCount}>
            <Card
                hoverable
                style={{ width: 200 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <div>
                    <Meta title="Title" description="winner" />
                    <div>likes</div>
                </div>
            </Card>
        </Col>,
        );
        colCode += `  <Col span={${24 / colCount}} />\n`;
    }
    return(
        <div>
            
            <Row gutter={[gutter, vgutter]}>
                {cols}
                {cols}
            </Row>

        </div>
    )
}