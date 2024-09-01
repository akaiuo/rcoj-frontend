<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :default-selected-keys="selectedKey"
        @menu-item-click="doMenuClick"
        :selected-keys="[router.currentRoute.value.fullPath]"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/rc-logo.png" />
            <span class="logo-text">RCOJ</span>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <a-col flex="100px">
        <div>{{ store.state.user?.loginUser?.userName ?? "未登录1" }}</div>
      </a-col>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import router from "@/router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";

//默认主页
const selectedKey = ref(["/"]);

//路由跳转时，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKey.value = [to.path];
});

const doMenuClick = (key: string) => {
  console.log(key);
  router.push({
    path: key,
  });
};
const store = useStore();

//模拟登录
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "java大王",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

// 过滤路由
const visibleRoutes = computed(() => {
  return routes.filter((item, idx) => {
    if (item.meta?.visibleHead) {
      if (
        checkAccess(store.state.user.loginUser, item.meta?.access as string)
      ) {
        return true;
      }
    }
    return false;
  });
});
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 36px;
}

.logo-text {
  color: black;
  font-size: 20px;
  margin-left: 16px;
}
</style>
