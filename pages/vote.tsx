import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Spin, Col, Button, Row, Form, Input, Checkbox, Rate, Space, Tag, Divider, Typography, Image, Modal, Slider, List, Card } from "antd";
import { CheckCircleOutlined, GithubOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ethers } from "ethers";

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
      title: 'Pet Gato',
      src: "https://yssqxlnziqbocixqzokp.supabase.co/storage/v1/object/public/thumbnails/08.jpeg"
    },
    {
      title: 'Villain X',
      src: "https://yssqxlnziqbocixqzokp.supabase.co/storage/v1/object/public/thumbnails/09.jpeg"
    },
    {
      title: 'Super Power',
      src: "https://yssqxlnziqbocixqzokp.supabase.co/storage/v1/object/public/thumbnails/11.jpeg"
    },
    {
      title: 'Heroin',
      src: "https://yssqxlnziqbocixqzokp.supabase.co/storage/v1/object/public/thumbnails/12.jpeg"
    },
    {
      title: 'Abyss',
      src: "https://yssqxlnziqbocixqzokp.supabase.co/storage/v1/object/public/thumbnails/13.jpeg"
    },
    {
      title: 'Secret Power M',
      src: "https://yssqxlnziqbocixqzokp.supabase.co/storage/v1/object/public/thumbnails/14.jpeg"
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

export default function Vote() {

  const startPayment = async ({ setError, setTxs, ether, addr }) => {
    try {
      // @ts-ignore
      if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
      
      // @ts-ignore
      await window.ethereum.send("eth_requestAccounts");
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      });
      console.log({ ether, addr });
      console.log("tx", tx);
      setTxs([tx]);
    } catch (err) {
      setError(err.message);
    }
  };

  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (amount: number) => {
    await startPayment({
      setError,
      setTxs,
      ether: (amount * 0.000001).toString(),
      addr: "0xdd9DFB70C43A94B5Af845f737bEDE08e9bB231DE"
    });
    setIsVoteModalOpen(false);
  };


  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const showVoteModal = () => {
    setIsVoteModalOpen(true);
  }
  const handleVoteApply = (amount: number) => {
    //setIsVoteModalOpen();
    console.log("vote apply");
    handleSubmit(amount);
    // transferToken(1);
  }
  const handleVoteCancel = () => {
    setIsVoteModalOpen(false);
  }

  const [sendAmount, setSendAmount] = useState(30);

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
                src="https://yssqxlnziqbocixqzokp.supabase.co/storage/v1/object/public/thumbnails/15.jpeg"
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
                <Title level={2}>Paladin</Title>
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
                    <Modal title="Vote" open={isVoteModalOpen} onOk={() => {handleVoteApply(sendAmount)}} onCancel={handleVoteCancel}>
                        set amount you want to bet
                        <Slider defaultValue={30} value={sendAmount} onChange={setSendAmount} tooltip={{ /*modal close event => open to false*/open: true, placement:"bottom" }} />
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
                        <Link href="/"><Card title={<Image width={100} height={100} preview={false} src={item.src}/>}>{item.title}</Card></Link>
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
