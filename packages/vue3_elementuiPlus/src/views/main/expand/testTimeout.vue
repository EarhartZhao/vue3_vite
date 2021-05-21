<template>
  <div class="timeoutBox">
    <ul class="timeoutFunc">
      <li>
        <el-select
          v-model="timeoutData.search.type"
          placeholder="请选择登录角色"
          clearable
        >
          <el-option label="接口1" value="api1"></el-option>
          <el-option label="接口2" value="api2"></el-option>
        </el-select>
        <el-input v-model="timeoutData.search.time" clearable></el-input>
        <el-button @click="run" type="primary">测试</el-button>
        <el-button @click="clear" type="primary">清除列表</el-button>
      </li>
    </ul>
    <div class="timeoutShowOff">
      <ul class="timeoutRequestLis">
        <li
          v-for="(item, index) in timeoutData.searchList"
          :key="index + 'timeoutRequestLis'"
        >
          <span>{{ index + 1 }}.接口:{{ item.type }}</span>
          <span>延迟时间:{{ item.time }}</span>
          <span>是否成功:{{ item.success ? "成功" : "失败" }}</span>
        </li>
      </ul>
      <ul class="timeoutResponseLis">
        <li
          v-for="(item, index) in timeoutData.list"
          :key="index + 'timeoutResponseLis'"
        >
          <span>{{ index + 1 }}.接口:{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import "@styleMain/timeout.scss";
import { defineComponent } from "vue";
import { timeoutData, run, clear } from "./utils/testTimeout";
export default defineComponent({
  name: "timeout",
  setup() {
    return {
      timeoutData,
      run,
      clear,
    };
  },
});
</script>
