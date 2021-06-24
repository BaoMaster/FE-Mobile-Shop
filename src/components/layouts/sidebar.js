import {
  LineChartOutlined,
  MailOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';

import logo from '../../image/shoplogo.png';

const { SubMenu } = Menu;

const SideNav = () => {
  const history = useHistory();

  const handleUserClick = () => {
    history.push('/admin/userlist');
  };

  const handleProductsClick = () => {
    history.push('/admin/productlist');
  };

  const handleRegisterClick = () => {
    history.push('/admin/orderlist');
  };
  const handleProductTypeClick = () => {
    history.push('/admin/product-type');
  };
  const handleRevenueClick = () => {
    history.push('/admin/revenue');
  };
  const handleMessageClick = () => {
    history.push('/admin/test-mess');
  };
  const handleMonthlyRevenue = () => {
    history.push('/admin/monthly-revenue');
  };
  const handleProductsOfYear = () => {
    history.push('/admin/product-of-year');
  };
  const handleProductsOfMonth = () => {
    history.push('/admin/product-of-month');
  };

  return (
    <div>
      <div
        style={{
          height: '50px',
          background: 'rgba(255, 255, 255, 0.2)',
          margin: '16px',
        }}
      >
        {/* <p style={{ color: 'white', fontSize: '18px', marginLeft: '50px', marginBottom: '0px' }}>CSA</p> */}
      </div>
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
        <Menu.Item key='1' onClick={handleUserClick}>
          <UnorderedListOutlined />
          <span> Users List</span>
        </Menu.Item>
        <Menu.Item key='2' onClick={handleProductsClick}>
          <UnorderedListOutlined />
          <span> Product List</span>
        </Menu.Item>

        <Menu.Item key='4' onClick={handleRegisterClick}>
          <UnorderedListOutlined />
          <span> Order List</span>
        </Menu.Item>
        <Menu.Item key='5' onClick={handleProductTypeClick}>
          <UnorderedListOutlined />
          <span> Product Type</span>
        </Menu.Item>

        <SubMenu key='6' icon={<LineChartOutlined />} title='Statistical'>
          <SubMenu key='6.1' icon={<LineChartOutlined />} title='Revenue'>
            <Menu.Item key='6.1.1' onClick={handleRevenueClick}>
              Annual Revenue
            </Menu.Item>
            <Menu.Item key='6.1.2' onClick={handleMonthlyRevenue}>
              Monthly Revenue
            </Menu.Item>
          </SubMenu>
          <SubMenu key='6.2' icon={<LineChartOutlined />} title='Product Rating'>
            <Menu.Item key='6.2.1' onClick={handleProductsOfYear}>
              Products of year
            </Menu.Item>
            <Menu.Item key='6.2.2' onClick={handleProductsOfMonth}>
              Products of month
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        {/* <Menu.Item key='7' onClick={handleMessageClick}>
          <LineChartOutlined />
          <span> Message</span>
        </Menu.Item> */}
      </Menu>
    </div>
  );
};

export default SideNav;
