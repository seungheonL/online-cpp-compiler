import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignInForm = ({ setIsLoggedIn, setUser }) => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    const { token, userEmail } = await res.json();

    if (token) {
      localStorage.setItem('login-token', token);
      setUser({ email: userEmail });
      setIsLoggedIn(true);
    } else {
      alert('incorret email or password');
    }
  };

  const handleSignUpClick = (event) => {
    history.push('/signup');
  };

  return (
    <>
      <img
        src="logo.jpg"
        width="200px"
        height="200px"
        alt=""
        style={{
          display: 'block',
          margin: '0px auto',
          marginTop: '50px',
        }}
      />
      <form
        onSubmit={handleSubmit}
        style={{
          textAlign: 'center',
          marginTop: '50px',
        }}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={handleEmailChange}
            value={email}
            style={{
              width: '20%',
              margin: '0 auto',
            }}
            size="10"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            onChange={handlePasswordChange}
            value={password}
            style={{
              width: '20%',
              margin: '0 auto',
            }}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            marginTop: '10px',
          }}
        >
          Login
        </button>
        <p></p>
        <button onClick={handleSignUpClick} className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignInForm;
