import { useState } from 'react';

const CodeEditor = ({ setResult }) => {
  const [code, setCode] = useState('');

  const HandleCodeSubmit = async (event) => {
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

  const HandleCodeChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <>
      <form onSubmit={HandleCodeSubmit}>
        <div
          className="form-group"
          style={{
            marginBottom: '15px',
            marginTop: '15px',
          }}
        >
          <textarea
            spellCheck="false"
            style={{
              width: '300%',
              backgroundColor: '#212121',
              color: '#A4A4A4',
              fontFamily: 'consolas',
            }}
            rows="40"
            className="form-control"
            onChange={HandleCodeChange}
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
    </>
  );
};
export default CodeEditor;
