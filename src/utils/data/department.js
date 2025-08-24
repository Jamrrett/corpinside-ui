import departments from '@/data/departments.json';
import articles from "@/data/articles.json";

export const getDepartmentById = (id) => {
  return departments.find(department => department.id === id);
}

export const getDepartmentsByCorporationId = (corporationId) => {
  return departments.filter(department => department.corporationId === corporationId);
}

export const getDepartmentTitles = () => {
  return departments.map(item => ({
    id: item.id,
    departmentTitle: item.departmentTitle,
  }));
};

export const getNewDepartmentId = () => {
  return (departments.length + 1).toString();
};
