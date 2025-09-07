const fs = require('fs');

function countStudents(path) {
  let data;
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (err) {
    throw new Error('Cannot load the database');
  }

  const lines = data
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length <= 1) {
    console.log('Number of students: 0');
    return;
  }

  const header = lines[0].split(',');
  const fieldIndex = header.indexOf('field');
  const firstNameIndex = header.indexOf('firstname');

  const groups = {};
  const students = [];

  for (const line of lines.slice(1)) {
    const cells = line.split(',');
    if (cells.length < Math.max(fieldIndex, firstNameIndex) + 1) continue;
    const field = cells[fieldIndex].trim();
    const firstname = cells[firstNameIndex].trim();
    if (!field || !firstname) continue;

    if (!groups[field]) groups[field] = [];
    groups[field].push(firstname);
    students.push(firstname);
  }

  console.log(`Number of students: ${students.length}`);
  for (const field of Object.keys(groups)) {
    console.log(`Number of students in ${field}: ${groups[field].length}. List: ${groups[field].join(', ')}`);
  }
}

module.exports = countStudents;
