import { Typography, Button, Steps, Card, Image, Layout, Row } from 'antd';

const { Title } = Typography;
const { Meta } = Card;

export default function Result(){
    return(
        <div>
            <Title>Winner</Title>
            <Card
                hoverable
                style={{ width: 200 }}
                cover={<img alt="example" src="https://yssqxlnziqbocixqzokp.supabase.co/storage/v1/object/public/thumbnails/chapter_22.png" />}
            >
                <div>
                    <Meta title="Title" description="winner" />
                    <div>likes</div>
                </div>
            </Card>
        </div>
    )
}