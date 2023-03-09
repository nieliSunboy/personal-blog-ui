import React, { useState, useEffect } from "react";
import { Form, Input, Radio } from "antd";
import type { RadioChangeEvent } from 'antd';
import { EModal } from "~/compents/UI/EModal"
import { UserApi } from '~/api'
import { myAxios } from '~/utils/axios';

interface UserModalProps {
  params?: any;
	sourceId?: string | number;
  open: boolean;
  onCancel: (i?: boolean) => void
}

export const UserModal: React.FC<UserModalProps> = ({ open, sourceId, onCancel }) => {

  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ title, setTitle ] = useState('');

  const options = [
    { label: '帅哥', value: 0 },
    { label: '美女', value: 1 },
    { label: '其他', value: 2 },
  ];

  const handleOk = () => {
    setConfirmLoading(true);
    form.validateFields().then((values) => {
        submit(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    onCancel();
  };

  const submit = (value: any) => {
    console.log(value)
    if (!sourceId) {
      // 新增数据
      myAxios.post(UserApi.userAdd, value).then(res => {
        console.log('info--', res.data)     
        setConfirmLoading(false);
        onCancel(true);
      })
    } else {
      // 编辑数据
      myAxios.post(UserApi.userUpdate, Object.assign(value, { user_id: sourceId })).then(res => {
        console.log('info--', res.data)
        setConfirmLoading(false);
      })
    }
  }

  const getInfoById = () => {

    if (!open) {
      return
    }

    if (!sourceId) {
      return
    }

    myAxios.post(UserApi.getUserById, {id: sourceId}).then(res => {
      form.setFieldsValue(res.data || {});
    })
  }

  useEffect(() =>{
    setTitle(sourceId ? '编辑用户': '新增用户');
    form.resetFields();
    getInfoById();
  }, [open]);

  return (
    <EModal
      title={title}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="wrap"
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
        onFinish={submit}
      >
        <Form.Item
          label="登录账号"
          name="user_name"
          rules={[
            { required: true, message: '登录账号不能为空' },
            { type: 'string', min: 6, max: 20, warningOnly: true, message: '请输入6~20字符' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="登录密码"
          name="password"
          rules={[
            { required: true, message: '登录密码不能为空'}, 
            { type: 'string', min: 6, max: 32, warningOnly: true, message: '请输入6~32字符' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="性别"
          name="sex"
          rules={[{ required: false }]}
        >
          <Radio.Group options={options} onChange={({ target: { value } }: RadioChangeEvent) => {
            form.setFieldValue('sex', value);
          }} value={'0'} />
        </Form.Item>

        <Form.Item
          label="别名"
          name="nickName"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="emall"
          rules={[{ required: false }, { type: 'email', message: '邮箱格式不正确' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="电话"
          name="phone"
          rules={[{ required: false}, {  pattern: /^1[3,4,5,7,8,9]\d{9}/, message: '手机格式不正确' }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="头像"
          name="picture"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item> */}
      </Form>
    </EModal>
  );
};
