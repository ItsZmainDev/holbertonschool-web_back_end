import readDatabase from '../utils';

function getDBFileFromArgv() {
  return process.argv[2];
}

class StudentsController {
  static async getAllStudents(_req, res) {
    const dbPath = getDBFileFromArgv();
    try {
      const fields = await readDatabase(dbPath);

      const fieldNames = Object.keys(fields).sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

      const lines = ['This is the list of our students'];
      for (const field of fieldNames) {
        const list = fields[field] || [];
        lines.push(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }
      res.status(200).send(lines.join('\n'));
    } catch (err) {
      console.error('Error loading database:', err);
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    const dbPath = getDBFileFromArgv();
    try {
      const fields = await readDatabase(dbPath);
      const list = fields[major] || [];
      res.status(200).send(`List: ${list.join(', ')}`);
    } catch (err) {
      console.error('Error loading database:', err);
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
