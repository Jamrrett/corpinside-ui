<template>
  <div class="error-container">
    <div class="error-content">
      <span class="error-code">404 Not Found</span>
      <router-link class="error-backhome" :to="{ path: '/' }">
        <span>返回主页</span>
      </router-link>
    </div>
    <div class="error-tips">
      <span>为什么你会看到此页面？</span>
      <span>
        1. 你输入的路径有误<br />
        2. 你在非根路径下刷新了界面（因为目前github-pages不支持）<br />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
</script>

<style lang="less" scoped>
.error-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .error-content {
    margin: 50px auto;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .error-code {
      font-size: 50px;
      font-weight: bold;
    }

    .error-backhome {
      font-size: 18px;
      color: var(--theme-green);
      cursor: pointer;

      &:hover {
        color: var(--theme-green-hover);
      }
    }
  }

  .error-tips {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;
  }
}
</style>
