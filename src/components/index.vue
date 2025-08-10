<template>
  <div class="page-container-wrapper">
    <IntroduceSearchHeader />
    <div v-if="!$common.isEmpty($store.state.webInfo.notices)" class="announcement-container">
      <div class="announcement background-opacity">
        <i class="fa fa-volume-up" aria-hidden="true"></i>
        <div>
          <div v-for="(notice, index) in $common.pushNotification($store.state.webInfo.notices, true)" :key="index">
            {{ notice }}
          </div>
        </div>
      </div>
    </div>

    <div class="page-container">
      <div class="left-container">
        <div ref="sortCorporationContainer">
          <div v-for="(sortCorporation, index) in sortCorporationInfo" :key="index" style="margin-bottom: 20px">
            <div v-if="!$common.isEmpty(sliceSortCorporations[sortCorporation.id])">
              <div class="sort-corporation-header">
                <router-link :to="{ path: `/sortCorporation/${sortCorporation.id}` }"
                     class="sort-corporation-header-more">
                  <SvgIcon name="app" :size="20" />
                  <span>{{sortCorporation.sortName}}</span>
                </router-link>
                <router-link :to="{ path: `/sortCorporation/${sortCorporation.id}` }"
                     class="sort-corporation-header-more">
                  <SvgIcon name="forward" :size="20" />
                  <span>MORE</span>
                </router-link>
              </div>
              <sortCorporation
                :corporationList="sliceSortCorporations[sortCorporation.id]"
                :corporationListNum="corporationListNum"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="right-container">
        <articleAside></articleAside>
      </div>
    </div>
  </div>
</template>

<script>
const IntroduceSearchHeader = () => import( './common/introduce-search-header');
const sortCorporation = () => import( './common/sortCorporation');
const articleAside = () => import( './common/recommend-article.vue');
const SvgIcon = () => import( './icon');
import { getListSortCorporationLimit10 } from '@/utils/data/corporation';
import { getCorporationItemColumnSize } from "@/utils/helper";

export default {
  components: {
    IntroduceSearchHeader,
    sortCorporation,
    articleAside,
    SvgIcon,
  },

  data() {
    return {
      sortCorporations: {},
      sliceSortCorporations: {},
      corporationListNum: 4,
      resizeObserver: null,
    };
  },

  created() {
    this.getSortCorporations();
  },

  mounted() {
    const container = this.$refs.sortCorporationContainer;
    this.corporationListNum = getCorporationItemColumnSize(container.offsetWidth);
    for (const key of Object.keys(this.sortCorporations)) {
      if (!this.$common.isEmpty(this.sortCorporations[key])) {
        // 这里需要使用 this.$set 保证响应式
        // 否则特殊情况下 sliceSortCorporations 为空时，直接赋值不会触发更新
        this.$set(
          this.sliceSortCorporations,
          key,
          this.sortCorporations[key].slice(0, 2 * this.corporationListNum)
        );
      }
    }

    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.corporationListNum = getCorporationItemColumnSize(entry.contentRect.width);
        for (const key of Object.keys(this.sortCorporations)) {
          if (!this.$common.isEmpty(this.sortCorporations[key])) {
            // 这里需要使用 this.$set 保证响应式
            // 否则特殊情况下 sliceSortCorporations 为空时，直接赋值不会触发更新
            this.$set(
              this.sliceSortCorporations,
              key,
              this.sortCorporations[key].slice(0, 2 * this.corporationListNum)
            );
          }
        }
      }
    });
    this.resizeObserver.observe(container);
  },

  beforeDestroy() {
    if (this.resizeObserver) {
      const container = this.$refs.sortCorporationContainer;
      this.resizeObserver.unobserve(container);
      this.resizeObserver.disconnect();
    }
  },

  computed: {
    sortCorporationInfo() {
      return this.$store.state.sortCorporationInfo;
    }
  },

  methods: {
    getSortCorporations() {
      this.sortCorporations = getListSortCorporationLimit10();
    },
  }
};
</script>

<style scoped lang="less">
.sort-corporation-header {
  margin: 5px auto 10px;
  display: flex;
  justify-content: space-between;
  color: var(--grey-content);
  border-bottom: 1px dashed var(--list-item-border);
  padding-bottom: 5px;

  &-more {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
    color: inherit;
    line-height: 22px;

    &:hover {
      color: var(--theme-green);
    }
  }
}

.announcement-container {
  width: 90%;
  margin: 20px auto;

  .announcement {
    padding: 10px;
    border: 1px dashed var(--lightGray);
    color: var(--grey-content);
    border-radius: 10px;
    display: flex;
  }

  .announcement i {
    color: var(--themeBackground);
    font-size: 22px;
    margin: auto 0;
  }

  .announcement div div {
    margin-left: 20px;
    line-height: 30px;
  }
}
</style>
