import { message, Upload, Typography, Menu, Button, Form, Input } from 'antd';
import type { MenuProps } from "antd";
import { useState } from 'react';
import Submissions from '../submissions';
import Detail from '../detail';
import Result from './result';


export default function Past(){
    const [selectedTab, setSelectedTab] = useState<string>("results")

    const onClick: MenuProps["onClick"] = (e) => {
        setSelectedTab(e.key)
      };

    return(
        <div>
            <div>
                <div>
                <Menu
                onClick={onClick}
                selectedKeys={[selectedTab]}
                mode="horizontal"
                theme="dark"
                >
                <Menu.Item key="results">
                    Results
                </Menu.Item>
                <Menu.Item key="submissions">
                    Submissions
                </Menu.Item>
                <Menu.Item key="details">
                    Contest Details
                </Menu.Item>
                </Menu>
                    {/* <Button onClick={() => setSelectedTab("results")} >Results</Button>
                    <Button onClick={() => setSelectedTab("submissions")}>Submissions</Button>
                    <Button onClick={() => setSelectedTab("details")}>Contest Details</Button> */}
                </div>
                {
                    (selectedTab === "results") 
                    ? <Result /> : (selectedTab === "submissions")
                    ? <Submissions /> : (selectedTab === "details")
                    ? <Detail /> : <div>Error</div>
                }
            </div>
        </div>
    )
}