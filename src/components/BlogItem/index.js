import React from 'react';
import { LikeOutlined, LikeTwoTone, MessageOutlined } from '@ant-design/icons';
import { Avatar, Button, List, Space, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { timeAgo } from 'lib/timeAgo';
import { useDispatch } from 'react-redux';
import { likeOrDislikeBlog } from 'redux/features/dashboardSlice';

const MAX_CHAR_COUNT = 300;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function BlogItem({ item }) {
  const dispatch = useDispatch();
  const blogContent = item.body.replace(/<[^>]+>/g, '');

  const handleLike = (id) => {
    dispatch(likeOrDislikeBlog(id));
  }

  return (
    <List.Item
      extra={<small>{timeAgo.format(new Date(item.createdAt))}</small>}
      actions={[
        <Button
          onClick={() => handleLike(item.id)}
          key="like-button"
          type="text"
          size="small"
          color="red"
          icon={item.liked ? <LikeTwoTone /> : <LikeOutlined />}
        >
          <span style={{ display: 'inline-block', marginLeft: '7px' }}>
            {item.likes}
          </span>
        </Button>,
        <IconText
          icon={MessageOutlined}
          text={item.comments}
          key="list-vertical-message"
        />,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar
            src={process.env.REACT_APP_BACKEND_URL + '/' + item.author.image}
          />
        }
        description={item.author.fullName}
        title={<Link to={`/blogs/${item.id}`}>{item.title}</Link>}
      />
      {blogContent.substring(0, MAX_CHAR_COUNT)}...
      <div style={{ marginTop: '15px' }}>
        {item.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </List.Item>
  );
}

export default BlogItem;
