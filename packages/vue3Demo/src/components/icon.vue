<template>
  <i :class="'iconfont icon-' + icon"></i>
</template>

<script>
export default {
  name: "iconfont",
  props: {
    icon: String,
  },
  data() {
    return {
      count: 0,
    };
  },
};
</script>
