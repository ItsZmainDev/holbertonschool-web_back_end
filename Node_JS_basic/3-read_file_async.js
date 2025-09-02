import { promises as fs } from 'fs';

export default function countStudents(path) {
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
