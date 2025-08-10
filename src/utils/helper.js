import $constant from "@/utils/constant";

export const checkIsShareBlog = (sortId) => {
  return sortId === $constant.ArticleType.SHARE;
};

export const getCorporationItemColumnSize = (containerWidth) => {
  if (containerWidth < 680) {
    return 2;
  } else if (containerWidth < 900) {
    return 3;
  } else if (containerWidth < 1200) {
    return 4;
  } else {
    return 5;
  }
};
