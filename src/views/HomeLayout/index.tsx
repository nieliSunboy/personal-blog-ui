import React from 'react'
import { Layout, theme } from 'antd';
import HomeHeader from './header'
import { userStore } from '~/store/userStore';

const { Header, Content } = Layout;


const HomeLayout: React.FC<{
    children?: React.ReactNode
}> = ({children}) => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();

    return (
        <Layout>
            <Header className="header">
                <HomeHeader userStore={userStore}></HomeHeader>
            </Header>

            <Content
                style={{
                    padding: 40,
                    margin: 0,
                    flex: "1 1 0",
                    display: 'flex',
                    justifyContent: 'center',
                    background: colorBgContainer,
                }}
            >
                {children}
            </Content>
        </Layout>
    )
}

export default HomeLayout;