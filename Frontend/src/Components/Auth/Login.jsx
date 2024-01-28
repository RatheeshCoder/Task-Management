import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail } from './firebase.config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate('/TaskMain');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent. Check your inbox.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="w-[150%] bg-white ml-[-50px]  glass-panel">
      <div className="container px-16 py-10 mx-auto">
        <div className="max-w-lg mx-auto">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-extrabold md:text-4xl">Login</h2>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block mb-2 font-extrabold" htmlFor="email">
                Email
              </label>
              <input
                className="inline-block w-full p-4 text-lg font-extrabold leading-6 bg-white border-2 border-black rounded shadow placeholder-black-900"
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-extrabold" htmlFor="password">
                Password
              </label>
              <input
                className="inline-block w-full p-4 text-lg font-extrabold leading-6 placeholder-black bg-white border-2 border-black rounded shadow"
                type="password"
                id="password"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6 text-right">
            <span 
                className="text-black cursor-pointer hover:underline"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </span>
            </div>
            {error && (
              <div className="flex items-center max-w-lg px-6 py-4 mx-2 mx-auto my-4 text-lg bg-red-200 rounded-md">
                <span className="text-red-800">{error}</span>
              </div>
            )}
            <button
              className="inline-block w-full px-6 py-4 mb-6 text-lg font-extrabold leading-6 text-center text-white transition duration-200 bg-indigo-800 border-black rounded shadow hover:bg-black border-3"
              type="submit"
            >
              Login
            </button>
            <p className="font-extrabold text-center">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-red-500 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
