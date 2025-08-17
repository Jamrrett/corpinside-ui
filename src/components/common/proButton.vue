<template>
  <el-button
    class="myButton"
    :size="size"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disable"
  >{{info}}</el-button>
</template>

<script>
export default {
  props: {
    info: {
      type: String,
      default: '确定',
    },
    size: {
      type: String,
      default: 'medium',
    },
    round: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="less">
.myButton {
  cursor: pointer;
  user-select: none;
  color: var(--white-content);
  background-color: var(--theme-green);
  border: none;

  &:hover {
    background-color: var(--theme-green-hover);
  }

  &:active {
    background-color: var(--theme-green-active);
  }
}
</style>
