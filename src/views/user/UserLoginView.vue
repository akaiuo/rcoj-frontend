<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const store = useStore();
const router = useRouter();
const route = useRoute();
const handleSubmit = async () => {
  const resp = await UserControllerService.userLoginUsingPost(form);
  // 登录成功，跳转到主页
  if (resp.code === 0) {
    // 跳转到转发的页面，dispatch参数
    await store.dispatch("user/getLoginUser");
    await router.push({
      path: (route.query.redirect as string) ?? "/",
      replace: true,
    });
  } else {
    message.error("登录失败：" + resp.message);
  }
};
</script>

<template>
  <div class="user-login">
    <h2 id="title" align="center" style="letter-spacing: 5px">用户登录</h2>
    <a-form
      :model="form"
      style="max-width: 320px; margin: 0 auto"
      @submit="handleSubmit"
      auto-lable-width
      label-align="right"
    >
      <a-form-item field="userAccount" label="用户名">
        <a-input v-model="form.userAccount" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password v-model="form.userPassword" />
      </a-form-item>
      <a-form-item>
        <div style="margin-left: 25%">
          <a-button html-type="submit" type="primary">
            <p style="letter-spacing: 1px">登录</p>
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.user-login {
  align-items: center;
  padding-left: 15px;
}
</style>
