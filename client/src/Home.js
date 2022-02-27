import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import Output from './Output';
import Title from './Title';

const Home = ({ user, setUser, setIsLoggedIn }) => {
  const [contents, setContents] = useState([]);
  const [result, setResult] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/codes', {
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('login-token'),
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((datas) => {
        datas.forEach((data) => {
          setContents((prev) => [...prev, data]);
        });
      });
  }, []);

  return (
    <div
      style={{
        marginBottom: '100px',
      }}
    >
      <Title user={user} />
      <div
        className="row"
        style={{
          textAlign: 'center',
        }}
      >
        <div className="col">
          <h2
            style={{
              fontFamily: 'Shippori Antique B1',
            }}
          >
            source code
          </h2>
        </div>
        <div className="col">
          <h2
            style={{
              fontFamily: 'Shippori Antique B1',
            }}
          >
            result
          </h2>
        </div>
      </div>
      <div className="row">
        <div
          className="col-1"
          style={{
            marginTop: '15px',
            marginLeft: '30px',
          }}
        >
          <ul>
            {contents.map((content) => (
              <li
                id={content.name}
                onClick={(event) => {
                  const name = event.currentTarget.getAttribute('id');

                  setCode(
                    contents.find((content) => content.name == name).content
                  );
                }}
                style={{
                  fontFamily: 'consolas',
                  backgroundColor: 'gray',
                  marginBottom: '5px',
                }}
              >
                {content.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-4">
          <CodeEditor
            setContents={setContents}
            user={user}
            setResult={setResult}
            code={code}
            setCode={setCode}
          />
        </div>
        <div
          className="col-4"
          style={{
            marginTop: '15px',
          }}
        >
          <Output
            setUser={setUser}
            result={result}
            setIsLoggedIn={setIsLoggedIn}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
