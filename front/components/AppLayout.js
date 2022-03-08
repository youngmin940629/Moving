import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Layout, Menu, Input } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../reducers';

const { Header, Content, Footer } = Layout;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

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
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <div>
      <Layout className="layout">
        <Header>
          <Link href="/">
            <MovingLogo src="/img/moving.png" />
          </Link>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']}>
            {isLoggedIn ? (
              <>
                <Menu.Item key="0">
                  <Link href="/">
                    <a
                      onClick={() => {
                        dispatch(logoutAction());
                      }}
                    >
                      로그아웃
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="1">
                  <Link href="/profile">
                    <a>프로필</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link href="/community">
                    <a>커뮤니티</a>
                  </Link>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="0">
                  <Link href="/login">
                    <a>로그인</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="1">
                  <Link href="/signup">
                    <a>회원가입</a>
                  </Link>
                </Menu.Item>
              </>
            )}
            <Menu.Item key="5">
              <SearchInput enterButton />
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
