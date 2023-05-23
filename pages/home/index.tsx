import { DollarOutlined, ShoppingCartOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Card, Col, List, Row, theme, Image, Badge, Typography } from "antd";
const { Title, Text } = Typography;

const { Meta } = Card;
const { useToken } = theme;

interface NewsCardProps {
  title: string;
  date: string;
  imageLink: string;
  imageAlt: string;
}

const NewsCard = (props: NewsCardProps): JSX.Element => {
  const { token } = useToken();
  const { title, date, imageLink, imageAlt } = props;

  return (
    <Card
      hoverable
      style={{ width: 240, backgroundColor: token.colorPrimary }}
      cover={<img alt={imageAlt} src={imageLink} />}
    >
      <Meta title={title} description={date} />
    </Card>
  )
}

const CategoryBadge = (props: { category: string }): JSX.Element => {
  const { category } = props;
  const colorMapping = new Map<string, string[]>([
    ["News", ["#D7F8E4", "#326D52"]],
    ["Discussion", ["#FCF3CB", "#9F531F"]],
    ["Question", ["#D7F8E4", "#326D52"]],
  ])
  const backgroundColor = colorMapping.get(category)[0];
  const fontColor = colorMapping.get(category)[1];

  return (
    <Badge style={{ color: fontColor }} count={category} color={backgroundColor} />
  )
}

export default function Home() {
  const { token } = useToken();

  const newsData = [
    {
      title: "Chapter #22",
      date: "Yesterday",
      imageLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      imageAlt: "Chapter #22"
    },
    {
      title: "Chapter #21",
      date: "2 days ago",
      imageLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      imageAlt: "Chapter #21"
    },
    {
      title: "Writer's Comment",
      date: "5 days ago",
      imageLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      imageAlt: "Writer's Comment"
    },
    {
      title: "Community Open",
      date: "8 days ago",
      imageLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      imageAlt: "Community Open"
    }
  ]
  const dataMostUpvoted = [
    {
      title: "MC got a new skill",
      author: "Author",
      category: "News",
      upvoteCount: 400
    },
    {
      title: "7 reasons why X is villain",
      author: "Author",
      category: "Discussion",
      upvoteCount: 264
    },
    {
      title: "Help me to remember the chapter",
      author: "Author",
      category: "Question",
      upvoteCount: 87
    }
  ]
  const dataVotes = [
    {
      title: "MC Skill Contest",
      thumbnailLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Official Illust Vote",
      thumbnailLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Villain X Fan Art Vote",
      thumbnailLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    }
  ]
  const dataHOF = [
    {
      title: "Token",
      thumbnailLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Fan Art",
      thumbnailLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Officials",
      thumbnailLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    }
  ]
  return (
    <>
      <Row>
        {newsData.map((news) => (
          <Col span={6}>
            <NewsCard
              title={news.title}
              date={news.date}
              imageLink={news.imageLink}
              imageAlt={news.imageAlt}
            />
          </Col>
        ))}
      </Row>
      <Row style={{ marginTop: "40px" }} gutter={10}>
        <Col span={12}>
          <List
            header={
              <>
                <Title level={3}>Votes</Title>
                <Text>Vote for the best</Text>
              </>
            }
            split={false}
            grid={{ gutter: 16, column: 3 }}
            dataSource={dataVotes}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.title}>Card content</Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <List
            header={
              <>
                <Title level={3}>Hall of Fame</Title>
                <Text>Honored Things</Text>
              </>
            }
            split={false}
            grid={{ gutter: 16, column: 3 }}
            dataSource={dataHOF}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.title}>Card content</Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "40px" }}>
        <Col span={24}>
          <List
            style={{
              backgroundColor: "#FFFFFF",
            }}
            itemLayout="vertical"
            size="large"
            bordered
            header={
              <Title level={3}>Most Upvoted</Title>
            }
            split={false}
            dataSource={dataMostUpvoted}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
              >
                <List.Item.Meta
                  style={{ width: "420px", maxWidth: "420px" }}
                  avatar={<Image width={68} 
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                          />}
                  title={<a>{item.title}</a>}
                  description={item.author}
                />
                <CategoryBadge category={item.category}/>
                <Title level={4}>+{item.upvoteCount}</Title>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "40px" }} gutter={10}>
        <Col span={8}>
          <Card>
            <Meta
              avatar={<DollarOutlined style={{ fontSize: "56px", color: "#3056D3" }}/>}
              title="#81"
              description="Rank of the week"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Meta
              avatar={<UsergroupAddOutlined style={{ fontSize: "56px", color: "13C296" }} />}
              title="583"
              description="New Memebers"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Meta
              avatar={<ShoppingCartOutlined style={{ fontSize: "56px", color: "#00C3F9" }}/>}
              title="1289"
              description="New Arts"
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
