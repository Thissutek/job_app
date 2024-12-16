import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();

      // If sign up was successful, redirect to login page to login
      if(response.ok) {
        navigate('/');
      } else {
        setErrorMessage(data.message);
      }

    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };
  
  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg'>
      <h1 className='text-2xl font-bold mb-6 text-center'>Sign Up</h1>
      {errorMessage && <p className='text-red-500 text-center mb-4'>{errorMessage}</p>}
      <form onSubmit={handleSignUp}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Username</label>
          <input 
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full px-4 py-2 border rounded-md'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input 
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-2 border rounded-md'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Password</label>
          <input 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-2 border rounded-md'
            required
          />
        </div>
        <button type='submit' className='w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500'>
                      Sign Up
        </button>
      </form>
    </div>
  );
}