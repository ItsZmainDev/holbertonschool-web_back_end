export default function updateStudentGradeByCity(list, city, newGrades) {
  if (!Array.isArray(list)) return [];
  const grades = Array.isArray(newGrades) ? newGrades : [];

  return list
    .filter((s) => s.location === city)
    .map((s) => {
      const found = grades.find((g) => g.studentId === s.id);
      return { ...s, grade: found && found.grade !== undefined ? found.grade : 'N/A' };
    });
}
