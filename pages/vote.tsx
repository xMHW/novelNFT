import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Spin, Col, Button, Row, Form, Input, Checkbox, Rate, Space, Tag, Divider, Typography, Image, Modal, Slider, List, Card } from "antd";
import { CheckCircleOutlined, GithubOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

import Moralis from "moralis";
//import { MoralisNextApi } from "@moralisweb3/next";
//import { EvmChain } from "@moralisweb3/common-evm-utils";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yssqxlnziqbocixqzokp.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const { Title } = Typography;

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
  
  const similarContentData = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 5',
    },
    {
      title: 'Title 6',
    },
  ];
  
async function testMoralis() {
  try {
    await Moralis.start({
      apiKey: "X3gRyyfN0TpcIJe8pa9WcdU7SeHxxvB05zEETxWsCSB2nqCjp9k7ZJhRpIcWf2jL",
    });
    /*
    const response = await Moralis.EvmApi.token.getTokenAllowance({
      "chain": "0xaa36a7"
    });
    */
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      "chain": "0xaa36a7",
      "address": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
    });
    console.log("response");
    console.log(response.toJSON());
  } catch (e) {
    console.error(e);
  }
  
}


export default function Vote() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const showVoteModal = () => {
    setIsVoteModalOpen(true);
  }
  const handleVoteApply = () => {
    //setIsVoteModalOpen();
    console.log("vote apply");
  }
  const handleVoteCancel = () => {
    setIsVoteModalOpen(false);
  }

  useEffect(() => {
    testMoralis();
    if (status === "loading") {
      setLoading(true);
    } else if (status === "authenticated") {
      setLoading(false);
    } else {
      signIn();
    }
  }, [status]);

  useEffect(() => {testMoralis();}, []);

  return (
    status == "loading" ? <Spin/>
    : (
    <>
      <Row
        style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "middle",
        alignContent: "center",
        minHeight: "50vh",
      }}
      >
        <Col span={2}></Col>
        <Col span={6}>
            <Image
                width={300}
                height={300}
            />
        </Col>
        <Col span={12}>
            <Row
                style={{
                    display: "flex",
                    alignItems: "middle",
                    alignContent: "center",
                    minHeight: "6vh",
                }}
            >
                <Title level={2}>Title</Title>
            </Row>
            <Row>
                <Col span={5}><Rate disabled defaultValue={3} /></Col>
                <Col span={2}># star</Col>
                <Col span={1}><CheckCircleOutlined /></Col>
                <Col span={3}>In Contest</Col>
                <Col span={3}>Author</Col>
                <Col span={10}></Col>
            </Row>
            <br />
            <br />
            <Row>
                brief description
                
            </Row>
            <br />
            <br />
            <br />
            <Row>
                <Tag>
                    Tag 1
                </Tag>
            </Row>
            <br />
            <br />
            <Row>
                <Col span={18}>
                </Col>
                <Col span={6}>
                    <Button type="primary" onClick={showVoteModal}>
                        Vote
                    </Button>
                    <Modal title="Vote" open={isVoteModalOpen} onOk={handleVoteApply} onCancel={handleVoteCancel}>
                        set amount you want to bet
                        <Slider defaultValue={30} tooltip={{ /*modal close event => open to false*/open: true, placement:"bottom" }} />
                    </Modal>
                </Col>
            </Row>
            
        </Col>
        <Col span={2}></Col>
      </Row>
      <Row
        style={{
        display: "flex",
        justifyContent: "left",
        alignItems: "middle",
        alignContent: "left",
        minHeight: "100vh",
      }}
      >
        <Col span={3}></Col>
        <Col span={18}>
            <Row>
                <Col>
                    <Title level={3}>Description</Title>
                </Col>
            </Row>
            <Row>
                {/*For Description Content*/}
            </Row>
            <Row>
                <Col>
                    <Title level={3}>Related Materials</Title>
                </Col>
            </Row>
            <Row>
                <List
                    size="small"
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                />

            </Row>
            <Row>
                <Col>
                    <Title level={3}>Similar Contents</Title>
                </Col>
            </Row>
            <Row>
                <List
                    grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                    }}
                    dataSource={similarContentData}
                    renderItem={(item) => (
                    <List.Item>
                        <Link href="/"><Card title={<Image width={100} height={100} preview={false}/>}>{item.title}</Card></Link>
                    </List.Item>
                    )}
                />

            </Row>
        </Col>
        <Col span={3}></Col>
      </Row>
    </>
    )
  )
}
