<template>
  <div class="tool-button color-mode-button" @click="changeColor()">
    <SvgIcon :name="darkMode === $constant.DarkMode.DARK ? 'light' : 'dark'" :size="24" />
  </div>
</template>

<script>
const SvgIcon = () => import( '@/components/icon');

export default {
  components: {
    SvgIcon
  },
  data() {
    return {
      darkMode: localStorage.getItem('DarkMode') || this.$constant.DarkMode.LIGHT,
    }
  },
  mounted() {
    window.addEventListener('storage', this.handleStorageChange);
  },
  destroyed() {
    window.removeEventListener('storage', this.handleStorageChange);
  },
  created() {
    this.setColor();
  },
  methods: {
    handleStorageChange(event) {
      if (event.key === 'DarkMode') {
        this.darkMode = event.newValue;
        this.setColor();
      }
    },
    changeColor() {
      const newMode = this.darkMode === this.$constant.DarkMode.LIGHT ? this.$constant.DarkMode.DARK : this.$constant.DarkMode.LIGHT;
      this.darkMode = newMode;
      localStorage.setItem('DarkMode', newMode);
      this.setColor();
    },
    setColor() {
      let root = document.querySelector(':root');

      if (this.darkMode === this.$constant.DarkMode.DARK) {
        root.style.setProperty('--background', '#1d1d1d');
        root.style.setProperty('--fontColor', '#cccccc');
        root.style.setProperty('--borderColor', '#4F4F4F');
        root.style.setProperty('--borderHoverColor', 'black');
        root.style.setProperty('--articleFontColor', '#E4E4E4');
        root.style.setProperty('--articleGreyFontColor', '#D4D4D4');
        root.style.setProperty('--commentContent', '#D4D4D4');
        root.style.setProperty('--favoriteBg', '#1e1e1e');
        root.style.setProperty('--content-background-color', '#2a2a2a');
        root.style.setProperty('--content-background-color-light', '#2a2a2a');
        root.style.setProperty('--hover-box-shadow', '0 2px 13px 6px rgba(20, 20, 20, 0.7)');
        root.style.setProperty('--theme-green', '#2b918a');
        root.style.setProperty('--theme-green-hover', '#20817a');
        root.style.setProperty('--theme-green-active', '#1d716a');
        root.style.setProperty('--theme-purple', '#7b7bc7');
        root.style.setProperty('--theme-pink', '#a877a2');
        root.style.setProperty('--theme-blue', '#347ab2');
        root.style.setProperty('--white-content', '#eeeeee');
        root.style.setProperty('--grey-content', '#898989');
        root.style.setProperty('--light-grey-content', '#bbbbbb');
        root.style.setProperty('--grey-background', '#666666');
        root.style.setProperty('--light-grey-background', '#444444');
        root.style.setProperty('--label-background', 'rgba(128, 128, 128, 0.2)');
        root.style.setProperty('--list-item-border', '#494949');
        root.style.setProperty('--content-border', '#777777');
      } else {
        root.style.setProperty('--background', '#f1f3f5');
        root.style.setProperty('--fontColor', '#000000');
        root.style.setProperty('--borderColor', 'rgba(0, 0, 0, 0.5)');
        root.style.setProperty('--borderHoverColor', 'rgba(110, 110, 110, 0.4)');
        root.style.setProperty('--articleFontColor', '#1F1F1F');
        root.style.setProperty('--articleGreyFontColor', '#616161');
        root.style.setProperty('--commentContent', '#F7F9FE');
        root.style.setProperty('--favoriteBg', '#f7f9fe');
        root.style.setProperty('--content-background-color', '#ffffff');
        root.style.setProperty('--content-background-color-light', '#f3f5f7');
        root.style.setProperty('--hover-box-shadow', '0 2px 13px -2px rgba(110, 110, 110, 0.4)');
        root.style.setProperty('--theme-green', '#39c5bb');
        root.style.setProperty('--theme-green-hover', '#30b0aa');
        root.style.setProperty('--theme-green-active', '#28a098');
        root.style.setProperty('--theme-purple', '#bdbdf0');
        root.style.setProperty('--theme-pink', '#eec1ea');
        root.style.setProperty('--theme-blue', '#87cefa');
        root.style.setProperty('--white-content', '#ffffff');
        root.style.setProperty('--grey-content', '#797979');
        root.style.setProperty('--light-grey-content', '#696969');
        root.style.setProperty('--grey-background', '#bbbbbb');
        root.style.setProperty('--light-grey-background', '#eaeaea');
        root.style.setProperty('--label-background', 'rgba(200, 200, 200, 0.2)');
        root.style.setProperty('--list-item-border', '#cccccc');
        root.style.setProperty('--content-border', '#aaaaaa');
      }
    },
  }
}
</script>
