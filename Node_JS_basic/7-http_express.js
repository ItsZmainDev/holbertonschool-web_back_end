const express = require('express');
const countStudents = require('./3-read_file_async');

const DB_PATH = process.argv[2];
const app = express();

app.get('/', (_req, res) => {
  res.status(200).send('Hello Holberton School!');
});

app.get('/students', (_req, res) => {
  const firstLine = 'This is the list of our students';
  countStudents(DB_PATH)
    .then(({ fields }) => {
      const lines = [];
      for (const field of Object.keys(fields)) {
        lines.push(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
      }
      res.status(200).send([firstLine, ...lines].join('\n'));
    })
    .catch(() => {
      res.status(200).send(`${firstLine}\nCannot load the database`);
    });
});

app.listen(1245);

module.exports = app;
