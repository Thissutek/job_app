import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        navigate('/mainpage');
      } else {
        setErrorMessage(data.message);
      }

    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className='max-w-md mx-auto bg-white p-8 shadow-md rounded-lg my-20'>
      <h2 className='text-2xl font-semibold mb-4'>Log In</h2>
      {errorMessage && <p className='text-red-500 text-center mb-4'>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                        Email
          </label>
          <input 
            type='email' 
            id='email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
            

        <div className='mb-6'>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                        Password
          </label>
          <input 
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <button type='submit' className='w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700'>
                    Log In
        </button>
        <p className='text-center font-semibold mt-4'>Not a member yet? &nbsp;
          <Link to='/signup' className='text-indigo-600 hover:underline'>
            Sign up for free
          </Link>
        </p>
      </form>
    </div>
  );
}