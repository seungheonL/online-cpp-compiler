import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Home from './Home';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  //console.log('dddddddddddd' + user.email);

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
          // console.log(data);
          // console.log('useEffect called');

          if (data.email) {
            // console.log(data.email);

            setUser({
              email: data.email,
            });

            // console.log(user.email);

            // console.log(data.email);
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

  // return isLoggedIn ? (
  //   <Router>
  //     <Switch>
  //       <Route path="/">
  //         <Home user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
  //       </Route>
  //     </Switch>
  //   </Router>
  // ) : (
  //   <Router>
  //     <Switch>
  //       <Route path="/">
  //         <SignInForm setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
  //       </Route>
  //       <Route path="/signup">
  //         <h1>singup</h1>
  //       </Route>
  //     </Switch>
  //   </Router>
  // );

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
