import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

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
            setIsLoggedIn(true);
          } else {
            setUser({});
            setIsLoggedIn(false);
          }
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home
                user={user}
                setUser={setUser}
                setIsLoggedIn={setIsLoggedIn}
              />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <SignInForm setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route exact path="/signup">
              <SignUpForm setIsLoggedIn={setIsLoggedIn} />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
