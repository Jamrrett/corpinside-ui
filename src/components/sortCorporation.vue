<template>
  <div>
    <div style="background: var(--background)">
      <IntroduceSearchHeader />
      <div class="page-container">
        <div ref="sortCorporationContainer" class="sort-corporation-wrapper">
          <div v-if="!$common.isEmpty(corporations)" class="sort-corporation-container">
            <div class="sort-corporation-header">
              <SvgIcon name="app" :size="22" />
              <span class="sort-corporation-name">&thinsp;{{ sortCorporation.sortName }}</span>
            </div>
            <sortCorporation
              :corporationList="corporations"
              :corporationListNum="corporationListNum"
            />
          </div>

          <div class="pagination-wrapper">
            <div @click="loadMore" class="pagination" v-if="pagination.total !== corporations.length">
              下一页
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const IntroduceSearchHeader = () => import( './common/introduce-search-header');
const SvgIcon = () => import( './icon');
const sortCorporation = () => import( './common/sortCorporation');
import { getCorporationsBySortId } from "@/utils/data/corporation";
import { getCorporationItemColumnSize } from "@/utils/helper";

export default {
  components: {
    IntroduceSearchHeader,
    SvgIcon,
    sortCorporation
  },

  data() {
    return {
      sortId: this.$route.params.sortCorporationId,
      sortCorporation: null,
      corporations: [],
      corporationListNum: 4,
      resizeObserver: null,
      pagination: {
        current: 1,
        size: this.$constant.corporationItemDefaultFetchRowCount * this.corporationListNum,
        total: 0,
      },
    };
  },

  watch: {
    $route() {
      this.pagination = {
        current: 1,
        size: this.getFetchSize(),
        total: 0,
      };
      this.corporations.splice(0, this.corporations.length);
      this.sortId = this.$route.params.sortCorporationId;
      this.getCorporations();
    }
  },

  created() {
    this.getSortCorporation();
  },

  mounted() {
    const container = this.$refs.sortCorporationContainer;
    this.corporationListNum = getCorporationItemColumnSize(container.offsetWidth);
    this.pagination.size = this.getFetchSize();
    this.getCorporations();

    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.corporationListNum = getCorporationItemColumnSize(entry.contentRect.width);
        this.pagination.size = this.getFetchSize();
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

  methods: {
    getSortCorporation() {
      let sortCorporationInfo = this.$store.state.sortCorporationInfo;
      if (!this.$common.isEmpty(sortCorporationInfo)) {
        let sortArray = sortCorporationInfo.filter(f => {
          return f.id === this.sortId;
        });
        if (!this.$common.isEmpty(sortArray)) {
          this.sortCorporation = sortArray[0];
        }
      }
    },
    getCorporations() {
      const res = getCorporationsBySortId(this.sortId, this.pagination);
      this.corporations = this.corporations.concat(res.data);
      this.pagination.total = res.total;
    },
    getFetchSize() {
      const viewportHeight = window.innerHeight;
      const fetchRowCount = Math.ceil(viewportHeight / this.$constant.corporationItemHeight) + this.$constant.corporationItemMoreFetchRowCount;
      return (fetchRowCount > this.$constant.corporationItemMoreFetchRowCount ? fetchRowCount : this.$constant.corporationItemDefaultFetchRowCount) * this.corporationListNum;
    },
    loadMore() {
      this.pagination.current += 1;
      this.getCorporations();
    },
  }
};
</script>

<style scoped lang="less">
.sort-corporation-wrapper {
  width: 100%;
}

.sort-corporation-container {
  width: 100%;
}

.sort-corporation-header {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--grey-content);
  border-bottom: 1px dashed var(--list-item-border);
  padding: 0 10px 8px;
  margin-bottom: 10px;

  .sort-corporation-name {
    font-size: 20px;
    line-height: 28px;
  }
}
</style>
