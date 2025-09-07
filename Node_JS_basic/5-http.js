const http = require('http');
const countStudents = require('./3-read_file_async');

const DB_PATH = process.argv[2];

const app = http.createServer((req, res) => {
  const { url } = req;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
    return;
  }

  if (url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n');
    countStudents(DB_PATH)
      .then(({ total, fields }) => {
        const lines = [];
        lines.push(`Number of students: ${total}`);
        for (const field of Object.keys(fields)) {
          lines.push(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
        }
        res.end(lines.join('\n'));
      })
      .catch(() => {
        res.end('Cannot load the database');
      });
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Holberton School!');
});

app.listen(1245);

module.exports = app;
