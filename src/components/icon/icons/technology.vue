<template>
  <svg viewBox="0 0 1024 1024" :width="size" :height="size">
    <path d="M544 768v64h288v64H192v-64h288v-64H96V128h832v640H544z" fill="#1BB3A6" p-id="256799"></path>
    <path
      d="M304 320L192 432l44.8 44.8 67.2 70.4 44.8-44.8-67.2-70.4 67.2-67.2zM720 320l-44.8 44.8 67.2 67.2-67.2 70.4 44.8 44.8 67.2-70.4 48-44.8zM424.832 542.912l128-221.696 55.424 32-128 221.696z"
      fill="#C7F0EC"></path>
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 16,
    },
  },
}
</script>
