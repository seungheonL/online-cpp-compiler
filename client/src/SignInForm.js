import React, { useState } from 'react';

const SignInForm = ({ setIsLoggedIn }) => {
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

    const { token } = await res.json();
    if (token) {
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
    }
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
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default SignInForm;
