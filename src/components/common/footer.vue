<template>
  <div>
    <div class="footer-container">
      <div class="footer-title">{{ $store.state.webInfo.footer }}</div>
      <div class="footer-name">
        <span>{{ $store.state.webInfo.webName }}</span>
        <span>-</span>
        <span>{{ $store.state.webInfo.webDescription }}</span>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped lang="less">
.footer-container {
  cursor: default;
  height: 60px;
  background: var(--grey-background);
  text-align: center;
  color: var(--white-content);
  background-size: 300% 300%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  .footer-title {
    font-size: 16px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .footer-name {
    color: var(--grey-content);
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@media screen and (max-width: 520px) {
  .footer-container {
    .footer-title {
      font-size: 14px;
    }

    .footer-name {
      font-size: 10px;
    }
  }
}
</style>
