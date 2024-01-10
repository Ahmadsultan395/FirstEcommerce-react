import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
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
        signup: true,
        username: data.username,
        email: data.email,
        password: data.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        console.log(response.data.message);
        // Redirect to login page or any other page after successful signup
        navigate('/login');
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className='sign-up-form-main'>
      <div className='sign-up-form-main-div'>
        <h1>Create an Account</h1>
        <form className='sign-up-form' action=''>
          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={handleChange}
            value={data.username}
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            value={data.email}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            value={data.password}
          />
          <button type='submit' onClick={handleSubmit}>
            Sign Up
          </button>
          <Link to='/login'>
          <button>
          Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
