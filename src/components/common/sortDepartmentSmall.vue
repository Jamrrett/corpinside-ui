<template>
  <div v-if="!$common.isEmpty(departmentList)" class="department-list-container">
    <router-link :to="{ path: `/department/${department.id}` }"
         class="department-list-item wow my-animation-hideToShow"
         v-for="(department, index) in departmentList"
         :key="index">
      <!-- 内容 -->
      <div class="department-list-item-content">
        <!-- 标题 -->
        <div class="department-list-item-header">
          <span>{{ department.departmentTitle }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    departmentList: {
      type: Array
    }
  },
  methods: {},
};
</script>

<style scoped>
.department-list-container {
  display: flex;
  flex-wrap: wrap;
}

.department-list-item {
  user-select: none;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px;
  height: 85px;
  flex-shrink: 0;
  width: calc(100% / 3 - 20px);
  cursor: pointer;
  background-color: var(--content-background-color-light);
  box-shadow: 0 1px 10px -6px var(--borderColor);
}

.department-list-item:hover {
  box-shadow: var(--hover-box-shadow);
}

.department-list-item-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  margin: auto;

  .department-list-item-header {
    text-align: center;
    word-break: break-all;
    font-size: 17px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}

@media screen and (max-width: 1200px) {
  .department-list-item {
    width: calc(100% / 2 - 20px);

    .department-list-item-header {
      font-size: 16px;
    }
  }
}

@media screen and (max-width: 520px) {
  .department-list-item {
    height: 65px;

    .department-list-item-header {
      font-size: 14px;
      -webkit-line-clamp: 2;
    }
  }
}
</style>
