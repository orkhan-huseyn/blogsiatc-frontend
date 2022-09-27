import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import {
  fetchMessages,
  markAllAsRead,
  newMessage,
} from 'redux/features/chatSlice';
import socket from 'lib/io';
import './styles.css';

function Inbox() {
  const messageListRef = useRef();
  const [form] = Form.useForm();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages[userId]);
  const chatUsers = useSelector((state) => state.chat.users.list);

  const scrollToBottom = () => {
    setTimeout(() => {
      const messageContainer = messageListRef.current;
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
      });
    });
  };

  useEffect(() => {
    socket.emit('join room', userId);
    dispatch(fetchMessages(userId));
  }, [userId]);

  useEffect(() => {
    const chatUser = chatUsers.find((user) => user.id === userId);
    if (chatUser && chatUser.unreadMessages > 0) {
      dispatch(markAllAsRead(userId));
    }
  }, [userId, chatUsers]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function sendMessage({ content }) {
    socket.emit('send message', { userId, content });
    const message = {
      id: Math.random(),
      content,
      createdAt: new Date().toISOString(),
      fromMyself: true,
    };
    dispatch(newMessage({ message, userId }));
    form.resetFields();
  }

  return (
    <div>
      <ul ref={messageListRef} className="message-list">
        {messages?.map((message) => (
          <li
            className={`message-container${
              message.fromMyself ? ' right' : ' left'
            }`}
            key={message.id}
          >
            <span className="message-box">{message.content}</span>
          </li>
        ))}
      </ul>
      <Form
        form={form}
        style={{ paddingLeft: '24px' }}
        layout="inline"
        onFinish={sendMessage}
      >
        <Form.Item
          style={{ flexGrow: 1 }}
          name="content"
          rules={[
            { required: true, message: 'Please write something to send' },
          ]}
        >
          <Input.TextArea placeholder="Send message..."></Input.TextArea>
        </Form.Item>
        <Form.Item>
          <Button icon={<SendOutlined />} type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Inbox;
