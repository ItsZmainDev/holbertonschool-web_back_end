const http = require('http');
const fs = require('fs');
const url = require('url');

function countStudents(path) {
    return fs.readFile(path, 'utf8')
        .then((data) => {
            const lines = data.split('\n').filter(line => line.trim() !== '');
            if (lines.length < 2) {
                console.log('Number of students: 0');
                return;
            }
            const students = lines.slice(1).map(line => line.split(','));
            const fields = {};
            students.forEach(student => {
                const [firstname, , , field] = student;
                if (!fields[field]) {
                    fields[field] = [];
                }
                fields[field].push(firstname);
            });
            console.log(`Number of students: ${students.length}`);
            for (const [field, names] of Object.entries(fields)) {
                console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
            }
        })
        .catch(() => {
            throw new Error('Cannot load the database');
        });
}

const app = http.createServer(async (req, res) => {
  const reqUrl = url.parse(req.url, true);
  res.setHeader('Content-Type', 'text/plain');
  if (reqUrl.pathname === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (reqUrl.pathname === '/students') {
    res.statusCode = 200;
    res.write('This is the list of our students\n');
    const dbPath = process.argv[2];
    try {
      const studentsList = await countStudents(dbPath);
      res.end(studentsList);
    } catch (err) {
      res.end(err.message);
    }
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;
