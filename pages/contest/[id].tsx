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
    const [entryDur, setEntryDur] = useState<string>();
    const [votingDur, setVotingDur] = useState<string>();
    const [showcaseDur, setShowcaseDur] = useState<string>();

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
            <div>
                <Button type="primary" onClick={() => router.push("/contest/entry")}>
                    Go to Enter
                </Button>
                <Button type="primary" onClick={() => router.push("/contest/ongoing/submissions")}>
                    Submissions
                </Button>
            </div>
            <div>
                <Title level={3}>Subject</Title >
                <Card style={{ width: 300 }}>
                    <p>{contest.name}</p>
                </Card>
            </div>
            <div>
                <Title level={3}>Winner Prize</Title >
                <Card style={{ width: 300 }}>
                    <p>Showcase for 2 weeks</p>
                    <Image
                        width={200}
                        src={contest.image_url}
                        preview={false}
                    />
                </Card>
            </div>
            <div>
                <Title level={3}>Schedule</Title >
                <Card style={{ width: 300 }}>
                    <Title level={5}>Entry</Title>
                    <p>{entryDur}</p>
                    <Title level={5}>Voting</Title>
                    <p>{votingDur}</p>
                    <Title level={5}>Showcase</Title>
                    <p>{showcaseDur}</p>
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
                    ]}
                />
            </div>
            <div>
                <Title level={3}>Qualifications</Title >
                <Card style={{ width: 300 }}>
                    <p>Only community members: Contestants must have tokens for this novel community can participate in.</p>
                    <p>Originality and authenticity: Submissions must be original creations of the participant. Plagiarism or infringement of intellectual property rights will lead to disqualification. Ensure that your work does not include copyrighted or trademarked elements without proper authorization.</p>
                    <p>One entry per member: Contestants can only submit one work.</p>
                    <p>Rights and permissions: By submitting your work, you acknowledge that you hold the necessary rights and permissions for the artwork. This includes obtaining consent for the use of any recognizable individuals, copyrighted materials, or trademarks featured in your creation.</p>
                </Card>
            </div>
        </>
    )
}