import React, { useState } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Alert, Space } from 'antd';
import { myAxios } from "~/utils/axios";
import { setCookies, setToken } from "~/utils/anth";
import { LoginApi } from '~/api/index';
import { useNavigate } from 'react-router-dom'


export const LoginForm: React.FC = () => {

	const routerNavigate = useNavigate();
	const [alerterr, setAlerterr] = useState('');

	const onFinish = (values: any) => {
		myAxios.post(LoginApi.login, {
			userName: values.username,
			password: values.password
		}).then(res => {
			const resTap = JSON.parse(JSON.stringify(res));
			if (!resTap.data) {
				const msg: string = resTap?.msg;
				setAlerterr(msg);
				return
			} else {
				setAlerterr('');
			}
			setToken(resTap.data);
			setCookies('refresh_token', resTap.data);
			routerNavigate('/system/home');
		})

	};

	return (
		<div className="login-box">
			<fieldset className="login-contain">
				<legend className="legend">用户登录</legend>
				<Form
					name="normal_login"
					className="login-form"
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Form.Item
						name="username"
						rules={[{ required: true, message: 'Please input your Username!' }]}
					>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Please input your Password!' }]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item>
						<Form.Item name="remember" valuePropName="checked" noStyle>
							<Checkbox>记住密码</Checkbox>
						</Form.Item>
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a className="login-form-forgot" href="">
							跳转主页
						</a>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Log in
						</Button>
					</Form.Item>
				</Form>
			</fieldset>
			<Space direction="vertical" style={{ width: '100%', marginTop: '10px' }}>
				{alerterr !== '' && <Alert
					description={alerterr}
					type="error"
					showIcon
				/>}
			</Space>
		</div>
	)
}

