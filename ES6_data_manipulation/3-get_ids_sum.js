export default function getStudentIdsSum(list) {
    if (Array.isArray(list)) {
        return list.reduce((acc, student) => acc + student.id, 0);
    }
    return 0;
}
