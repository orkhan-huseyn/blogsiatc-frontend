import { Button, Form, Input, message } from 'antd';
import { GoogleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../lib/axios';

function LoginForm() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  function handleLoginWithGoogle() {
    window.open(
      process.env.REACT_APP_BACKEND_URL + '/api/v1/login/google',
      '_self'
    );
  }

  async function onFinish(values) {
    try {
      setSubmitting(true);
      await axios.post('login', values);
      navigate('/');
    } catch (error) {
      const errorMessage = error.response.data.error;
      message.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form layout="vertical" onFinish={onFinish} autoComplete="off">
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter your email!' }]}
      >
        <Input
          placeholder="someone@example.com"
          prefix={<UserOutlined />}
          type="email"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password placeholder="Password" prefix={<LockOutlined />} />
      </Form.Item>

      <p style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 0 }}>
        <Link to="/auth/forgot-password">I forgot my password</Link>
      </p>

      <Form.Item>
        <Button loading={submitting} block type="primary" htmlType="submit">
          Sign In
        </Button>
      </Form.Item>

      <Form.Item>
        <Button
          onClick={handleLoginWithGoogle}
          type="primary"
          danger
          icon={<GoogleOutlined />}
          block
        >
          Sign In With Google
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
