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
import "@styleLayout/header/index.scss";
import hwLogo from "@img/huawei_logo.png";
import leaveGif from "@img/leave.gif";
import sswLogo from "@img/ssw_logo.png";
import { useStore } from "@store/index";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Header",
  setup() {
    const store = useStore();
    const projectItem = store.getters["system/getProjectItem"];
    let visible = ref(false);
    let imgSrc = projectItem === "hw" ? hwLogo : sswLogo;
    const exit = () => {
      visible.value = false;
      console.log("exit");
    };

    return { imgSrc, leaveGif, visible, exit };
  },
});
</script>
