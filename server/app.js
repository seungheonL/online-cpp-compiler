import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import child_process from 'child_process';
import fs from 'fs';

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

app.post('/compile', async (req, res) => {
  const code = req.body.code;

  await fsPromises.writeFile('main.cpp', code, (err) => {
    if (err) {
      console.log(err);
    }
  });

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
