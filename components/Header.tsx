import React, { useEffect } from "react";
import type { MenuProps } from "antd";
import { Menu, Row, Col, Typography, Avatar } from "antd";
import { globalState } from "@/lib/recoil/globalSession/atoms";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Header: React.FC = () => {
  const [global, setGlobal] = useRecoilState(globalState);
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoginScreen = router.asPath == "/login";

  useEffect(() => {
    if(router.asPath == "/home") {
      if(global.currentTab !== "home") {
        setGlobal({...global, ...{currentTab: "home"}})
      }
    } else if(router.asPath == "/about") {
      if(global.currentTab !== "about") {
        setGlobal({...global, ...{currentTab: "about"}})
      }
    } else if(router.asPath == "/contest") {
      if(global.currentTab !== "contest") {
        setGlobal({...global, ...{currentTab: "contest"}})
      }
    } else if(router.asPath == "/login") {
      if(global.currentTab !== "login") {
        setGlobal({...global, ...{currentTab: "login"}})
      }
    } else if (router.asPath == "profile") {
      if(global.currentTab !== "profile") {
        setGlobal({...global, ...{currentTab: "profile"}})
      }
    }
  })



  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key == global.currentTab) return;
    if (e.key == "home") {
      setGlobal({ ...global, ...{ currentTab: "home" } });
      router.push("/");
    } else if (e.key == "about") {
      setGlobal({ ...global, ...{ currentTab: "about" } });
      router.push("/about");
    } else if (e.key == "contest") {
      setGlobal({ ...global, ...{ currentTab: "contest" } });
      router.push("/contest");
    } else if (e.key == "login") {
      setGlobal({ ...global, ...{ currentTab: "login" } });
      router.push("/login");
    } else if (e.key == "logout") {
      setGlobal({ ...global, ...{ currentTab: "home" } });
      signOut();
    } else if (e.key == "profile") {
      setGlobal({ ...global, ...{ currentTab: "profile" } });
      router.push("/profile");
    }
  };

  return (
    <Row align="bottom" style={{ backgroundColor: "#FFFFFF"}}>
      <Col span={6} style={{ display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "center", backgroundColor: "#FFFFFF"}}>
        <Image
          width={68}
          height={44}
          src={"/Logo.svg"}
          alt="Picture of me"
        />
        <Typography.Title level={2} style={{ marginTop: 25 }}>
          NovelNet
        </Typography.Title>
      </Col>
      <Col span={isLoginScreen ? 18 : 12} style={{ backgroundColor:"#FFFFFF" }}>
        <Menu
          onClick={onClick}
          selectedKeys={[global.currentTab]}
          mode="horizontal"
        >
          <Menu.Item key="home">
            Home
          </Menu.Item>
          <Menu.Item key="about">
            About
          </Menu.Item>
          <Menu.Item key="contest">
            Contest
          </Menu.Item>
        </Menu>
      </Col>
      {!isLoginScreen && <Col span={6} style={{ backgroundColor:"#FFFFFF" }}>
        <Menu
          onClick={onClick}
          selectedKeys={[global.currentTab]}
          mode="horizontal"
        >
          {status == "authenticated" ? (
            <>
              <Menu.Item key="logout">
                Logout
              </Menu.Item>
              <Menu.Item key="profile" style={{float: "right"}}>
                <Avatar style={{ verticalAlign: 'middle', marginRight: "5px" }}>
                  {session?.user?.name?.charAt(0) || "U"}
                </Avatar>
                {session?.user?.name}
              </Menu.Item>
            </>
          ) : (
            <Menu.Item key="login">
              Login
            </Menu.Item>
          )}
        </Menu>
      </Col>}
    </Row>
  );
};

export default Header;
