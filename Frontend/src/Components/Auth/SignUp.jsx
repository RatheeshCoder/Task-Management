import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from './firebase.config'; 

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      navigate('/TaskMain');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="bg-white w-[150%] ml-[-50px] glass-panel">
      <div className="container px-16 py-10 mx-auto">
        <div className="max-w-lg mx-auto">
          <div className="mb-8 text-center">
            <a className="inline-block mx-auto mb-6" href="#">
              <img src="nigodo-assets/logo-icon-nigodo.svg" alt="" />
            </a>
            <h2 className="mb-2 text-3xl font-extrabold md:text-4xl">Sign Up</h2>
          </div>
          <form onSubmit={handleSignUp}>
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
                className="inline-block w-full p-4 text-lg font-extrabold leading-6 bg-white border-2 border-black rounded shadow placeholder-black-900"
                type="password"
                id="password"
                placeholder="must use min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="flex items-center max-w-lg px-6 py-4 mx-2 mx-auto my-4 text-lg bg-red-200 rounded-md">
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3 text-red-600 sm:w-5 sm:h-5">
                  <path fill="currentColor"
                    d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
                  </path>
                </svg>
                <span className="text-red-800">{error}</span>
              </div>
            )}
            <button
              className="inline-block w-full px-6 py-4 mb-6 text-lg font-extrabold leading-6 text-center text-white transition duration-200 bg-indigo-800 border-black rounded shadow hover:bg-black border-3"
              type="submit"
            >
              Sign Up
            </button>
            <p className="font-extrabold text-center">
              I have an account?{' '}
              <Link to="/" className="text-red-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
