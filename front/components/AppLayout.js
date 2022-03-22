import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Layout,
  Menu,
  Input,
  Button,
  Dropdown,
  message,
  Row,
  Col,
  Divider,
} from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  loaduserRequestAction,
  LOAD_USER_REQUEST,
  logoutRequestAction,
} from '../reducers/user';
import {
  DownOutlined,
  UserOutlined,
  HeartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import jwt_decode from 'jwt-decode';
import Router from 'next/router';

const { Header, Content, Footer } = Layout;

const StyledLayout = styled(Layout)`
  .ant-menu.ant-menu-dark .ant-menu-item-selected,
  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    background: #2cd4ac;
  }
  .ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover {
    background: #2cd4ac;
  }
`;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
  .ant-btn-primary {
    background: #2cd4ac;
    border-color: #2cd4ac;
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
`;

const AppLayout = ({ children }) => {
  const logout = () => {
    console.log(dispatch(logoutRequestAction()));
    Router.push('/');
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="7"
        icon={<UserOutlined />}
        onClick={() => {
          Router.push('/profile');
        }}
      >
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

  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const id = sessionStorage.getItem('id');
    if (id !== null) dispatch(loaduserRequestAction(id));
  }, []);

  useEffect(() => {
    console.log(('me', me));
    if (me) {
      if (me.data) {
        setUserInfo(me.data);
      }
    }
  }, [me]);

  return (
    <div>
      <StyledLayout className="layout">
        <Header>
          <Row>
            <Col span={8} style={{ color: 'white' }}>
              <Link href="/">
                <MovingLogo src="/img/logo-colored.png" />
              </Link>
              <Menu theme="dark" mode="horizontal">
                <Menu.Item key="0">
                  <Link href="/community">
                    <a>커뮤니티</a>
                  </Link>
                </Menu.Item>
              </Menu>
            </Col>
            <Col span={8} offset={8} style={{ color: 'white' }}>
              <Menu theme="dark" mode="horizontal">
                <Menu.Item key="3">
                  <SearchInput enterButton placeholder="영화 검색" />
                </Menu.Item>
                {me ? (
                  <>
                    <Menu.Item key="2">
                      <Dropdown overlay={menu}>
                        <Button
                          style={{ background: '#2CD4AC', color: 'white' }}
                        >
                          {userInfo !== null && userInfo.username}
                          <UserOutlined />
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
                  </>
                )}
              </Menu>
            </Col>
          </Row>
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
