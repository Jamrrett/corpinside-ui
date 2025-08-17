<template>
  <div v-if="!$common.isEmpty(corporationList)" class="sort-corporation-items">
    <router-link
      :to="{ path: `/corporation/${corporation.id}` }"
      class="sort-corporation-item" :style="{ width: corporationListWidth }"
      v-for="(corporation, index) in corporationList"
      :key="index"
    >
      <div class="sort-corporation-item__content">
        <div class="sort-corporation-item__content-image">
          <el-image class="my-el-image"
                    style="border-radius: 10px;"
                    v-once
                    lazy
                    :src="BASE_URL + corporation.corporationLogo"
                    fit="cover">
            <div slot="error" class="image-slot myCenter" style="background-color: var(--theme-green)">
              <div class="error-text">
                <span>{{ corporation.corporationTitle }}</span>
              </div>
            </div>
          </el-image>
        </div>
        <div>
          <span>{{ corporation.corporationTitle }}</span>
        </div>
      </div>
      <!-- 内容 -->
      <div class="sort-corporation-item__info">
        <div class="sort-corporation-item__info-item">
          <SvgIcon name="technology" :size="15" />
          <span>{{ corporation.industry }}</span>
        </div>
        <div class="sort-corporation-item__info-item">
          <SvgIcon name="building" :size="15" />
          <span class="sort-corporation-item__info-item__common">成立于 {{ corporation.foundedYear }} 年</span>
          <span class="sort-corporation-item__info-item__small">{{ corporation.foundedYear }}</span>
        </div>
      </div>
      <div class="sort-corporation-item__article">
        <router-link class="sort-corporation-item__article-item" :to="{path: '/sort/1'}">
          <SvgIcon name="interview" :size="16" />
          <span>{{ "面试经验" }}</span>
        </router-link>
        <router-link class="sort-corporation-item__article-item" :to="{path: '/sort/2'}">
          <SvgIcon name="work" :size="16" />
          <span>{{ "工作体验" }}</span>
        </router-link>
      </div>
    </router-link>
  </div>
</template>

<script>
const SvgIcon = () => import('@/components/icon');

export default {
  components: {
    SvgIcon,
  },

  props: {
    corporationList: {
      type: Array,
    },
    corporationListNum: {
      type: Number,
      default: 4,
    },
  },

  data() {
    return {
      BASE_URL: process.env.BASE_URL,
    };
  },

  computed: {
    corporationListWidth() {
      if (this.corporationListNum > 0) {
        return `calc(100% / ${this.corporationListNum} - 20px)`;
      }
      return 'calc(100% - 20px)';
    },
  },
};
</script>

<style scoped lang="less">

.sort-corporation-items {
  display: flex;
  flex-wrap: wrap;

  .sort-corporation-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    user-select: none;
    border-radius: 10px;
    overflow: hidden;
    margin: 10px;
    height: 135px;
    flex-shrink: 0;
    cursor: pointer;
    animation: hideToShow 0.8s ease-in-out;
    box-shadow: 0 1px 10px -6px var(--borderColor);
    background-color: var(--content-background-color-light);

    &:hover {
      box-shadow: var(--hover-box-shadow);
    }

    &__content {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 15px 15px 4px;
      font-size: 17px;

      &-image {
        width: 60px;
        height: 60px;
        flex-shrink: 0;
      }
    }

    &__info {
      padding: 0 15px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      color: var(--grey-content);

      &-item {
        display: flex;
        align-items: center;
        gap: 4px;

        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &__small {
          display: none;
        }
      }
    }

    &__article {
      padding: 0 15px;
      display: flex;
      align-items: center;
      gap: 14px;

      &-item {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 2px 4px;
        background-color: var(--label-background);
        border-radius: 3px;
        font-size: 13px;
        color: var(--grey-content);
        transition: all 0.3s;

        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      &-item:hover {
        background-color: var(--theme-green);
        color: var(--white);
      }
    }
  }
}

.error-text {
  font-size: 12px;
  line-height: 1.8;
  color: var(--white-content);
  text-align: center;
}

@media screen and (max-width: 520px) {
  .sort-corporation-items {
    .error-text {
      font-size: 9px;
    }

    .sort-corporation-item {
      height: 90px;

      &__content {
        padding: 10px 10px 2px;
        font-size: 14px;

        &-image {
          width: 50px;
          height: 50px;
        }
      }

      &__info {
        padding: 0 10px;
        font-size: 10px;
      }

      &__article {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 440px) {
  .sort-corporation-items {
    .sort-corporation-item {
      &__info {
        &-item {
          &__common {
            display: none;
          }

          &__small {
            display: inline;
          }
        }
      }
    }
  }
}

</style>
