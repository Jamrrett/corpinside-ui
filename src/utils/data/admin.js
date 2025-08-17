import users from '@/data/users.json';
import corporations from '@/data/corporations.json';
import departments from "@/data/departments.json";
import articles from '@/data/articles.json';

export const adminGetUserList = (params) => {
  const { current, size, searchKey, userType } = params;
  let userList = users;
  if (searchKey) {
    userList = userList.filter(item => item.username.includes(searchKey) || item.email.includes(searchKey));
  }
  if (userType) {
    userList = userList.filter(item => item.userType === Number(userType));
  }
  return {
    data: userList.slice((current - 1) * size, current * size),
    total: userList.length,
  };
};

export const adminGetArticleList = (params) => {
  const { current, size, searchKey, recommendStatus, corporationId, departmentId, sortId } = params;
  let articleList = articles;
  if (searchKey) {
    articleList = articleList.filter(item => item.articleTitle.includes(searchKey));
  }
  if (recommendStatus) {
    articleList = articleList.filter(item => item.recommendStatus === recommendStatus);
  }
  if (corporationId) {
    articleList = articleList.filter(item => item.corporationId === corporationId);
  }
  if (departmentId) {
    articleList = articleList.filter(item => item.departmentId === departmentId);
  }
  if (sortId) {
    articleList = articleList.filter(item => item.sortId === sortId);
  }
  return {
    data: articleList.slice((current - 1) * size, current * size),
    total: articleList.length,
  };
};

export const adminGetCorporationList = (params) => {
  const { current, size, searchKey, recommendStatus, sortId } = params;
  let corporationList = corporations;
  if (searchKey) {
    corporationList = corporationList.filter(item => item.corporationTitle.includes(searchKey));
  }
  if (recommendStatus) {
    corporationList = corporationList.filter(item => item.recommendStatus === recommendStatus);
  }
  if (sortId) {
    corporationList = corporationList.filter(item => item.sortId === sortId);
  }
  return {
    data: corporationList.slice((current - 1) * size, current * size),
    total: corporationList.length,
  };
};

export const adminGetDepartmentList = (params) => {
  const { current, size, searchKey, recommendStatus, corporationId } = params;
  let departmentList = departments;
  if (searchKey) {
    departmentList = departmentList.filter(item => item.departmentTitle.includes(searchKey));
  }
  if (recommendStatus) {
    departmentList = departmentList.filter(item => item.recommendStatus === recommendStatus);
  }
  if (corporationId) {
    departmentList = departmentList.filter(item => item.corporationId === corporationId);
  }
  return {
    data: departmentList.slice((current - 1) * size, current * size),
    total: departmentList.length,
  };
};
