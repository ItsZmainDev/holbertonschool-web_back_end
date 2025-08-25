export default function updateStudentGradeByCity(list, city, newGrades) {
    if (Array.isArray(list)) {
        return list.map((student) => {
            if (student.location === city) {
                return { ...student, grades: newGrades };
            }
            return student;
        });
    }
    return [];
}
