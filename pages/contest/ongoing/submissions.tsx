import { Typography, Button, Steps, Card, Image, Layout, Row } from 'antd';
import Submissions from '../submissions';

const { Title } = Typography;

export default function ongoingSubmissions(){
    return(
        <div>
            <Title>Main Character Illustration</Title>
            <Title level={2}>Submissions</Title>
            <Submissions />
        </div>
    )
}