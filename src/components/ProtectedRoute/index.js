import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setCurrentUser } from '../../redux/features/usersSlice';
import axios from '../../lib/axios';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data } = await axios.get('me');
        if (!data) {
          navigate('/auth/login');
        } else {
          dispatch(setCurrentUser(data));
        }
      } catch (error) {
        navigate('/auth/login');
      } finally {
        dispatch(setLoading(false));
      }
    }

    if (!currentUser) {
      getUserInfo();
    }
  }, [currentUser, navigate, dispatch]);

  if (loading) {
    return <h1>Authorizing...</h1>;
  }

  return children;
}

export default ProtectedRoute;
