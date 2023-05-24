import { fetchContests, fetchPosts } from '@/lib/apis';
import { Typography, Image, Layout, Row } from 'antd';
import { useEffect, useState } from 'react';

const { Title } = Typography;


export default function Contest() {
    const ongoingContestID = 1;
    const [contests, setContests] = useState<any>([]);
    const [ongoingContest, setOngoingContest] = useState<any>({
        "image_url": "",
        "name": ""
    });

    useEffect(() => {
        const loadData = async () => {
            const contests = await fetchContests();
            console.log(contests)
            setContests(contests);
        };
        loadData();
    }, []);

    useEffect(() => {
        contests.forEach((contest) => {
            if (contest.id === ongoingContestID) {
                setOngoingContest(contest)
                console.log(ongoingContest)
            }
        })
    }, [contests])

    return (
        <>
            <Title>Bi-Weekly NFT Contest</Title>
            <div>
                <Title level={4}>On-going Contest</Title>
                <div>
                    {/* <Image
                        width={200}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        preview={false}
                    />
                    <Typography>{"Ongoing"}</Typography> */}
                    <Image width={200} src={ongoingContest.image_url} preview={false} />
                    <Typography>{ongoingContest.name}</Typography>
                </div>
            </div>
            <div>
                <Title level={4}>Past Contests</Title>
                <Row>
                    {
                        contests.map((contest) => {
                            return (
                                <div>
                                    <Image width={200} src={contest.image_url} preview={false} />
                                    <Typography>{contest.name}</Typography>
                                </div>
                            )
                        })
                    }
                </Row>
            </div>
        </>
        
    )
}