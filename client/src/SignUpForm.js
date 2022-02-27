import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignUpForm = ({ setIsLoggedIn }) => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword1Change = (event) => {
    setPassword1(event.target.value);
  };

  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password1 != password2) {
      alert('Check password again');
      return;
    }

    const res = await fetch('http://localhost:8080/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password1,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    const data = await res.json();

    if (data.message == 'existing email') {
      alert('This email already exists');
      return;
    } else if (data.message == 'success') {
      alert('New account has been created');
      history.push('/');
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
            onChange={handlePassword1Change}
            value={password1}
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
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            onChange={handlePassword2Change}
            value={password2}
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
          Submit
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
