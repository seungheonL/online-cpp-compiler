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
    <div className="container">
      <div className="row">
        <div
          class="col-sm"
          style={{
            marginTop: '15px',
          }}
        >
          <form onSubmit={onCodeSubmit}>
            <div
              className="form-group w-100"
              style={{
                marginBottom: '15px',
              }}
            >
              <textarea
                style={{
                  backgroundColor: '#212121',
                  color: '#A4A4A4',
                  fontFamily: 'consolas',
                }}
                rows="30"
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

        <div className="col-sm">
          <div
            className="form-group w-100"
            style={{
              marginTop: '15px',
            }}
          >
            <textarea
              style={{
                backgroundColor: '#212121',
                color: '#A4A4A4',
                fontFamily: 'consolas',
              }}
              rows="30"
              className="form-control"
              value={result}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
