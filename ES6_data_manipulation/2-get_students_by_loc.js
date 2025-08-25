export default function getStudentsByLocation(list, location) {
    if (Array.isArray(list)) {
        return list.filter((student) => student.location === location);
    }
    return [];
}
