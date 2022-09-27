import { Outlet, NavLink } from 'react-router-dom';
import { List, Avatar, Badge, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchUsers,
  incrementUnreadMessages,
  newMessage,
  setUserOnline,
} from 'redux/features/chatSlice';
import { parseUserInfo } from 'util/parseUserInfo';
import ProtectedRoute from 'components/ProtectedRoute';
import socket from 'lib/io';
import './styles.css';

function Chat() {
  const dispatch = useDispatch();
  const { list, total, error, loading } = useSelector(
    (state) => state.chat.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
    socket.connect();

    socket.on('user online', (userId) => {
      dispatch(
        setUserOnline({
          userId,
          isOnline: true,
        })
      );
    });

    socket.on('user offline', (userId) => {
      dispatch(
        setUserOnline({
          userId,
          isOnline: false,
        })
      );
    });

    socket.on('new message', (message) => {
      const { fromUser, ...rest } = message;
      dispatch(newMessage({ message: rest, userId: fromUser }));
      dispatch(incrementUnreadMessages(fromUser));
    });

    return () => {
      socket.off('user online');
      socket.off('user offline');
      socket.off('new message');
      socket.close();
    };
  }, []);

  return (
    <ProtectedRoute>
      <div className="chat-container">
        <div className="users">
          <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(user) => (
              <NavLink to={`/chat/${user.id}`}>
                <List.Item
                  style={{ padding: '15px' }}
                  extra={<Badge count={user.unreadMessages} />}
                >
                  <Skeleton loading={loading} active avatar>
                    <List.Item.Meta
                      avatar={
                        <Badge color="green" dot={user.online}>
                          <Avatar src={parseUserInfo(user).imageUrl} />
                        </Badge>
                      }
                      title={user.fullName}
                      description="Ant Design, a design language for..."
                    />
                  </Skeleton>
                </List.Item>
              </NavLink>
            )}
          />
        </div>
        <div className="inbox">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Chat;
