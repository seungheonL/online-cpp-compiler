import React, { useEffect, useState } from 'react';
import Home from './Home';
import SignInForm from './SignInForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('login-token');
    if (token) {
      fetch('http://localhost:8080/auth', {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('login-token'),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.email) {
            setUser({
              email: data.email,
            });
          } else {
            console.log(data);
            setUser({});
            setIsLoggedIn(false);
          }
        });

      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return isLoggedIn ? (
    <Home user={user} />
  ) : (
    <SignInForm setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
  );
};

export default App;
