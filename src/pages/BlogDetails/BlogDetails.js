import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LikeOutlined, LikeTwoTone } from '@ant-design/icons';
import { PageHeader, Button, Tag } from 'antd';
import ProtectedRoute from 'components/ProtectedRoute';
import axios from 'lib/axios';
import { timeAgo } from 'lib/timeAgo';
import { useBlogLike } from 'hooks/useBlogLike';
import CommentList from './Comment';
import './styles.css';

const defaultBlog = {
  _id: null,
  title: 'Loading...',
  body: 'Loading...',
  author: {},
  likes: [],
  tags: [],
  comments: [],
  createdAt: '01-01-1970',
};

function BlogDetails() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(defaultBlog);
  const [isBlogLiked, handleLike] = useBlogLike(blog);

  useEffect(() => {
    async function fetchBlogData() {
      const { data } = await axios.get(`blogs/${blogId}`);
      setBlog(data);
    }
    fetchBlogData();
  }, [blogId]);

  const addComment = useCallback((comment) => {
    setBlog((oldBlog) => {
      return {
        ...oldBlog,
        comments: [...oldBlog.comments, comment],
      };
    });
  }, []);

  return (
    <ProtectedRoute>
      <PageHeader
        ghost={false}
        onBack={() => navigate('/blogs')}
        title={blog.title}
        subTitle={blog.author.fullName}
        extra={[
          <small key="creationTime">
            {timeAgo.format(new Date(blog.createdAt))}
          </small>,
          <Button
            onClick={() => handleLike(blog._id)}
            key="like-button"
            type="text"
            size="small"
            color="red"
            icon={isBlogLiked ? <LikeTwoTone /> : <LikeOutlined />}
          >
            <span style={{ display: 'inline-block', marginLeft: '7px' }}>
              {blog.likes.length}
            </span>
          </Button>,
        ]}
      />
      <div className="blog-body">
        <p dangerouslySetInnerHTML={{ __html: blog.body }}></p>
        <div style={{ marginTop: '15px' }}>
          {blog.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>

      <CommentList
        addComment={addComment}
        comments={blog.comments}
        blogId={blog._id}
      />
    </ProtectedRoute>
  );
}

export default BlogDetails;
