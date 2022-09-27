import { Avatar, Dropdown, Layout, Menu, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from 'redux/features/usersSlice';
import { parseUserInfo } from 'util/parseUserInfo';
import axios from 'lib/axios';

const { Header } = Layout;

const navigationItems = [
  {
    key: '/dashboard',
    label: <NavLink to="/dashboard">Dashboard</NavLink>,
  },
  {
    key: '/blogs',
    label: <NavLink to="/blogs">Blogs</NavLink>,
  },
  {
    key: '/chat',
    label: <NavLink to="/chat">Chat</NavLink>,
  },
];

const dropdownItems = [
  {
    key: 'profile',
    label: <Link to="/profile">Profile</Link>,
  },
  {
    key: 'settings',
    label: <Link to="/settings">Settings</Link>,
  },
  {
    key: 'logout',
    label: 'Sign Out',
  },
];

function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const { imageUrl, fullName } = parseUserInfo(user);

  async function handleDropdownClick(event) {
    if (event.key === 'logout') {
      await axios.post('logout');
      dispatch(setCurrentUser(null));
      navigate('/auth/login');
    }
  }

  return (
    <Header className="app-header">
      <div className="logo" />
      <Menu
        className="app-navigation"
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[window.location.pathname]}
        items={navigationItems}
      />
      <div className="user-info">
        {user && (
          <Dropdown
            trigger="click"
            overlay={
              <Menu onClick={handleDropdownClick} items={dropdownItems} />
            }
          >
            <Typography.Link>
              <Space>
                <Avatar src={imageUrl} />
                {fullName}
                <DownOutlined />
              </Space>
            </Typography.Link>
          </Dropdown>
        )}
      </div>
    </Header>
  );
}

export default AppHeader;
