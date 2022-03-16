import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Layout, Menu, Input, Button } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_USER_REQUEST, logoutRequestAction } from '../reducers/user';

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

const AppLayout = ({ children }) => {
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
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']}>
            {me !== null ? (
              <>
                <Menu.Item key="0">
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
                <Menu.Item key="2">
                  <Link href="/community">
                    <a>커뮤니티</a>
                  </Link>
                </Menu.Item>
              </>
            )}
            <Menu.Item key="5">
              <SearchInput enterButton placeholder='영화 검색'/>
            </Menu.Item>
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
