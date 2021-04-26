<template>
  <div class="login_form_box">
    <el-form :model="form">
      <el-form-item>
        <el-input
          v-model="form.username"
          autocomplete="off"
          placeholder="用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.password"
          autocomplete="off"
          placeholder="用户密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.role" placeholder="请选择登录角色" clearable>
          <el-option
            v-for="item in roleData"
            :key="item.role"
            :label="item.roleName"
            :value="item.role"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button @click="login" :loading="loading" :disabled="loading"
      >登录</el-button
    >
  </div>
</template>

<script lang="ts">
import router from "@utils/router/index";
import "@styleV/base/login.scss";
import roleDataJson from "./role.json";
import { useStore } from "@store/index";
import { reactive, defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";
import { LOGIN } from "@api/index";
export default defineComponent({
  name: "login",
  setup() {
    const store = useStore();
    const roleData = roleDataJson;
    let form = reactive({
      username: "test001",
      password: "123456a",
      role: "user",
    });
    let loading = ref(false);

    const login = () => {
      loading.value = true;
      router({ path: "/index" }).routerPush();
      LOGIN.login(form)
        .then((res) => {
          saveUserData(res);
          loading.value = false;
        })
        .catch((e) => {
          console.log("e", e);
          loading.value = false;
        });
    };

    const saveUserData = (userInfo: any) => {
      const token = userInfo.token || "";
      store.commit("router/clearProducts");
      store.commit("user/setState", {
        token,
        userInfo,
      });
      ElMessage({
        type: "success",
        message: "登录成功，正在跳转中",
        duration: 1000,
        onClose: () => {
          loading.value = false;
          router({ path: "/index" }).routerPush();
        },
      });
    };
    return { login, form, loading, roleData };
  },
});
</script>
