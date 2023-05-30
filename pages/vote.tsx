import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Spin, Col, Button, Row, Form, Input, Checkbox, Rate, Space, Tag, Divider, Typography, Image, Modal, Slider, List, Card } from "antd";
import { CheckCircleOutlined, GithubOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

import Moralis from "moralis";
import { MoralisNextApi } from "@moralisweb3/next";
//import { EvmChain } from "@moralisweb3/common-evm-utils";

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
  
async function checkTokenBalance() {
  try {
    await Moralis.start({
      apiKey: "X3gRyyfN0TpcIJe8pa9WcdU7SeHxxvB05zEETxWsCSB2nqCjp9k7ZJhRpIcWf2jL",
    });
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      "chain": "0xaa36a7",
      "address": "0x608F5346A55215E1054Ef93969e004Ac15c7a255"
    });
    console.log("response");
    const resultJSON = response.toJSON();
    console.log(resultJSON);
    let flag = false;
    for(let i = 0;i < resultJSON.length;i++) {
      if(resultJSON[i]["token_address"] == "0xb510a7c888095068f1ddd8563ef34981b1eb5c72") {
        console.log(resultJSON[i]["balance"]); ///////// handle balance
        flag = true;
      }
    }
    if(!flag) {
      console.log("no balance");
    }
  } catch (e) {
    console.error(e);
  }
}

async function transferToken(amount: number) {
  try {
    const response = await Moralis.EvmApi.token.getWalletTokenTransfers({ // it get transfer list of wallet
      //"address": "0x608F5346A55215E1054Ef93969e004Ac15c7a255",
      "address": "0xdd9DFB70C43A94B5Af845f737bEDE08e9bB231DE",
      "chain": "0xaa36a7"
    });
    /*
    const response22 = await Moralis.EvmApi.token.getErc20Transfers({
      "address": "0x608F5346A55215E1054Ef93969e004Ac15c7a255",
      "chain": "0xaa36a7"
    });
    */
    console.log("response");
    const resultJSON = response.toJSON();
    console.log(resultJSON);

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
    transferToken(1);
  }
  const handleVoteCancel = () => {
    setIsVoteModalOpen(false);
  }

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else if (status === "authenticated") {
      setLoading(false);
    } else {
      signIn();
    }
  }, [status]);

  useEffect(() => {checkTokenBalance();}, []);

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
                    <Button style={{ background: "#3056D3", color: "white" }} type="primary" onClick={showVoteModal}>
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
