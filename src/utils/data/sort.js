import sorts from '@/data/sorts.json';

export const getSortInfo = () => {
  return sorts;
}

export const getSortInfoById = (id) => {
  return sorts.find(sort => sort.id === id);
}
