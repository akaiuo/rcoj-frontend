<template>
  <div id="app">
    <basic-layout />
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import BasicLayout from "@/layout/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";

const router = useRouter();
const store = useStore();

router.beforeEach((to, from, next) => {
  // 仅管理员可见，判断当前用户是否有权限
  if (checkAccess(store.state.user.loginUser, to.meta?.access as string)) {
    next();
    return;
  }
  next("/noAuth");
});
</script>
