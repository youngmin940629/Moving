import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Layout, Menu, Breadcrumb, Input } from 'antd';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;

const SiteLayoutContent = styled.div`
  min-height: 280px;
  padding: 24px;
  background: #fff;
`;

const MovingLogo = styled.img`
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  cursor: pointer;
`;

const AppLayout = ({ children }) => {
  return (
    <div>
      <Layout className="layout">
        <Header>
          <Link href="/">
            <MovingLogo src="/img/moving.png" />
          </Link>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item>
              <Link href="/login">
                <a>로그인</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/#">
                <a>로그아웃</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/signup">
                <a>회원가입</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/community">
                <a>커뮤니티</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <SiteLayoutContent>{children}</SiteLayoutContent>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
