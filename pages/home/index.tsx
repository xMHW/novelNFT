import { DollarOutlined, ShoppingCartOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Card, Col, List, Row, theme, Image, Badge, Typography, Avatar, Tag, Button, Space, Modal, Descriptions } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
const { Title, Text } = Typography;

const { Meta } = Card;
const { useToken } = theme;

interface NewsCardProps {
  title: string;
  date: string;
  imageLink: string;
  imageAlt: string;
  setOpen: (open: boolean) => void;
}

const NewsCard = (props: NewsCardProps): JSX.Element => {
  const { token } = useToken();
  const { title, date, imageLink, imageAlt, setOpen } = props;

  return (
    <Card
      hoverable
      style={{ width: 240, backgroundColor: token.colorPrimary }}
      cover={<img alt={imageAlt} src={imageLink} />}
      onClick={() => {setOpen(true)}}
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

interface HOFItem {
  title: string;
  thumbnailLink: string;
  type: string;
  rankData?: rankItem[];
}

interface rankItem {
  userName: string;
  avatarImg: string;
  tokenCount: number;
}

const HOFCard = (props: { item: HOFItem }): JSX.Element => {
  const { item } = props;
  const rankData: rankItem[] = item.rankData || [
    {
      userName: "User 1",
      avatarImg: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
      tokenCount: 100
    },
    {
      userName: "User 2",
      avatarImg: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
      tokenCount: 90
    },
    {
      userName: "User 3",
      avatarImg: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
      tokenCount: 80
    }
  ]
  return (
    (<Card
      style={{ width: 180 }}
      cover={
          (item.type === "token") ? 
          <List
            itemLayout="horizontal"
            dataSource={rankData}
            renderItem={(row, index) => (
              <List.Item >
                <List.Item.Meta
                  style={{ marginLeft: "15px" }}
                  avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                  title={row.userName}
                  description={row.tokenCount}
                />
              </List.Item>
          )}/> : <img alt={item.title} src={item.thumbnailLink} />
      }>
        <Meta title={item.title} />
      </Card>)
  )
}

interface VoteItem {
  title: string;
  thumbnailLink: string;
  firstLink: string;
  secondLink: string;
  thirdLink: string;
  status: string;
  detailLink: string;
}

const VoteCard = (props: { item: VoteItem }): JSX.Element => {
  const { item } = props;
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const clickHandler = () => {
    router.push(item.detailLink)
  }
  return (
    <List.Item>
      <Space>
        <Image
          preview={{ visible: false }}
          width={180}
          height={250}
          src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
          onClick={() => setVisible(true)}
        />
        <div style={{ display: 'none' }}>
          <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
            <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
            <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
            <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
          </Image.PreviewGroup>
        </div>
      </Space>
      <Space>
        <Button onClick={clickHandler}
                type="text"
                style={{ margin: 5, padding: 0 }}>
          Go to contest..
        </Button>
        {item.status == "ongoing"
          ? <Tag color="processing">Ongoing</Tag>
          : <Tag color="success">Finished</Tag>}
      </Space>
      <Title style={{marginTop: 0}} level={5}>{item.title}</Title>
    </List.Item>
  )
}

export default function Home() {
  const [open, setOpen] = useState(false);

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
  const dataVotes: VoteItem[] = [
    {
      title: "MC Skill Contest",
      thumbnailLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      firstLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      secondLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      thirdLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      status: "ongoing",
      detailLink: "/contest/1"
    },
    {
      title: "Official Illust Vote",
      thumbnailLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      firstLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      secondLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      thirdLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      status: "finished",
      detailLink: "/contest/2",
    },
    {
      title: "Villain X Fan Art Vote",
      thumbnailLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      firstLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      secondLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      thirdLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      status: "finished",
      detailLink: "/contest/3",
    }
  ]

  const dataHOF: HOFItem[] = [
    {
      title: "Token",
      thumbnailLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      type: "token"
    },
    {
      title: "Fan Art",
      thumbnailLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      type: "fanart"
    },
    {
      title: "Officials",
      thumbnailLink: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      type: "official"
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
              setOpen={setOpen}
            />
          </Col>
        ))}
      </Row>
      <Row style={{ marginTop: "40px" }} gutter={20}>
        <Col span={12}>
          <List
            header={
              <>
                <Title level={3} style={{ marginTop: 0 }}>Votes</Title>
                <Text>Vote for the best</Text>
              </>
            }
            split={false}
            grid={{ gutter: 16, column: 3 }}
            dataSource={dataVotes}
            renderItem={(item) => (
              <VoteCard item={item} />
              
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
                <HOFCard item={item} />
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
                onClick={() => {setOpen(true)}}
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
      <Modal
        title="Sample Blog Post"
        centered
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={1000}
      >
        <Descriptions title="Exciting New Episode Released: Uncover the Mysteries of 'Realm of Sorcery' in Chapter 50!" layout="vertical" bordered>
          <Descriptions.Item label="Created At" span={1}>2023-05-21 18:00:00</Descriptions.Item>
          <Descriptions.Item label="Author" span={1}>Aria Evergreen</Descriptions.Item>
          <Descriptions.Item label="Upvotes" span={1}>420</Descriptions.Item>
          <Descriptions.Item label="Content" span={3}>
            The highly anticipated Chapter 50 of the captivating fantasy webnovel, "Realm of Sorcery," has just been released, and readers are in for a treat!
            <br/>
            Dive deeper into the enchanting world of magic and adventure as our protagonist, Elysia, faces new challenges and unravels the secrets of an ancient prophecy.
            <br/>
            Prepare for thrilling twists, heart-pounding action, and unexpected alliances in this latest installment.
            <br/>
            Don't miss out on the excitement—read Chapter 50 now!
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  )
}
