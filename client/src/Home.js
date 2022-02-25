import { useState } from 'react';
import CodeEditor from './CodeEditor';
import Output from './Output';
import Title from './Title';

const Home = ({ user }) => {
  const [result, setResult] = useState('');
  return (
    <>
      <Title user={user} />
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
          <CodeEditor setResult={setResult} />
        </div>
        <div
          className="col-2"
          style={{
            float: 'none',
            margin: '0 auto',
            marginTop: '15px',
          }}
        >
          <Output result={result} />
        </div>
      </div>
    </>
  );
};

export default Home;
