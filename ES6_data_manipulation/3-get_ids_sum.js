export default function getStudentIdsSum(list) {
  if (!Array.isArray(list)) return 0;
  return list.reduce((acc, s) => acc + (Number(s.id) || 0), 0);
}
