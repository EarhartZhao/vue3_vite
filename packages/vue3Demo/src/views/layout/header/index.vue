<template>
  <div class="header_box">
    <div class="header_box_logo">
      <img :src="imgSrc" />
    </div>
    <div class="header_box_func">
      <el-popover placement="top" :width="100" v-model:visible="visible">
        <ul class="header_func">
          <li @click="exit">退出</li>
        </ul>

        <template #reference>
          <img :src="leaveGif" @click="visible = true" />
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script lang="ts">
import "@styleLayout/header.scss";
import leaveGif from "@img/leave.gif";
import Logo from "@img/logo.png";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Header",
  setup() {
    let visible = ref(false);
    let imgSrc = Logo;
    const exit = () => {
      visible.value = false;
      // console.log("exit");
    };

    return { imgSrc, leaveGif, visible, exit };
  },
});
</script>
