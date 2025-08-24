<template>
  <div>
    <div>
      <el-tag effect="dark" class="my-tag">
        <svg viewBox="0 0 1024 1024" width="20" height="20" style="vertical-align: -4px;">
          <path
            d="M767.1296 808.6528c16.8448 0 32.9728 2.816 48.0256 8.0384 20.6848 7.1168 43.52 1.0752 57.1904-15.9744a459.91936 459.91936 0 0 0 70.5024-122.88c7.8336-20.48 1.0752-43.264-15.9744-57.088-49.6128-40.192-65.0752-125.3888-31.3856-185.856a146.8928 146.8928 0 0 1 30.3104-37.9904c16.2304-14.5408 22.1696-37.376 13.9264-57.6a461.27104 461.27104 0 0 0-67.5328-114.9952c-13.6192-16.9984-36.4544-22.9376-57.0368-15.8208a146.3296 146.3296 0 0 1-48.0256 8.0384c-70.144 0-132.352-50.8928-145.2032-118.7328-4.096-21.6064-20.736-38.5536-42.4448-41.8304-22.0672-3.2768-44.6464-5.0176-67.6864-5.0176-21.4528 0-42.5472 1.536-63.232 4.4032-22.3232 3.1232-40.2432 20.48-43.52 42.752-6.912 46.6944-36.0448 118.016-145.7152 118.4256-17.3056 0.0512-33.8944-2.9696-49.3056-8.448-21.0432-7.4752-44.3904-1.4848-58.368 15.9232A462.14656 462.14656 0 0 0 80.4864 348.16c-7.6288 20.0192-2.7648 43.008 13.4656 56.9344 55.5008 47.8208 71.7824 122.88 37.0688 185.1392a146.72896 146.72896 0 0 1-31.6416 39.168c-16.8448 14.7456-23.0912 38.1952-14.5408 58.9312 16.896 41.0112 39.5776 79.0016 66.9696 113.0496 13.9264 17.3056 37.2736 23.1936 58.2144 15.7184 15.4112-5.4784 32-8.4992 49.3056-8.4992 71.2704 0 124.7744 49.408 142.1312 121.2928 4.9664 20.48 21.4016 36.0448 42.24 39.168 22.2208 3.328 44.9536 5.0688 68.096 5.0688 23.3984 0 46.4384-1.792 68.864-5.1712 21.3504-3.2256 38.144-19.456 42.7008-40.5504 14.8992-68.8128 73.1648-119.7568 143.7696-119.7568z"
            fill="#8C7BFD"></path>
          <path
            d="M511.8464 696.3712c-101.3248 0-183.7568-82.432-183.7568-183.7568s82.432-183.7568 183.7568-183.7568 183.7568 82.432 183.7568 183.7568-82.432 183.7568-183.7568 183.7568z m0-265.1648c-44.8512 0-81.3568 36.5056-81.3568 81.3568S466.9952 593.92 511.8464 593.92s81.3568-36.5056 81.3568-81.3568-36.5056-81.3568-81.3568-81.3568z"
            fill="#FFE37B"></path>
        </svg>
        统计信息
      </el-tag>

      <!-- 总览 -->
      <div>
        <div class="web-data-container">
          <div class="card-row">
            <div v-for="(item, index) in webDataInfo.totalCountInfo" :key="index" :class="['stat-card', `bg-${index + 1}`]">
              <div class="card-name">{{ item.key }}</div>
              <div class="card-number">{{ item.value }}</div>
            </div>
          </div>
          <!-- 第二行：两个表格 -->
          <div class="second-row">
            <div class="table-item" v-for="(item, index) in webDataInfo.sortCountInfo" :key="index">
              <div class="table-title">{{ item.key }}</div>
              <el-table :data="item.value">
                <el-table-column prop="key" label="分类名称" align="center" />
                <el-table-column prop="value" label="数量" align="center" />
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getWebDataInfo} from '@/utils/data/admin';

export default {
  data() {
    return {
      webDataInfo: [],
    };
  },

  created() {
    this.getWebDataInfo();
  },

  methods: {
    getWebDataInfo() {
      this.webDataInfo = getWebDataInfo();
      this.webDataInfo.totalCountInfo = this.turnObjectToTableArray(this.webDataInfo.totalCountInfo);
      this.webDataInfo.sortCountInfo = this.turnObjectToTableArray(this.webDataInfo.sortCountInfo);
      console.log(this.webDataInfo);
    },
    turnObjectToTableArray(object) {
      let array = [];
      for (let key in object) {
        array.push({
          key: key,
          value: typeof object[key] === 'object' ? this.turnObjectToTableArray(object[key]) : object[key],
        })
      }
      return array;
    }
  }
};
</script>

<style scoped>

  .my-tag {
    width: 100%;
    text-align: left;
    background: var(--lightYellow);
    border: none;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: var(--black);
  }

  .el-tag {
    margin: 10px;
  }

  .web-data-container {
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .card-row {
    display: flex;
    gap: 40px;
    margin-bottom: 32px;
    background: var(--theme-background);

    .stat-card {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 20px 40px;
      color: var(--white-content);
      border-radius: 10px;
      box-shadow:
        0 10px 0 0 var(--background),
        0 -10px 0 0 var(--background),
        40px 0 0 0 var(--background),
        -40px 0 0 0 var(--background);

      .card-name {
        font-size: 20px;
        font-weight: 600;
      }

      .card-number {
        font-size: 50px;
        font-weight: bold;
        text-align: right;
        margin-top: 10px;
      }
    }
  }

  .second-row {
    display: flex;
    gap: 40px;

    .table-item {
      flex: 1;
      border-radius: 6px;
      overflow: hidden;

      .table-title {
        padding: 10px 20px;
        background-color: var(--label-background);
        border-bottom: 1px solid #EBEEF5;
        font-weight: bold;
      }
    }
  }

  .el-table {
    tr {
      background: var(--content-background-color) !important;

      .el-table__cell {
        background: var(--content-background-color) !important;
      }
    }
  }

</style>
