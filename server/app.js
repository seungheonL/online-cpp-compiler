import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import child_process from 'child_process';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
const exec = child_process.exec;
const execFile = child_process.execFile;
const fsPromises = fs.promises;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));

const createExeFile = () => {
  return new Promise((resolve, reject) => {
    exec('g++ main.cpp', (err, stdout, stderr) => {
      if (!err) {
        resolve();
      } else {
        reject(stderr);
      }
    });
  });
};

let users = [
  {
    email: '1234@naver.com',
    password: '$2b$10$0l5srYUyerNIQp74OVUgGOEodLzuy8YQfDH9JN68N5rceZ6ijxDEa', //1234를 hash한 결과
  },
  {
    email: '5678@naver.com',
    password: '$2b$10$2L/F3KYN6PGCTrIuKbzWmOVHUHFz.NxAOIn2cyfu0aojyVTTxQFcm', //5678을 hash한 결과
  },
];

let codes = [
  {
    writer: '1234@naver.com',
    contents: [
      {
        name: 'helloworld.cpp',
        content: `#include <iostream>

        int main() {
          std::cout << "Hello, World!!" << std::endl;
          return 0;
        }`,
      },
      {
        name: 'class.cpp',
        content: `#include <iostream>
        #include <string>
        
        class Base {
          std::string s;
        
         public:
          Base() : s("기반") { std::cout << "기반 클래스" << std::endl; }
        
          void what() { std::cout << s << std::endl; }
        };
        class Derived : public Base {
          std::string s;
        
         public:
          Derived() : s("파생"), Base() { std::cout << "파생 클래스" << std::endl; }
        
          void what() { std::cout << s << std::endl; }
        };
        int main() {
          Base p;
          Derived c;
        
          std::cout << "=== 포인터 버전 ===" << std::endl;
          Base* p_c = &c;
          p_c->what();
        
          return 0;
        }`,
      },
    ],
  },
];

app.post('/save', (req, res) => {
  const { fileName, code, user } = req.body;

  const found = codes.find((code) => code.writer == user.email);

  if (found) {
    found.contents.push({
      name: fileName,
      content: code,
    });
  } else {
    codes.push({
      writer: user.email,
      contents: [{ name: fileName, content: code }],
    });
  }

  res.json({ message: 'success' });
});

app.post('/codes', (req, res) => {
  const { token } = req.body;
  console.log(token);

  const decoded = jwt.verify(token, SECRET_KEY);
  console.log(decoded);

  const { contents } = codes.find((code) => code.writer == decoded.email);

  res.json(contents);
});

app.get('/auth', (req, res) => {
  const token = req.header('Authorization');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ email: decoded.email });
  } catch {
    res.json({ message: 'invalid token' });
  }
});

app.post('/signup', async (req, res) => {
  const { email, password1 } = req.body;

  const saltRounds = 10;
  const encrypted = await bcrypt.hash(password1, saltRounds);

  const user = users.find((user) => user.email == email);

  if (user) {
    res.json({ message: 'existing email' });
  } else {
    users.push({ email, password: encrypted });
    res.json({ message: 'success' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email == email);

  if (!user) {
    console.log('wrong email');
    res.json({ message: 'wrong email' });
  } else {
    const found = await bcrypt.compare(password, user.password);

    if (found) {
      console.log('login success');

      const token = jwt.sign(
        {
          type: 'JWT',
          email: user.email,
          createdAt: new Date(),
        },
        SECRET_KEY,
        {
          expiresIn: '60m',
        }
      );

      console.log(token);

      const decoded = jwt.verify(token, SECRET_KEY);
      console.log(decoded);

      console.log(decoded.email);

      res.json({ token, userEmail: decoded.email });
    } else {
      console.log('wrong password');
      res.json({ message: 'wrong password' });
    }
  }
});

app.post('/compile', async (req, res) => {
  const code = req.body.code;

  await fsPromises.writeFile('main.cpp', code, (err) => {
    if (err) {
      console.log(err);
    }
  });

  createExeFile()
    .then(() => {
      execFile('./a.exe', (err, data) => {
        exec('rm main.cpp');
        exec('rm a.exe');

        res.json(data.toString());
      });
    })
    .catch((err) => {
      exec('rm main.cpp');

      res.json(err);
    });
});

app.listen(8080, () => {
  console.log('server is running on port 8080');
});
