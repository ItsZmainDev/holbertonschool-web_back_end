const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = String(data)
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (lines.length <= 1) {
        console.log('Number of students: 0');
        resolve({ total: 0, fields: {} });
        return;
      }

      const header = lines[0].split(',');
      const fieldIndex = header.indexOf('field');
      const firstNameIndex = header.indexOf('firstname');

      const fields = {};
      let total = 0;

      for (const line of lines.slice(1)) {
        const cells = line.split(',');
        if (cells.length < Math.max(fieldIndex, firstNameIndex) + 1) continue;
        const field = cells[fieldIndex].trim();
        const firstname = cells[firstNameIndex].trim();
        if (!field || !firstname) continue;

        if (!fields[field]) fields[field] = [];
        fields[field].push(firstname);
        total += 1;
      }

      console.log(`Number of students: ${total}`);
      for (const field of Object.keys(fields)) {
        console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
      }

      resolve({ total, fields });
    });
  });
}

module.exports = countStudents;
