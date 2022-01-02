import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../routes/index';
import { FormDataLogin } from '../interfaces';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import CustomToast from '../components/CustomToast';

const emptyForm: FormDataLogin = {
  username: '',
  password: '',
};

function Login () {
  const [formData, setFormData] = useState<FormDataLogin>(emptyForm);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {res, error} = await authService.loginUser(formData);
    if (!error) {
      localStorage.setItem('jwt', res);
      navigate(routes.CHAT);
    } else {
      toast(<CustomToast title={res}/>);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  return (
    <form className="main-view" onSubmit={handleLogin}>
      <input
        required={true}
        name="username"
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={handleFormChange}
      />
      <input
        required={true}
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleFormChange}
      />
      <button type="submit">Login</button>
      <Link to={routes.REGISTER} className="link">
        <button>Register</button>
      </Link>
    </form>
  );
}

export default Login;
