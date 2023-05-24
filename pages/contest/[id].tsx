import { Typography, Button, Steps, Card, Image, Layout, Row } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchContest } from '@/lib/apis';

const { Title } = Typography;

export default function Detail(){
    const description = 'This is a description.';
    const router = useRouter();
    const contestID = router.query.id;
    const [contest, setContest] = useState<any>();

    useEffect(() => {
        console.log(contestID);
        console.log(typeof(contestID))
        const loadData = async () => {
            const contest = await fetchContest(contestID);
            console.log(contest)
            setContest(contest);
        };
        loadData();
        console.log(contest)
    }, [contestID])

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
                        src=""
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