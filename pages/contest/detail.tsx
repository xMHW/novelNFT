import { Typography, Button, Steps, Card, Image, Layout, Row } from 'antd';

const { Title } = Typography;

export default function Detail(){
    const description = 'This is a description.';

    return(
        <>
            <div>
                <Title level={3}>Subject</Title >
                <Card style={{ width: 300 }}>
                    <p>“Kim Dok-ja” Illustration</p>
                </Card>
            </div>
            <div>
                <Title level={3}>Winner Prize</Title >
                <Card style={{ width: 300 }}>
                    <p>Showcase for 2 weeks</p>
                    <Image
                        width={200}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        preview={false}
                    />
                </Card>
            </div>
            <div>
                <Title level={3}>Schedule</Title >
                <Card style={{ width: 300 }}>
                    <Title level={5}>Entry</Title>
                    <p>May 1, 2023 ~ May 7, 2023</p>
                    <Title level={5}>Voting</Title>
                    <p>May 8, 2023 ~ May 14, 2023</p>
                    <Title level={5}>Showcase</Title>
                    <p>May 15, 2023 ~ May 21, 2023</p>
                </Card>
            </div>
            <div>
                <Title level={3}>How to Enter</Title >
                <Steps
                    direction="vertical"
                    progressDot
                    current={2}
                    items={[
                    {
                        title: 'Step 1',
                        description,
                    },
                    {
                        title: 'Step 2',
                        description,
                    },
                    {
                        title: 'Step 3',
                        description,
                    },
                    ]}
                />
            </div>
            <div>
                <Title level={3}>Qualifications</Title >
                <Card style={{ width: 300 }}>
                    <p></p>
                    <p></p>
                    <p></p>
                </Card>
            </div>
        </>
    )
}