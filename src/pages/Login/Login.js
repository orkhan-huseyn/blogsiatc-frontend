import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import './styles.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <Typography.Title>Sign In</Typography.Title>
        <LoginForm />
        <p>
          <span style={{ marginRight: '5px' }}>Don't have an account?</span>
          <Link to="/auth/registration">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
