import { UserOutlined } from '@ant-design/icons';
import { Typography, Form, Button, Input, message } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'lib/axios';
import './styles.css';

function ForgotPassword() {
  const [submitting, setSubmitting] = useState(false);

  async function onFinish(values) {
    try {
      setSubmitting(true);
      await axios.post('password/reset-request', values);
      message.success('We sent an email to you!');
    } catch (error) {
      const errorMessage = error.response.data.message;
      message.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="password-container">
      <div className="password-form-container">
        <Typography.Title>Forgot Password</Typography.Title>
        <Typography.Paragraph>
          Enter your email address. If your e-mail exists in our database, then
          you will receive a password reset email.
        </Typography.Paragraph>

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

          <Form.Item>
            <Button loading={submitting} block type="primary" htmlType="submit">
              Send Password Reset Email
            </Button>
          </Form.Item>
        </Form>
        <p>
          <span style={{ marginRight: '5px' }}>Don't have an account?</span>
          <Link to="/auth/registration">Login in to your account</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
