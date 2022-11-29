import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
const Login = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
    
      return (
        
        <Form
          name="normal_login"
          className="login-form w-[400px] m-auto"
          initialValues={{ remember: false }}
          onFinish={onFinish}
        >
          <h1 className="text-[28px] mb-6">Đăng nhập</h1>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Phone Number!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Phone Number" />
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
              <Checkbox className="float-left" >Remember me</Checkbox>
            </Form.Item>
    
            <a className="login-form-forgot float-right" href="">
              Quên mật khẩu?
            </a>
          </Form.Item>
    
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button bg-[#02b875] w-full ">
              Đăng nhập
            </Button>
            <p className="my-5 text-[#02b875] text-center">Chưa có tài khoản?</p>
            <Button className="w-full">Đăng ký tài khoản</Button>
          </Form.Item>
        </Form>
      );
};

export default Login;
