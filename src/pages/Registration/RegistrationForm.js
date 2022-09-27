import { Button, Form, Input, Upload, message } from 'antd';
import {
  GoogleOutlined,
  LockOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../lib/axios';

function RegistrationForm() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  async function onFinish(values) {
    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('image', values.image.originFileObj);

      await axios.post('register', formData);
      message.success('Registration successfull!');
      navigate('/auth/login');
    } catch (error) {
      const errorMessage = error.response.data.message;
      message.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }



  function normFile(e) {
    return e.fileList[0];
  }

  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="First name"
        name="firstName"
        rules={[{ required: true, message: 'Please enter your first name!' }]}
      >
        <Input placeholder="First name" />
      </Form.Item>

      <Form.Item
        label="Last name"
        name="lastName"
        rules={[{ required: true, message: 'Please enter your last name!' }]}
      >
        <Input placeholder="Last name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter your email!' }]}
      >
        <Input
          type="email"
          placeholder="someone@example.com"
          prefix={<UserOutlined />}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password placeholder="Password" prefix={<LockOutlined />} />
      </Form.Item>

      <Form.Item
        label="Profile picture"
        getValueFromEvent={normFile}
        name="image"
      >
        <Upload block beforeUpload={() => false}>
          <Button block icon={<UploadOutlined />}>
            Add Image
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button loading={submitting} block type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="primary" danger icon={<GoogleOutlined />} block>
          Sign Up With Google
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RegistrationForm;
