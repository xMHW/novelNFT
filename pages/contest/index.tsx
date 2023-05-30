import { fetchContests, fetchContest } from '@/lib/apis';
import { Typography, Image, Row, Card } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const { Title } = Typography;
const { Meta } = Card;

export default function Contest() {
    const ongoingContestID = 1;
    const [contests, setContests] = useState<any>([]);
    const [ongoingContest, setOngoingContest] = useState<any>({
        "image_url": "",
        "name": ""
    });
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            const contests = await fetchContests();
            const contest = await fetchContest(1);
            console.log(contest)
            console.log(contests)
            setContests(contests);
            setOngoingContest(contest[0]);
        };
        loadData();
    }, []);

    // useEffect(() => {
    //     contests.forEach((contest) => {
    //         if (contest.id === ongoingContestID) {
    //             setOngoingContest(contest)
    //             console.log(ongoingContest)
    //         }
    //     })
    // }, [contests])

    const onContestClick = (contestID) => {
        router.push("/contest/"+contestID)
    }

    return (
        <>
            <Title>Bi-Weekly NFT Contest</Title>
            <div>
                <Title level={4}>On-going Contest</Title>
                <Card 
                hoverable
                style={{ width: 250 }}
                onClick={() => onContestClick(1)}
                cover={<img alt="example" src={ongoingContest.image_url} />}>
                    {/* <Image width={200} src={ongoingContest.image_url} preview={false} onClick={() => onContestClick(1)} /> */}
                    <Meta title={ongoingContest.name} />
                    {/* <Title level={5}>{ongoingContest.name}</Title> */}
                </Card>
            </div>
            <div>
                <Title level={4}>Past Contests</Title>
                <Row>
                    {
                        contests.map((contest) => {
                            return (
                                <div>
                                    <Card 
                                    hoverable
                                    style={{ width: 250 }}
                                    onClick={() => onContestClick(contest.id)}
                                    cover={<img alt="example" src={contest.image_url} />}>
                                        <Meta title={contest.name} />
                                    </Card>
                                </div>
                            )
                        })
                    }
                </Row>
            </div>
        </>
        
    )
}