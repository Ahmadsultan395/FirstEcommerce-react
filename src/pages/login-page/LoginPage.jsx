import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:80/api/', {
        login: true,
        email: data.email,
        password: data.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        console.log(response.data.message);
        // Redirect to the dashboard or any other page after successful login
        navigate('/dashboard');
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error('Error Logging In ', error);
    }
  };

  return (
    <>
      <div className='login-page-form-main'>
        <div className='login-page-main-form-div'>
          <h1>Login to Your Account</h1>
          <form action='' className='login-page-form'>
            <input type='email' placeholder='Email' name='email' value={data.email} onChange={handleChange} />
            <input type='password' placeholder='Password' name='password' value={data.password} onChange={handleChange} />
            <button type='submit' onClick={handleSubmit}>
              Login
            </button>
         <Link to='/'>
         <button type='submit'>
              Sign Up
            </button></Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

