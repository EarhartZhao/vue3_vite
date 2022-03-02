<template>
  <div class="login_form_box">
    <Form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
    >
      <FormItem label="用户名" name="username" v-bind="validateInfos.username">
        <a-input v-model:value="formState.username" />
      </FormItem>

      <FormItem
        label="用户密码"
        name="password"
        v-bind="validateInfos.password"
      >
        <a-input-password v-model:value="formState.password" />
      </FormItem>

      <FormItem name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <Checkbox v-model:checked="formState.remember">Remember me</Checkbox>
      </FormItem>

      <FormItem :wrapper-col="{ offset: 8, span: 16 }">
        <a-button
          type="primary"
          @click.prevent="onSubmit"
          :loading="loading"
          :disabled="loading"
          >登录</a-button
        >
      </FormItem>
    </Form>
  </div>
</template>

<script lang="ts">
import "@styleV/base/login.scss";
import { reactive, defineComponent, ref, toRaw } from "vue";
import { LOGIN } from "@api/index";
import { saveUserData, turnPage, rules } from "./utils/index";
import { Form, FormItem, Checkbox } from "ant-design-vue";

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const useForm = Form.useForm;

export default defineComponent({
  name: "login",
  components: { Form, FormItem, Checkbox },
  setup() {
    const formState = reactive<FormState>({
      username: "123",
      password: "123",
      remember: true,
    });
    let loading = ref(false);
    const defaultRouter = "/home/index";

    const { resetFields, validate, validateInfos } = useForm(formState, rules);
    const onSubmit = () => {
      loading.value = true;
      validate()
        .then(() => {
          return turnPage(defaultRouter);
          LOGIN.login(toRaw(formState))
            .then((res) => {
              saveUserData(res, () => {
                turnPage(defaultRouter);
                loading.value = false;
              });
            })
            .catch((e) => {
              loading.value = false;
            });
        })
        .catch((err) => {
          console.log("error", err);
          loading.value = false;
        });
    };

    const reset = () => {
      //重置表单
      resetFields();
    };

    return {
      loading,
      validateInfos,
      formState,
      onSubmit,
    };
  },
});
</script>
