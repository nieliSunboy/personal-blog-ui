import React, { useEffect, useState } from 'react';
import { Menu} from 'antd';
import { getNavList } from '~/utils';
import { UserStore } from '~/store/userStore'
import { observer } from "mobx-react";


const HeaderNav: React.FC<{
    userStore: UserStore
}> = ({ userStore }) => {
    const [navs, setNavs] = useState([]);
    const defaultSelected: string = userStore.getDefaultNavRouter;
    useEffect(() => {
        const navs = getNavList().map((nav: any) => {
            return {
                key: nav?.path,
                label: nav?.title
            }
        });
        setNavs(navs);
    }, [])

    const navMenuClick = (v: any) => {
        userStore.NavRouter = v?.key;
        console.log('store-user', userStore.NavRouter)
    }
    return (
        <Menu theme="dark" mode="horizontal" onClick={navMenuClick} defaultSelectedKeys={[defaultSelected]} items={navs} />
    )
}

export default observer(HeaderNav);