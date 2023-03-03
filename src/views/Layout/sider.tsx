import React, { useEffect, useState } from "react";
import { Layout, Menu } from 'antd';
import { UserStore } from "~/store/userStore";
import { observer } from "mobx-react";
import { getSiderMunes } from '~/utils';
import { NotificationOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const LayoutSider: React.FC<{
    colorBgContainer?: any,
	userStore: UserStore
}> = ({ colorBgContainer, userStore }) => {

		const [ menu, setMenu ] = useState([]);
		const [ hidden, setHidden ] = useState(false);
		const routerNavigate = useNavigate();

		useEffect(() => {
			getSiderMunes()
			const muenus: [] = getSiderMunes().map((v: any) => {
				return {
					key: v?.path,
					icon: React.createElement(NotificationOutlined),
					label: v?.title,
				}
			})
			setHidden(muenus && muenus.length > 0);
			setMenu(muenus);
		}, [userStore.navRouter]);

		const meunClick = (route: any) => {
			routerNavigate(route?.key)
		}
		
    return (<>
	{ hidden && <Sider 
			width={200}
			style={{
				background: colorBgContainer,
			}}>
				<Menu
					mode="inline"
					defaultSelectedKeys={['1']}
					defaultOpenKeys={['sub1']}
					onClick={meunClick}
					style={{
							height: '100%',
							borderRight: 0,
					}}
					items={menu}
				/>
			</Sider> }
	</>)
}

export default observer(LayoutSider)