import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { Button, Form, Input, Select, message } from 'antd';
import axios from 'lib/axios';
import 'react-quill/dist/quill.snow.css';

function BlogCreate() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  async function onFormSubmit(values) {
    try {
      setSubmitting(true);
      await axios.post('blogs', values);
      message.success('Blog inserted successfully!');
      navigate('/blogs');
    } catch (error) {
      const errorMessage = error.response.data.message;
      message.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form layout="vertical" onFinish={onFormSubmit}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter blog title!' }]}
      >
        <Input placeholder="Enter blog title" />
      </Form.Item>
      <Form.Item
        label="Content"
        name="body"
        rules={[{ required: true, message: 'Please enter blog content!' }]}
      >
        <ReactQuill theme="snow" placeholder="Enter blog content" />
      </Form.Item>
      <Form.Item label="Tags" name="tags">
        <Select mode="tags" placeholder="Add tags"></Select>
      </Form.Item>
      <Form.Item>
        <Button loading={submitting} htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default BlogCreate;
