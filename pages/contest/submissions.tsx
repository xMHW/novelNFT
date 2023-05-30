import { Row, Col, Image, Typography, Card } from 'antd';
import { use, useEffect, useState } from 'react';
import { fetchSubmissions } from '@/lib/apis';

const { Title } = Typography;
const { Meta } = Card;

const contestID = "1"

export default function Submissions(){
    const gutter = 1;
    const vgutter = 1;
    const [cols, setCols] = useState<any>([]);
    const [submissions, setSubmissions] = useState<any>();
    const [chunks, setChunks] = useState<any>([]);
    const _chunks = []
    const loadSubmissions = async () => {
        const submissions = await fetchSubmissions(contestID);
        // setSubmissions(submissions);
        const chunkSize = 3;
        for (let i = 0; i < submissions.length; i += chunkSize) {
            console.log(i)
            const chunk = submissions.slice(i, i + chunkSize);
            console.log(chunk)
            // setChunks([...chunks, chunk]);
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
            
            <Row >
                {chunks && chunks.map((chunk, index) => (
                    <Row key={index.toString()}>
                        {chunk.map((submission, index) => (
                            <>
                            <Col key={index.toString()} span={1 / chunk.length}>
                                <Card
                                    hoverable
                                    style={{ width: 300 }}
                                    cover={<img alt="example" src={submission.url} />}
                                >
                                    <div>
                                        {/* <div>{submission.id}</div> */}
                                        <Meta title={submission.title} description={submission.author} />
                                        <div>{submission.likes} likes</div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={1} ></Col>
                            </>
                            
                        ))}
                    </Row>
                ))}

            </Row>

        </div>
    )
}