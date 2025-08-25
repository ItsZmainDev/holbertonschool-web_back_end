export default function getListStudentIds(list) {
    if (Array.isArray(list)) {
        return list.map((student) => student.id);
    }
    return [];
}
