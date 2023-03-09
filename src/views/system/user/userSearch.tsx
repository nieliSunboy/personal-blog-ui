import React from 'react'
import { Button, Form, Input } from 'antd';

export const UserSearch: React.FC<{
    onChange?: (i: any) => void;
    onInsert?: () => void;
}> = ({ onChange, onInsert }) => {
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    return (<Form
        layout={'inline'}
        form={form}
        onFinish={onChange}
        style={{ maxWidth: '100%', marginBottom: '10px' }}
    >
        <Form.Item label="用户名称" name="user_name">
            <Input placeholder="用户名称" />
        </Form.Item>
        <Form.Item label="电话号码" name="phone">
            <Input placeholder="电话号码" />
        </Form.Item>
        <Form.Item >
            <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>搜索</Button>
            <Button htmlType="button" onClick={onReset} style={{ marginRight: 10 }}>重置</Button>
            <Button htmlType="button" onClick={onInsert} style={{ marginRight: 10 }}>新增</Button>
        </Form.Item>

    </Form>)
}
