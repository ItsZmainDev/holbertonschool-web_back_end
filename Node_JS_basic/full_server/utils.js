import fs from 'fs';

export default function readDatabase(path) {
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
        resolve({});
        return;
      }

      const header = lines[0].split(',');
      const fieldIndex = header.indexOf('field');
      const firstNameIndex = header.indexOf('firstname');

      const map = {};

      for (const line of lines.slice(1)) {
        const cells = line.split(',');
        if (cells.length < Math.max(fieldIndex, firstNameIndex) + 1) continue;
        const field = cells[fieldIndex].trim();
        const firstname = cells[firstNameIndex].trim();
        if (!field || !firstname) continue;

        if (!map[field]) map[field] = [];
        map[field].push(firstname);
      }

      resolve(map);
    });
  });
}
