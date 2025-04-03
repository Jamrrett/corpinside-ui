<template>
  <div>
    <transition name="body">
      <div v-show="showEmoji">
        <span class="emoji-item"
              v-for="(value, index) in emojiList"
              :key="index"
              @click="addEmoji(value)">
<!--          <img loading="lazy" class="emoji" :src="value" :title="key" width="24px" height="24px"/>-->
          <span class="emoji">{{ value }}</span>
        </span>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      showEmoji: {
        type: Boolean
      }
    },
    data() {
      return {
        emojiList: this.$constant.emojiList
      };
    },
    created() {},
    methods: {
      addEmoji(value) {
        this.$emit("addEmoji", value);
      },
      getEmojiList(emojiList) {
        let emojiName;
        let url;
        let result = {}
        for (let i = 0; i < emojiList.length; i++) {
          emojiName = "[" + emojiList[i] + "]";
          let j = i + 1;
          url = this.$store.state.sysConfig['webStaticResourcePrefix'] + "emoji/q" + j + ".gif";
          result[emojiName] = url;
        }
        return result;
      }
    }
  }
</script>

<style scoped>

  .emoji-item {
    cursor: pointer;
    display: inline-block;
  }

  .emoji-item:hover {
    transition: all 0.2s;
    border-radius: 0.25rem;
    background: var(--lightGray);
  }

  .emoji {
    margin: 0.25rem;
    /* 把此元素放置在父元素的中部 */
    vertical-align: middle;
    width: 24px;
    height: 24px;
  }

  .body-enter-active, .body-leave-active {
    transition: all 0.3s;
  }

  .body-enter, .body-leave-to {
    opacity: 0;
    transform: scale(0.5);
  }
</style>
