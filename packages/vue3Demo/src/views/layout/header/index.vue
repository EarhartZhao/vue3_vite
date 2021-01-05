<template>
  <div>
    <i class="iconfont icon-operating"></i>
    <Icon icon="cache" />
    <Image />
  </div>
</template>

<script>
import "/@styleLayout/header/index.scss";
import Image from "/@comp/image";
export default {
  name: "Header",
  components: {
    Image,
  },
  data() {
    return {
      msg: "home",
    };
  },
};
</script>
