import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Layout, Menu, Input, Button, Dropdown, message } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_USER_REQUEST, logoutRequestAction } from '../reducers/user';
import { DownOutlined, UserOutlined, HeartOutlined, LogoutOutlined } from '@ant-design/icons';
import jwt_decode from 'jwt-decode';
import Router from 'next/router';

const { Header, Content, Footer } = Layout;

const StyledLayout = styled(Layout)`
  .ant-menu.ant-menu-dark 
  .ant-menu-item-selected, 
  .ant-menu-submenu-popup.ant-menu-dark 
  .ant-menu-item-selected {
    background: #2CD4AC;
  }
  .ant-menu-dark.ant-menu-horizontal >
  .ant-menu-item:hover {
    background: #2CD4AC;
  }
`

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
  .ant-btn-primary {
    background: #2CD4AC;
    border-color: #2CD4AC;
  }
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

const UserButton = styled(Button)`
.ant-click-animating-node {
  display: none;
}
`


const AppLayout = ({ children }) => {
  const logout = () => {
    console.log(dispatch(logoutRequestAction()));
    Router.push("/")
  }

  const menu = (
    <Menu>
      <Menu.Item key="7" icon={<UserOutlined />} onClick={() => {Router.push("/profile")}}>
        프로필
      </Menu.Item>
      <Menu.Item key="8" icon={<HeartOutlined />}>
        좋아요한 영화
      </Menu.Item>
      <Menu.Item key="9" icon={<LogoutOutlined />} onClick={logout}>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  const [user, setUser] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('JWT token'));
  }, []);
  useEffect(() => {
    if (token) {
      setUser(jwt_decode(token));
      console.log(jwt_decode(token))
    }
  }, [token]);

  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
  }, [LOAD_USER_REQUEST]);

  return (
    <div>
      <StyledLayout className="layout">
        <Header>
          <Link href="/">
            <MovingLogo src="/img/logo-colored.png" />
          </Link>
          {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']}> */}
          <Menu theme="dark" mode="horizontal">
            {me !== null ? (
              <>
                {/* <Menu.Item key="0">
                  <Link href="/">
                    <a
                      onClick={() => {
                        console.log(dispatch(logoutRequestAction()));
                      }}
                    >
                      로그아웃
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="1">
                  <Link href="/profile">
                    <a>회원정보</a>
                  </Link>
                </Menu.Item> */}
                <Menu.Item key="0">
                  <Link href="/community">
                    <a>커뮤니티</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="1">
                  <SearchInput enterButton placeholder='영화 검색'/>
                </Menu.Item>
                <Menu.Item key="2">
                  <Dropdown overlay={menu}>
                    <Button style={{background:'#2CD4AC', color:'white'}}>
                      { user.username } <UserOutlined />
                    </Button>
                  </Dropdown>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="3">
                  <Link href="/login">
                    <a>로그인</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link href="/signup">
                    <a>회원가입</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link href="/community">
                    <a>커뮤니티</a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <SearchInput enterButton placeholder='영화 검색'/>
                </Menu.Item>
              </>
            )}
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <SiteLayoutContent>{children}</SiteLayoutContent>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </StyledLayout>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
