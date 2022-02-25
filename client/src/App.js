import React, { useEffect, useState } from 'react';
import Home from './Home';
import SignInForm from './SignInForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return isLoggedIn ? <Home /> : <SignInForm setIsLoggedIn={setIsLoggedIn} />;
};

export default App;
