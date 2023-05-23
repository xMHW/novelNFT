import { Typography, Button, Steps, Card, Image, Layout, Row } from 'antd';
import Detail from '../detail';

const { Title } = Typography;

export default function Ongoing(){
    const description = 'This is a description.';

    return(
        <>
            <div>
                <Title>Main Character Fanart Contest</Title>
                <div>
                    <Button type="primary">Go to Enter</Button>
                    <Button>Submissions</Button>
                </div>
            </div>
            <Detail />           
        </>
    )
}