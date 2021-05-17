<template>
  <div class="timeoutBox">
    <ul class="timeoutFunc">
      <li>
        <el-select
          v-model="data.search.type"
          placeholder="请选择登录角色"
          clearable
        >
          <el-option label="接口1" value="api1"></el-option>
          <el-option label="接口2" value="api2"></el-option>
        </el-select>
        <el-input v-model="data.search.time" clearable></el-input>
        <el-button @click="run" type="primary">测试</el-button>
      </li>
    </ul>
    <div class="timeoutShowOff">
      <ul class="timeoutRequestLis">
        <li>1111</li>
        <li>1111</li>
      </ul>
      <ul class="timeoutResponseLis">
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import "@styleMain/timeout.scss";
import { defineComponent } from "vue";
import { data, run } from "./utils/testTimeout";
export default defineComponent({
  name: "timeout",
  setup() {
    return {
      data,
      run,
    };
  },
});
</script>
