<template>
  <div class="login_form_box">
    <el-form :model="form">
      <template v-if="code === 0">
        <el-form-item>
          <el-input
            v-model="form.domain"
            autocomplete="off"
            placeholder="租户名/原华为云账号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.username"
            autocomplete="off"
            placeholder="IAM用户名/邮件地址"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            autocomplete="off"
            placeholder="IAM用户密码"
            clearable
          ></el-input>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item>
          <el-input
            v-model="form.huaweiId"
            autocomplete="off"
            placeholder="请输入id"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.mfaCode"
            autocomplete="off"
            placeholder="输入华为云app动态码"
            clearable
          ></el-input>
        </el-form-item>
      </template>
    </el-form>
    <el-button @click="login" :loading="loading" :disabled="loading"
      >登录</el-button
    >
  </div>
</template>

<script lang="ts">
import router from "@utils/router/index";
import "@styleV/base/login/index.scss";
import { useStore } from "@store/index";
import { reactive, defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";
import { HWLOGIN } from "@api/index";
export default defineComponent({
  name: "login",
  setup() {
    const store = useStore();
    let form = reactive({
      domain: "aicyber2020",
      username: "zhouyujuan",
      password: "Deepthink1@3",
    });
    // let form = reactive({
    //   domain: "aicyber",
    //   username: "zhaoenbo",
    //   password: "8820472522a",
    // });
    let code = ref(0);
    let loading = ref(false);

    const login = () => {
      loading.value = true;
      HWLOGIN[code.value === 0 ? "loginByPassword" : "loginByMFA"](form)
        .then((res) => {
          console.log("res", res);
          code.value = res.code;
          if (code.value === 0) {
            saveUserData(res);
          } else {
            ElMessage("请进行账号验证！");
            loading.value = false;
          }
        })
        .catch((e) => {
          console.log("e", e);
          loading.value = false;
        });
    };

    const saveUserData = (userInfo: any) => {
      const token = userInfo.token || "";
      const hwToken = userInfo.huaweiToken || "";
      store.commit("user/setState", {
        token,
        hwToken,
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

    // const turnPage = () => {
    //   console.log("router", router);
    //   console.log("router-get", router().getQuery());
    //   router({ path: "/index" }).routerPush();
    // };
    return { login, code, form, loading };
  },
});
</script>
