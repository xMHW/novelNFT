import { Typography, Image, Layout, Row } from 'antd';

const { Title } = Typography;

const contests=[
    {
        "title": "title",
        "author": "author",
        "image_url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        "title": "title",
        "author": "author",
        "image_url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        "title": "title",
        "author": "author",
        "image_url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        "title": "title",
        "author": "author",
        "image_url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        "title": "title",
        "author": "author",
        "image_url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
    {
        "title": "title",
        "author": "author",
        "image_url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    },
]

export default function Contest() {
    return (
        <>
            <Title>Bi-Weekly NFT Contest</Title>
            <div>
                <Title level={4}>On-going Contest</Title>
                <Image
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    preview={false}
                />
            </div>
            <div>
                <Title level={4}>Past Contests</Title>
                <Layout>
                    {
                        contests.map((contest) => {
                            return (
                                <>
                                    <Image width={200} src={contest.image_url} preview={false} />
                                    <Typography>{contest.title}</Typography>
                                    <Typography>{contest.author}</Typography>
                                </>
                            )
                        })
                    }
                </Layout>
            </div>
        </>
        
    )
}