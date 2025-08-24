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

export const getFormattedCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const copyFormattedData = (formattedNewData) => {
  // 创建临时textarea元素
  const textarea = document.createElement('textarea');
  textarea.value = formattedNewData;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  // 显示复制成功提示
  this.$message({
    type: 'success',
    message: '格式化数据已复制到剪贴板!'
  });
};
