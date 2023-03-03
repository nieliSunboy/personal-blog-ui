import React from 'react'
import { Breadcrumb, Layout, theme } from 'antd';

import LayoutSider from './sider';
import HeaderNav from './headerNav';
import { userStore } from '~/store/userStore';

const { Header, Content } = Layout;

interface LayoutProps {
    children?: React.ReactNode
}

const LayoutRouter: React.FC<LayoutProps> = ({children}) => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();

    return (
    <Layout>
      <Header className="header">
        <HeaderNav userStore={userStore}></HeaderNav>
      </Header>

      <Layout>
        <LayoutSider userStore={userStore} ></LayoutSider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
    )
}

export default LayoutRouter;