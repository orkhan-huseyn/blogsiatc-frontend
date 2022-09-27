import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import './styles.css';

function Registration() {
  return (
    <div className="registration-container">
      <div className="registration-form-container">
        <Typography.Title>Sign Up</Typography.Title>
        <RegistrationForm />
        <p>
          <span style={{ marginRight: '5px' }}>Already have an account?</span>
          <Link to="/auth/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
