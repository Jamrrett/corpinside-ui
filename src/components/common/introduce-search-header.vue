<template>
  <div class="introduce-search-container">
    <div class="introduce-search-box">
      <div class="introduce-search-box__logo">
        <span>{{$store.state.webInfo.webName}}</span>
      </div>
      <div class="introduce-search-box__description">
          <span>{{$store.state.webInfo.webDescription}}</span>
      </div>
      <div class="introduce-search-box__search">
        <input class="ais-SearchBox-input" type="text"
               v-model.lazy="searchContent"
               placeholder="搜索公司、文章..." maxlength="32">
        <div class="ais-SearchBox-button" @click="handleResearch">
          搜索
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchContent: ''
    };
  },
  methods: {
    handleResearch() {
      this.$message.success('功能开发中');
      // if (!this.$common.isEmpty(this.searchContent)) {
      //   window.open(`/search?q=${this.searchContent}`);
      // }
    }
  }
}
</script>

<style scoped lang="less">
.introduce-search-container {
  cursor: default;
  width: 90%;
  padding: 30px 0 0;
  margin: 0 auto;
  overflow: hidden;
}

.introduce-search-box {
  contain: content;
  background: linear-gradient(-45deg, var(--theme-blue), var(--theme-pink), var(--theme-purple));
  width: 100%;
  height: 72px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  color: var(--white-content);

  &__logo {
    flex: 0 0 auto;
    padding-left: 20px;
    font-size: 25px;
    font-weight: bold;
  }

  &__description {
    flex: 1;
    font-size: 19px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__search {
    flex: 0 0 auto;
    padding-right: 20px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
}

.ais-SearchBox-input {
  padding: 0 14px;
  height: 35px;
  width: 250px;
  outline: 0;
  border: 2px solid var(--theme-green);
  border-radius: 12px;
  color: var(--grey-content);
  background: var(--content-background-color);
}

.ais-SearchBox-button {
  display: flex;
  height: 35px;
  width: 60px;
  border-radius: 12px;
  cursor: pointer;
  color: var(--white-content);
  font-size: 14px;
  font-weight: bold;
  background-color: var(--theme-green);
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1072px) {
  .introduce-search-box__description {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .introduce-search-box__logo {
    display: none;
  }

  .introduce-search-box__search {
    width: 100%;
    padding: 0 20px;

    .ais-SearchBox-input {
      width: 100%;
    }
  }
}
</style>
