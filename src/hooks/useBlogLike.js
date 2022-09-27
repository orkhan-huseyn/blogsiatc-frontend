import axios from 'lib/axios';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toggleBlogLike as blogLike } from 'redux/features/blogsSlice';
import { toggleBlogLike as dashboardLike } from 'redux/features/dashboardSlice';

export function useBlogLike(blog) {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);

  async function handleLike(blogId) {
    const likeAction =
      location.pathname === '/dashboard' ? dashboardLike : blogLike;

    dispatch(
      likeAction({
        blogId,
        userId: currentUser._id,
      })
    );
    await axios.put(`/blogs/${blogId}/like`);
  }

  const isBlogLiked = blog.likes.includes(currentUser?._id);

  return [isBlogLiked, handleLike];
}
