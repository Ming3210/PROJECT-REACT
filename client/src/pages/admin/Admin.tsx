import React, { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCartPlus, FaUsers, FaVanShuttle } from "react-icons/fa6";
import "../../styles/admin.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { SiProducthunt } from "react-icons/si";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";

const { Header, Sider, Content } = Layout;
export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("");
  // }, []);

  return (
    <Layout className="">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="flex justify-center my-[30px]">
          <div className="demo-logo-vertical rounded-md flex justify-center items-center bg-white h-[50px] w-[80%]">
            <div className="flex justify-center items-center ">
              <FaVanShuttle size={25} />
              <p className="">
                <span className="font-bold text-red-600">RESCUE</span>
                <span className="font-bold text-sky-400">-ACE</span>
              </p>
              {/* <div className="w-[100%] h-[50px] flex justify-content-center items-center bg-white"></div> */}
            </div>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          defaultValue={["Dashboard"]}
          onClick={({ key }: any) => {
            if (key === "logout") {
              setTimeout(() => {
                navigate("/");
              }, 1000);
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <LuLayoutDashboard />,
              label: "Dashboard",
            },
            {
              key: "customer",
              icon: <FaUsers />,
              label: "Customer Management",
              children: [
                {
                  key: "check-user",
                  label: "All customer",
                  icon: <UploadOutlined />,
                },
                {
                  key: "add-user",
                  label: "Add customer",
                  icon: <IoAdd />,
                },
              ],
            },
            {
              key: "product",
              icon: <SiProducthunt />,
              label: "Product Management",
              children: [
                {
                  key: "add-product",
                  label: "Add new product",
                  icon: <UploadOutlined />,
                },
                {
                  key: "check-product",
                  label: "All product",
                  icon: <UploadOutlined />,
                },
                {
                  key: "add-category",
                  label: "Add new category",
                  icon: <UploadOutlined />,
                },
                {
                  key: "all-category",
                  label: "All category",
                  icon: <UploadOutlined />,
                },
              ],
            },
            {
              key: "cart",
              icon: <FaCartPlus />,
              label: "Cart Management",
            },
            {
              key: "logout",
              icon: <BiLogOut />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
}
