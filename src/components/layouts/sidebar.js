import {
  UnorderedListOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useHistory } from "react-router";

import logo from "../../image/shoplogo.png";

const { SubMenu } = Menu;

const SideNav = () => {
  const history = useHistory();

  const handleUserClick = () => {
    history.push("/admin/userlist");
  };

  const handleProductsClick = () => {
    history.push("/admin/productlist");
  };

  const handleRegisterClick = () => {
    history.push("/admin/orderlist");
  };
  const handleProductTypeClick = () => {
    history.push("/admin/product-type");
  };

  return (
    <div>
      <div
        style={{
          height: "32px",
          background: "rgba(255, 255, 255, 0.2)",
          margin: "16px",
        }}
      >
        <p style={{ color: "white", fontSize: "18px", marginLeft: "25px" }}>
          Shop
        </p>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" onClick={handleUserClick}>
          <UnorderedListOutlined />
          <span> Users List</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={handleProductsClick}>
          <UnorderedListOutlined />
          <span> Product List</span>
        </Menu.Item>
        {/* <Menu.Item key="3" onClick={handleFileClick}>
                    <UploadOutlined />
                    <span> Files</span>
                </Menu.Item> */}
        <Menu.Item key="4" onClick={handleRegisterClick}>
          <UnorderedListOutlined />
          <span> Order List</span>
        </Menu.Item>
        <Menu.Item key="5" onClick={handleProductTypeClick}>
          <UnorderedListOutlined />
          <span> Product Type</span>
        </Menu.Item>

        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default SideNav;
