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
  Modal,
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
import SearchInput from './SearchInput';
import LoginForm from './LoginForm';

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
          Router.push('/profile/');
        }}
      >
        프로필
      </Menu.Item>
      <Menu.Item
        key="8"
        icon={<HeartOutlined />}
        onClick={() => {
          Router.push('/scrap');
        }}
      >
        스크랩한 영화
      </Menu.Item>
      <Menu.Item key="9" icon={<LogoutOutlined />} onClick={logout}>
        로그아웃
      </Menu.Item>
    </Menu>
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const id = sessionStorage.getItem('id');
    if (id !== null) dispatch(loaduserRequestAction(id));
  }, []);

  useEffect(() => {
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
                <Menu.Item key="community">
                  <Link href="/community">
                    <a>커뮤니티</a>
                  </Link>
                </Menu.Item>
              </Menu>
            </Col>
            <Col span={8} offset={8} style={{ color: 'white' }}>
              <Menu theme="dark" mode="horizontal">
                <Menu.Item key="search">
                  <SearchInput enterButton placeholder="영화 검색" />
                </Menu.Item>
                {me ? (
                  <>
                    <Menu.Item key="dropdown">
                      <Dropdown overlay={menu}>
                        <div>
                          {userInfo !== null && (
                            <img
                              style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                marginRight: '10px',
                              }}
                              src={userInfo.picture || '/img/뚜잇.jpg'}
                            />
                          )}
                          <span style={{ fontSize: '15px' }}>
                            {userInfo !== null && userInfo.username2}
                          </span>
                        </div>
                      </Dropdown>
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item key="login">
                      <div onClick={showModal}>로그인</div>
                    </Menu.Item>
                    <Menu.Item key="signup">
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
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <LoginForm setIsModalVisible={setIsModalVisible} />
      </Modal>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
