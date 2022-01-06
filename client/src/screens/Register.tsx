import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes/index';
import { FormDataRegister } from '../interfaces';
import { authService } from '../services/authService';
import { toast, ToastContainer } from 'react-toastify';
import CustomToast from '../components/CustomToast';

const emptyForm: FormDataRegister = {
  firstName: '',
  surname: '',
  username: '',
  password: '',
};

function Register () {
  const [formData, setFormData] = useState<FormDataRegister>(emptyForm);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { res, error } = await authService.registerUser(formData);
    if (!error) setFormData(emptyForm);
    toast(<CustomToast title={res}/>);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer/>
      <form role="register-form" className="main-view" onSubmit={handleRegister}>
        <input
          role="firstName-register"
          required={true}
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleFormChange}
        />
        <input
          role="surname-register"
          required={true}
          name="surname"
          type="text"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleFormChange}
        />
        <input
          role="username-register"
          required={true}
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleFormChange}
        />
        <input
          role="password-register"
          required={true}
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleFormChange}
        />
        <button role="button-register" type="submit">Register</button>
        <Link role="login-link" to={routes.HOME} className="link">
          <button role="go-back"> Go Back</button>
        </Link>
      </form>
    </>
  );
}

export default Register;
