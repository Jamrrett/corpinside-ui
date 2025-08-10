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
}

export const getArticlesByCorporationIdGroupBySortId = (corporationId) => {
  return articles.filter(article => article.corporationId === corporationId).reduce((acc, article) => {
    if (!acc[article.sortId]) {
      acc[article.sortId] = [];
    }
    acc[article.sortId].push(article);
    return acc;
  }, {});
}

export const getArticlesByDepartmentIdGroupBySortId = (departmentId) => {
  return articles.filter(article => article.departmentId === departmentId).reduce((acc, article) => {
    if (!acc[article.sortId]) {
      acc[article.sortId] = [];
    }
    acc[article.sortId].push(article);
    return acc;
  }, {});
}

export const getArticlesBySortId = (sortId, pagination, corporationId, departmentId) => {
  const { current, size } = pagination;
  let articlesBySortId;
  if (departmentId) {
    articlesBySortId = sortedArticles.filter(article => article.sortId === sortId && article.departmentId === departmentId);
  } else if (corporationId) {
    articlesBySortId = sortedArticles.filter(article => article.sortId === sortId && article.corporationId === corporationId);
  } else {
    articlesBySortId = sortedArticles.filter(article => article.sortId === sortId);
  }
  return {
    data: articlesBySortId.slice((current - 1) * size, current * size),
    total: articlesBySortId.length,
  };
}

export const getRecommendArticles = (count) => {
  let recommendArticles = [];
  for (const article of articles) {
    if (article.recommendStatus) {
      article.sort = getSortInfoById(article.sortId);
      recommendArticles.push(article);
    }
    if (recommendArticles.length >= count) {
      break;
    }
  }
  return recommendArticles;
}
