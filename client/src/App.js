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
    <div class="container">
      <div class="row">
        <div
          class="col-sm"
          style={{
            marginTop: '15px',
          }}
        >
          <form onSubmit={onCodeSubmit}>
            <div
              class="form-group w-100"
              style={{
                marginBottom: '15px',
              }}
            >
              <textarea
                style={{
                  backgroundColor: '#212121',
                  color: '#A4A4A4',
                }}
                rows="30"
                class="form-control"
                onChange={onCodeChange}
                name="code"
                value={code}
              ></textarea>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" type="submit">
                compile
              </button>
            </div>
          </form>
        </div>

        <div class="col-sm">
          <div
            class="form-group w-100"
            style={{
              marginTop: '15px',
            }}
          >
            <textarea
              style={{
                backgroundColor: '#212121',
                color: '#A4A4A4',
              }}
              rows="30"
              class="form-control"
              value={result}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
