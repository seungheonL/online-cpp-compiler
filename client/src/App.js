import React, { useState } from 'react';

function App() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');

  const onCodeSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('http://localhost:8080/compile', {
      method: 'POST',
      body: JSON.stringify({
        code,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    setResult(await res.json());
  };

  const onCodeChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <>
      <h1
        style={{ textAlign: 'center', marginBottom: '30px', marginTop: '30px' }}
      >
        Welcome to online C/C++ compiler
      </h1>
      <div
        className="row"
        style={{
          textAlign: 'center',
        }}
      >
        <div className="col">
          <h2>source code</h2>
        </div>
        <div className="col">
          <h2>result</h2>
        </div>
      </div>
      <div className="row">
        <div
          className="col-2"
          style={{
            float: 'none',
            margin: '0 auto',
          }}
        >
          <form onSubmit={onCodeSubmit}>
            <div
              className="form-group"
              style={{
                marginBottom: '15px',
                marginTop: '15px',
              }}
            >
              <textarea
                spellcheck="false"
                style={{
                  width: '300%',
                  backgroundColor: '#212121',
                  color: '#A4A4A4',
                  fontFamily: 'consolas',
                }}
                rows="40"
                className="form-control"
                onChange={onCodeChange}
                name="code"
                value={code}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                compile
              </button>
            </div>
          </form>
        </div>

        <div
          className="col-2"
          style={{
            float: 'none',
            margin: '0 auto',
            marginTop: '15px',
          }}
        >
          <div className="form-group">
            <textarea
              spellcheck="false"
              rows="40"
              style={{
                width: '180%',
                backgroundColor: '#212121',
                color: '#A4A4A4',
                fontFamily: 'consolas',
              }}
              className="form-control"
              value={result}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
