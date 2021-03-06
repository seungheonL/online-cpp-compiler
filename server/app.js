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

import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qq1ux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
  dbName: 'online-cpp-compiler',
});

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('users', UserSchema);

let codes = [];

app.post('/save', (req, res) => {
  const { fileName, code, user } = req.body;

  let foundCode = codes.find((code) => code.writer == user.email);

  if (foundCode) {
    const foundContent = foundCode.contents.find(
      (content) => content.name == fileName
    );

    if (foundContent) {
      foundContent.content = code;
      console.log(codes);
    } else {
      foundCode.contents.push({
        name: fileName,
        content: code,
      });
    }
  } else {
    foundCode = {
      writer: user.email,
      contents: [{ name: fileName, content: code }],
    };

    codes.push({
      writer: user.email,
      contents: [{ name: fileName, content: code }],
    });
  }

  res.json(foundCode);
});

app.post('/codes', (req, res) => {
  const { token } = req.body;

  const decoded = jwt.verify(token, SECRET_KEY);

  const foundCode = codes.find((code) => code.writer == decoded.email);

  if (foundCode) {
    res.json(foundCode.contents);
  } else {
    res.json({});
  }
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

  User.findOne(
    {
      email,
    },
    (err, user) => {
      if (user) {
        res.json({ message: 'existing email' });
      } else {
        const newUser = new User({ email, password: encrypted });
        newUser.save().then(() => {
          res.json({ message: 'success' });
        });
      }
    }
  );
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  User.findOne(
    {
      email,
    },
    async (err, user) => {
      if (!user) {
        res.json({ message: 'wrong email' });
      } else {
        const found = await bcrypt.compare(password, user.password);

        if (found) {
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

          const decoded = jwt.verify(token, SECRET_KEY);

          res.json({ token, userEmail: decoded.email });
        } else {
          res.json({ message: 'wrong password' });
        }
      }
    }
  );
});

app.post('/compile', async (req, res) => {
  const code = req.body.code;

  await fsPromises.writeFile('main.cpp', code, (err) => {
    if (err) {
    }
  });

  createExeFile()
    .then(() => {
      execFile('./a.out', (err, data) => {
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
