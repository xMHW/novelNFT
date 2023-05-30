import { Typography, Button, Steps, Card, Image, Layout, Row, Avatar, List, Divider } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchContest } from '@/lib/apis';

const { Title } = Typography;

export default function Detail(){
    const description = 'This is a description.';
    const router = useRouter();
    const contestID = router.query.id;
    const [contest, setContest] = useState<any>();
    const [entryDur, setEntryDur] = useState<string>();
    const [votingDur, setVotingDur] = useState<string>();
    const [showcaseDur, setShowcaseDur] = useState<string>();

    const data = [
        {
            title: 'Step 1',
            description: 'Prepare your artwork: Ensure that your work is formatted and optimized appropriately for digital display. Consider the specifications and recommendations provided by the contest organizers for file size, dimensions, and format.',
        },
        {
            title: 'Step 2',
            description: 'Submit your entry: Follow the instructions provided on the contest website to submit your work. This may involve uploading the file, providing a description or artist statement, and any additional information as specified by the organizers.',
        },
        {
            title: 'Step 3',
            description: 'Promotion and sharing: If allowed or encouraged, promote your entry on social media platforms or other relevant channels using designated hashtags or contest tags. This can help increase visibility and engagement for your work.',
        },
        ]

    const loadContest = async () => {
        const contest = await fetchContest(contestID);
        setContest(contest[0]);
        setSchedule(contest[0].start_time, contest[0].end_time)
    };
    
    
      
      

    const setSchedule = (startTime: string, endTime: string) => {
        const formatDuration = (start, end) => {
            const formattedStart = start.toLocaleString("en-US", {month: "short", day: "2-digit", year: "numeric"})
            const formattedEnd = end.toLocaleString("en-US", {month: "short", day: "2-digit", year: "numeric"})
            const result = formattedStart + " ~ " + formattedEnd
            return result
        }
        const entryStart = new Date(startTime)
        const entryEnd = new Date(endTime)
        const votingStart = new Date(entryEnd.getFullYear(), entryEnd.getMonth(), entryEnd.getDate() + 1)
        const votingEnd = new Date(votingStart.getFullYear(), votingStart.getMonth(), votingStart.getDate() + 7)
        const showcaseStart = new Date(votingEnd.getFullYear(), votingEnd.getMonth(), votingEnd.getDate() + 1)
        const showcaseEnd = new Date(showcaseStart.getFullYear(), showcaseStart.getMonth(), showcaseStart.getDate() + 14)
        setEntryDur(formatDuration(entryStart, entryEnd))
        setVotingDur(formatDuration(votingStart, votingEnd))
        setShowcaseDur(formatDuration(showcaseStart, showcaseEnd))
    }

    useEffect(() => {
        if (contestID){
            loadContest();
        }
    }, [contestID])

    return(
        (contest) &&
        <>
            <Row>
                <Title level={2}>NovelNFT Contest</Title >
                {contest.id === 1 &&
                    <Button style={{ marginLeft: 30, marginTop: 30, background: "#3056D3", color: "white" }} onClick={() => router.push("/contest/entry")}>
                        Go to Enter
                    </Button>
                }
                <Button style={{ marginLeft: 10, marginTop: 30, background: "#212B36", color: "white"}} onClick={() => router.push("/contest/ongoing/submissions")}>
                    Submissions
                </Button>
                
            </Row>
            <div>
                <Title level={3}>Subject</Title >
                <Card style={{ width: 300 }}>
                    <Title style={{ marginBottom: 0, marginTop: 0}} level={5}>{contest.name}</Title>
                </Card>
            </div>
            <div>
                <Title level={3}>Winner Prize</Title >
                <Card style={{ width: 300 }}>
                    <Title style={{ marginBottom: 5, marginTop: 0}} level={5}>Showcase for 2 weeks</Title>
                    <Image
                        width={200}
                        src={"https://yssqxlnziqbocixqzokp.supabase.co/storage/v1/object/public/contest_submissions/troph.jpeg"}
                        preview={false}
                    />
                </Card>
            </div>
            <div>
                <Title level={3}>Schedule</Title >
                <Card style={{ width: 300 }}>
                    <Title style={{ marginBottom: 0, marginTop: 0}} level={5}>Entry</Title>
                    <p>{entryDur}</p>
                    <Title level={5}>Voting</Title>
                    <p>{votingDur}</p>
                    <Title level={5}>Showcase</Title>
                    <p>{showcaseDur}</p>
                </Card>
            </div>
            <div>
                <Title level={3}>How to Enter</Title >
                <Card style={{ width: 1000 }}>
                <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                    title={item.title}
                    description={item.description}
                    />
                </List.Item>
                )}
                />
                </Card>
            </div>
            <div>
                <Title level={3}>Qualifications</Title >
                <Card style={{ width: 1000 }}>
                    <Title style={{ marginBottom: 0, marginTop: 0}}  level={5}>1. Only community members</Title>
                    <p>Contestants must have tokens for this novel community can participate in.</p>
                    <Divider />
                    <Title style={{ marginBottom: 0, marginTop: 0}}  level={5}>2. Originality and authenticity</Title>
                    <p>Submissions must be original creations of the participant. Plagiarism or infringement of intellectual property rights will lead to disqualification. Ensure that your work does not include copyrighted or trademarked elements without proper authorization.</p>
                    <Divider />
                    <Title style={{ marginBottom: 0, marginTop: 0}}  level={5}>3. One entry per member</Title>
                    <p>Contestants can only submit one work.</p>
                    <Divider />
                    <Title style={{ marginBottom: 0, marginTop: 0}}  level={5}>4. Rights and permissions</Title>
                    <p>By submitting your work, you acknowledge that you hold the necessary rights and permissions for the artwork. This includes obtaining consent for the use of any recognizable individuals, copyrighted materials, or trademarks featured in your creation.</p>
                </Card>
            </div>
            
        </>
    )
}