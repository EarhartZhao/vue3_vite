<template>
  <i :class="'iconfont ' + icon"></i>
  1111
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
