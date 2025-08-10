<template>
  <component class="custom-svg-icon" :is="iconComponent" v-bind="$attrs" :size="size" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 16,
    },
  },

  data() {
    return {
      iconComponent: null
    };
  },

  created() {
    this.loadIconComponent(this.name);
  },

  updated() {
    this.loadIconComponent(this.name);
  },

  methods: {
    loadIconComponent(name) {
      try {
        // 动态导入图标组件
        import(`./icons/${name}.vue`).then((module) => {
          this.iconComponent = module.default;
        }).catch((error) => {
          console.error(`未找到名为 Icon${name} 的图标组件`, error);
          this.iconComponent = null;
        });
      } catch (error) {
        console.error(`加载图标组件 Icon${name} 时出错`, error);
        this.iconComponent = null;
      }
    }
  }
};
</script>

<style>
.custom-svg-icon {
  display: inline-block;
}
</style>
