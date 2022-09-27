import { LockOutlined } from '@ant-design/icons';
import { Typography, Form, Button, Input, message } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'lib/axios';
import './styles.css';

function ResetPassword() {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  async function onFinish(values) {
    try {
      setSubmitting(true);
      await axios.patch('password', {
        newPassword: values.password,
        resetToken,
      });
      message.success('Your password has been reset!');
      navigate('/auth/login');
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
        <Typography.Title>Reset Password</Typography.Title>
        <Typography.Paragraph>Enter your new password</Typography.Paragraph>

        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password placeholder="Password" prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Password" prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item>
            <Button loading={submitting} block type="primary" htmlType="submit">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
