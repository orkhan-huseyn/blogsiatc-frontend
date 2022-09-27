import { Breadcrumb, Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import breadcrumb from 'util/breadcrumb';
import AppHeader from './Header';
import './styles.css';

const { Content, Footer } = Layout;

function AppLayout() {
  const location = useLocation();
  const breadCrumbItems = breadcrumb[location.pathname];

  return (
    <Layout className="app-layout">
      <AppHeader />
      <Content className="app-content">
        <Breadcrumb className="app-breadcrumb">
          {breadCrumbItems?.map((item, index) => (
            <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <main className="site-layout-content">
          <Outlet />
        </main>
      </Content>
      <Footer>Ant Design ©2018 Created by IATC</Footer>
    </Layout>
  );
}

export default AppLayout;
