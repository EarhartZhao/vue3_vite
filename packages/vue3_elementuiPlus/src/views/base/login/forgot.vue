<template>
  <div class="login_form_box">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          autocomplete="off"
          placeholder="用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          autocomplete="off"
          placeholder="用户密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="role">
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
import "@styleV/base/login.scss";
import { reactive, defineComponent, ref } from "vue";
import { LOGIN } from "@api/index";
import { saveUserData, turnPage, rules, roleData } from "./utils/index";

export default defineComponent({
  name: "login",
  setup() {
    let form = reactive({
      username: "test001",
      password: "123456a",
      role: "user",
    });
    let loading = ref(false);
    let formRef = ref(null);

    // 动态获取路由权限时，可以获取默认路由(路由权限的第一个路由)
    // const defaultRouter = computed(
    //   () => store.getters["router/getDefaultRouter"]
    // ).value;
    const defaultRouter = "/index";

    const login = () => {
      loading.value = true;
      formRef.value.validate((vaild) => {
        if (!vaild) {
          return (loading.value = false);
        }
        return turnPage(defaultRouter);
        LOGIN.login(form)
          .then((res) => {
            saveUserData(res, () => {
              turnPage(defaultRouter);
              loading.value = false;
            });
          })
          .catch((e) => {
            loading.value = false;
          });
      });
    };

    return { login, form, loading, roleData, rules, formRef };
  },
});
</script>
