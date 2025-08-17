import corporations from '@/data/corporations.json';
import sortCorporations from '@/data/sortCorporations.json';

export const getCorporationById = (id) => {
  return corporations.find(corporation => corporation.id === id);
}

export const getListSortCorporationLimit10 = () => {
  // 初始化一个空对象，用于按 sortCorporationId 分组存储公司
  const groupedCorporations = {};
  // 遍历 corporations 数组，将公司按 sortCorporationId 分组
  for (const corporation of corporations) {
    const sortId = corporation.sortId;
    if (!groupedCorporations[sortId]) {
      groupedCorporations[sortId] = [];
    }
    groupedCorporations[sortId].push(corporation);
  }

  // 初始化结果对象
  const listSortCorporationLimit10 = {};
  // 遍历每个 sortCorporationId
  for (const sortCorporation of sortCorporations) {
    const corpList = groupedCorporations[sortCorporation.id] || [];
    // 截取前 10 个公司
    listSortCorporationLimit10[sortCorporation.id] = corpList.slice(0, 10);
  }
  return listSortCorporationLimit10;
}

export const getCorporationsBySortId = (sortId, pagination) => {
  const { current, size } = pagination;
  let corporationsBySortId = corporations.filter(corporation => corporation.sortId === sortId);
  return {
    data: corporationsBySortId.slice((current - 1) * size, current * size),
    total: corporationsBySortId.length,
  };
}

export const getCorporationTitles = () => {
  return corporations.map(item => ({
    id: item.id,
    corporationTitle: item.corporationTitle,
  }));
};
