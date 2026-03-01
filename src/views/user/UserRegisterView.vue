<template>
  <div id="userRegister">
    <h2 id="title" align="center" style="letter-spacing: 5px">用户注册</h2>
    <a-form
        :model="form"
        style="max-width: 360px; margin: 0 auto"
        auto-lable-width
        label-align="right"
    >
      <a-form-item field="userAccount" label="用户名">
        <a-input v-model="form.userAccount" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码" style="height: 6px">
        <a-input-password v-model="form.userPassword" />
      </a-form-item>
      <a-form-item field="userPassword" style="height: 6px">
        <span v-if="form.userPassword === ''"></span>
        <span style="color: indianred" v-else-if="form.userPassword.length < 8">密码需大于8位</span>
        <span style="color: indianred" v-else-if="form.userPassword.length > 24">密码过长</span>
      </a-form-item>
      <a-form-item field="userPassword" label="确认密码" style="height: 6px">
        <a-input-password v-model="form.userConfirmPassword" :error="form.userConfirmPassword == '' ? false : form.userPassword != form.userConfirmPassword"/>
      </a-form-item>
      <a-form-item field="userPassword" style="height: 6px">
        <span style="color: indianred" v-show="form.userConfirmPassword == '' ? false : form.userPassword != form.userConfirmPassword">两次输入密码不一致</span>
      </a-form-item>
      <a-form-item field="userPassword" label="邮箱">
        <a-input v-model="form.email"/>
      </a-form-item>
      <a-form-item field="userPassword" label="验证码">
        <!-- 允许数字及字母输入，小写字母转换为大写字母-->
        <a-verification-code
            style="width: 300px"
            :formatter="(inputValue) => /^[0-9]*$/.test(inputValue)? inputValue : /^[a-zA-Z]*$/.test(inputValue) ? inputValue.toUpperCase() : ''"
            :length="5"
            v-model="form.validateCode"
        />
        <div style="width: 12px"></div>
        <a-button id="getVertCodeButton" :disabled="getVertCodeDisable()" :style="getVertCodeDisable() ? {backgroundColor: 'gray'}: null" @click="getVertCode" style="padding: 1px; width: 200px">
          获取验证码 <span v-show="getVertCodeTime > 0">({{getVertCodeTime}})</span>
        </a-button>
      </a-form-item>
      <a-form-item>
        <div style="margin-left: 25%">
          <a-button html-type="submit" type="primary" @click="handleRegister" :disabled="!checkParam()">
            <p style="letter-spacing: 1px">注册</p>
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {UserControllerService} from "../../../generated/user";
import {Message} from "@arco-design/web-vue";
import {useRouter} from "vue-router";

const form = ref({
  userAccount: "",
  userPassword: "",
  userConfirmPassword: "",
  email: "",
  validateCode: ""
})
const getVertCodeTime = ref(0);
let intervalId : number; // 定时器id
let isClick = false;

const getVertCode = async () => {
  if (isClick) return;
  isClick = true;
  const resp = await UserControllerService.registerValidateCodeUsingGet(form.value.email);
  if (resp.code !== 0) {
    Message.error(resp.message as any + "，请检查邮箱是否填写正确");
  }else {
    Message.success("验证码发送成功");
    getVertCodeTime.value = 60; // 开启倒计时
    intervalId = setInterval(() => {
      getVertCodeTime.value -= 1;
      if (getVertCodeTime.value < 0) {
        clearInterval(intervalId);
        isClick = false;
      }
    }, 1000) as any;
  }
}

const getVertCodeDisable = () : boolean => {
  return form.value.email == '' || getVertCodeTime.value > 0;
}
const router = useRouter();

const handleRegister = async () => {
  const resp = await UserControllerService.userRegisterUsingPost({
    userAccount: form.value.userAccount,
    userEmail: form.value.email,
    userPassword: form.value.userPassword,
    validateCode: form.value.validateCode,
  })
  if (resp.code !== 0) {
    Message.error("注册失败：" + resp.message);
  }else {
    Message.success("注册成功");
    // 注册成功后跳转登录页
    await sleep(1000);
    await router.push({
      path: "/user/login"
    })
  }
}
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const checkParam = () : boolean => {
  if (form.value.userAccount === "" || form.value.userAccount.charAt(0) === " ") {
    return false;
  }
  if (form.value.email === "") {
    return false;
  }
  if (form.value.userPassword.length < 8 || form.value.userPassword.length > 24 || form.value.userPassword !== form.value.userConfirmPassword) {
    return false;
  }
  if (form.value.validateCode.length < 5) {
    return false;
  }
  return true;
}
</script>

<style scoped>
  #getVertCodeButton {
    background-color: #5EDFD6
  }
  #getVertCodeButton:hover{
    background-color: #89E9E0
  }
  #getVertCodeButton:active {
    background-color: #14C9C9
  }
</style>
