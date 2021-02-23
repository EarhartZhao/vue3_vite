<template>
  <div class="container">
    <h1>Home</h1>
    <h1>This is home page vue</h1>
    <CompTest>
      <p>I am slot</p>
    </CompTest>
    <Image />
    <Icon icon="cache" />
  </div>
</template>

<script lang="ts">
import { Icon, Image } from "@comp/index";
import { defineComponent } from "vue";

import CompTest from "./compTest";
export default defineComponent({
  name: "Home",
  components: { CompTest, Icon, Image },
  setup() {
    console.log("home setup vue");
  },
});
</script>
