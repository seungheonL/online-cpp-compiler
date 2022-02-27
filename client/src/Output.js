const Output = ({ result, setUser, setIsLoggedIn }) => {
  const handleLogout = (event) => {
    setUser({});
    setIsLoggedIn(false);
    localStorage.removeItem('login-token');
  };

  return (
    <div className="form-group">
      <textarea
        spellCheck="false"
        rows="40"
        style={{
          backgroundColor: '#212121',
          color: '#A4A4A4',
          fontFamily: 'consolas',
          marginBottom: '15px',

          marginLeft: '500px',
        }}
        className="form-control"
        value={result}
      ></textarea>
      <button
        onClick={handleLogout}
        className="btn btn-primary"
        type="submit"
        style={{
          marginLeft: '500px',
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Output;
