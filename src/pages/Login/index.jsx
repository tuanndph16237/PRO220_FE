import React from 'react';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
const Login = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
    
      return (
        <div className="flex h-[580px] items-center">
          <Form
            name="normal_login"
            className="login-form w-[360px] m-auto"
            initialValues={{ remember: false }}
            onFinish={onFinish}
          >
            <h1 className="text-[28px] mb-6">Đăng nhập</h1>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập Số điện thoại!' }]}
            >
              <Input className="py-2" prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu!' }]}
            >
              <Input.Password
                className="py-2"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="float-left" >Ghi nhớ tài khoản</Checkbox>
              </Form.Item>
      
              <a className="login-form-forgot float-right hover:text-[#1464f4]" href="">
                Quên mật khẩu?
              </a>
            </Form.Item>
      
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button text-[15px] bg-[#02b875] w-full ">
                Đăng nhập
              </Button>
              <p className="my-5 text-center">Chưa có tài khoản?</p>
              <Link to='/dang-ky' className="inline-block text-[16px] w-full py-1 rounded text-[#1464f4] text-center border border-[#1464f4] hover:text-[#fff] hover:bg-[#125eb9]">Đăng ký tài khoản</Link>
            </Form.Item>
          </Form>
        </div>
      );
};

export default Login;
