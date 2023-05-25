import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Spin, Button, Row, Form, Input, Checkbox } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";

export default function Login() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status == "authenticated") {
      router.push("/");
    }
  }, [status]);
  const [loading, setLoading] = useState(false);

  const handleMetaMaskAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    const { message } = await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    });

    const signature = await signMessageAsync({ message });
    console.log(signature);

    const { url } = await signIn("moralis-auth", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/home",
    });
    router.push(url);
  };

  return (
    status == "loading" ? <Spin/>
    : (
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "middle",
          alignContent: "center",
          minHeight: "100vh",
        }}
      >
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input disabled={true}/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password disabled={true}/>
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox disabled={true}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={true}>
              Submit
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              icon={<GithubOutlined />}
              size="middle"
              style={{ backgroundColor: "#3056D3" }}
              disabled={loading}
              onClick={() => {
                setLoading(true);
                signIn("github");
              }}
              >
              Login with Github
              {loading && <Spin />}
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              style={{ backgroundColor: "#FCA564" }}
              size="middle"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                handleMetaMaskAuth();
              }}
              >
              Login with MetaMask
              {loading && <Spin />}
            </Button>
          </Form.Item>
        </Form>
      </Row>
    )
  )
}
