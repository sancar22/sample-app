import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes/index';
import { FormData } from '../interfaces';
import { authService } from '../services/authService';

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
    if (!error) {
      setFormData(emptyForm);
      alert(res);
    }
    console.log(res, 'here');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="main-view" onSubmit={handleRegister}>
      <input
        name="firstName"
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleFormChange}
      />
      <input
        name="surname"
        type="text"
        placeholder="Surname"
        value={formData.surname}
        onChange={handleFormChange}
      />
      <input
        name="username"
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={handleFormChange}
      />
      <input
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
