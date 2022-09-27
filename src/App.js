import { Routes, Route, Navigate } from 'react-router-dom';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import BlogCreate from './pages/BlogCreate';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Inbox from './pages/Inbox';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AppLayout from './components/AppLayout';

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/dashboard" />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/registration" element={<Registration />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/auth/reset-password/:resetToken"
        element={<ResetPassword />}
      />

      <Route path="/" element={<AppLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="chat" element={<Chat />}>
          <Route path=":userId" element={<Inbox />} />
        </Route>
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/create" element={<BlogCreate />} />
        <Route path="blogs/:blogId" element={<BlogDetails />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
