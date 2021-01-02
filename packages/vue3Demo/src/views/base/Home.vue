<template>
  <h1>{{ msg }}</h1>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "home",
    };
  },
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 30px;
}
</style>
