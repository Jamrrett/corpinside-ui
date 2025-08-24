import articles from '@/data/articles.json';
import { getSortInfoById } from "@/utils/data/sort";

const getSortedArticles = () => {
  let sortedArticles;
  if (!sortedArticles) {
    // 对 articles 按照 date 属性降序排序
    sortedArticles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  return sortedArticles;
};

// 按 date 降序排列的 articles
const sortedArticles = getSortedArticles();

export const getArticleById = (id) => {
  return articles.find(article => article.id === id);
};

export const getArticlesByCorporationIdGroupBySortId = (corporationId) => {
  return articles.filter(article => article.corporationId === corporationId).reduce((acc, article) => {
    if (!acc[article.sortId]) {
      acc[article.sortId] = [];
    }
    acc[article.sortId].push(article);
    return acc;
  }, {});
};

export const getArticlesByDepartmentIdGroupBySortId = (departmentId) => {
  return articles.filter(article => article.departmentId === departmentId).reduce((acc, article) => {
    if (!acc[article.sortId]) {
      acc[article.sortId] = [];
    }
    acc[article.sortId].push(article);
    return acc;
  }, {});
};

export const listArticle = (pagination) => {
  const { current, size, sortId, corporationId, departmentId, userId } = pagination;
  let articlesBySortId = sortedArticles;
  if (sortId) {
    articlesBySortId = articlesBySortId.filter(article => article.sortId === sortId);
  }
  if (corporationId) {
    articlesBySortId = articlesBySortId.filter(article => article.corporationId === corporationId);
  }
  if (departmentId) {
    articlesBySortId = sortedArticles.filter(article => article.sortId === sortId && article.departmentId === departmentId);
  }
  if (userId) {
    articlesBySortId = articlesBySortId.filter(article => article.userId === userId);
  }
  return {
    data: articlesBySortId.slice((current - 1) * size, current * size),
    total: articlesBySortId.length,
  };
};

export const getRecommendArticles = (count) => {
  let recommendArticles = [];
  for (const article of sortedArticles) {
    if (article.recommendStatus) {
      article.sort = getSortInfoById(article.sortId);
      recommendArticles.push(article);
    }
    if (recommendArticles.length >= count) {
      break;
    }
  }
  return recommendArticles;
};

export const getNewArticleId = () => {
  return (articles.length + 1).toString();
};
