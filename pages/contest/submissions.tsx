import { Row, Col, Image, Typography, Card } from 'antd';
import { useEffect, useState } from 'react';
import { fetchSubmissions } from '@/lib/apis';
import { useRouter } from 'next/router';
import { LikeFilled } from '@ant-design/icons';

const { Title } = Typography;
const { Meta } = Card;

const contestID = "1"

export default function Submissions(){
    const router = useRouter();
    const [chunks, setChunks] = useState<any>([]);
    const _chunks = []
    const loadSubmissions = async () => {
        const submissions = await fetchSubmissions(contestID);
        const chunkSize = 3;
        for (let i = 0; i < submissions.length; i += chunkSize) {
            console.log(i)
            const chunk = submissions.slice(i, i + chunkSize);
            console.log(chunk)
            _chunks.push(chunk)
            console.log(_chunks.length)
        }
        setChunks(_chunks)

    };

    useEffect(() => {
        loadSubmissions();
    }, [])

    return(
        <div>
            
            <Row>
                {chunks && chunks.map((chunk, index) => (
                    <Row key={index.toString()} justify="space-between" style={{marginBottom: 20}}>
                        {chunk.map((submission, index) => (
                            <>
                            <Col key={index.toString()} span={7}>
                                <Card
                                    onClick={() => router.push("/vote")}
                                    hoverable
                                    style={{ width: 300 }}
                                    cover={<img alt="example" src={submission.url} />}
                                >
                                    <div>
                                        {/* <div>{submission.id}</div> */}
                                        <Meta style={{marginBottom: 1}} title={submission.title} description={submission.author}/>
                                        <div>
                                            <LikeFilled style={{marginRight:3}} />
                                            {submission.likes} likes
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            {/* <Col span={1} ></Col> */}
                            </>
                            
                        ))}
                    </Row>
                ))}

            </Row>

        </div>
    )
}