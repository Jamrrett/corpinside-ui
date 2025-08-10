import departments from '@/data/departments.json';

export const getDepartmentById = (id) => {
  return departments.find(department => department.id === id);
}

export const getDepartmentsByCorporationId = (corporationId) => {
  return departments.filter(department => department.corporationId === corporationId);
}
