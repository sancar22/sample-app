import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes/index';
import { FormData } from '../interfaces';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import CustomToast from '../components/CustomToast';

const emptyForm: FormData = {
  firstName: '',
  surname: '',
  username: '',
  password: '',
};

function Register () {
  const [formData, setFormData] = useState<FormData>(emptyForm);

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
    <form className="main-view" onSubmit={handleRegister}>
      <input
        required={true}
        name="firstName"
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleFormChange}
      />
      <input
        required={true}
        name="surname"
        type="text"
        placeholder="Surname"
        value={formData.surname}
        onChange={handleFormChange}
      />
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
      <button type="submit">Register</button>
      <Link to={routes.HOME} className="link">
        <button> Go Back</button>
      </Link>
    </form>
  );
}

export default Register;
