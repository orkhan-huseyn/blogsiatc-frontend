import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Comment, Avatar, Input, List, Button, message } from 'antd';
import { parseUserInfo } from 'util/parseUserInfo';
import axios from 'lib/axios';
import { timeAgo } from 'lib/timeAgo';

function Editor({ onSubmit, submitting }) {
  const [form] = Form.useForm();

  function handleSubmit(values) {
    onSubmit(values);
    setTimeout(() => {
      form.resetFields();
    }, 500);
  }

  return (
    <Form onFinish={handleSubmit} form={form}>
      <Form.Item
        name="content"
        rules={[
          { required: true, message: 'You cannot make an empty comment' },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
}

function CommentList({ blogId, comments, addComment }) {
  const [submitting, setSubmitting] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const { imageUrl, fullName } = parseUserInfo(user);

  async function handleSubmit(values) {
    setSubmitting(true);
    try {
      const { data } = await axios.post(`blogs/${blogId}/comments`, values);
      addComment(data);
    } catch (error) {
      message.error('Could not add comment!');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ padding: '0 24px' }}>
      {comments.length > 0 && (
        <List
          dataSource={comments}
          header={`${comments.length} ${
            comments.length > 1 ? 'replies' : 'reply'
          }`}
          itemLayout="horizontal"
          renderItem={(props) => {
            const { fullName, imageUrl } = parseUserInfo(props.author);

            return (
              <Comment
                author={fullName}
                avatar={imageUrl}
                content={props.body}
                datetime={timeAgo.format(new Date(props.createdAt))}
              />
            );
          }}
        />
      )}
      <Comment
        avatar={<Avatar src={imageUrl} alt={fullName} />}
        content={<Editor onSubmit={handleSubmit} submitting={submitting} />}
      />
    </div>
  );
}

export default CommentList;
