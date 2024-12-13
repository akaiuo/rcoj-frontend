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
    <a-col flex="150px">
      <a-dropdown trigger="hover" v-if="store.state.user.loginUser.userName">
        <span id="username" @click="null">
          {{ store.state.user?.loginUser?.userName }}
        </span>
        <template #content>
          <a-doption @click="handleUserCenter">我的主页</a-doption>
          <a-doption @click="handleLogout">退出登录</a-doption>
        </template>
      </a-dropdown>
      <div v-else>
        <span class="login_logout" @click="handleLogin">登录</span>
        <a-divider direction="vertical" />
        <span class="login_logout">注册</span>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import router from "@/router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import { UserControllerService } from "../../generated";
import { useRoute } from "vue-router";

//默认主页
const selectedKey = ref(["/"]);

//路由跳转时，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKey.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
const store = useStore();
const route = useRoute();

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

const handleUserCenter = () => {
  router.push({
    path: "/user/info",
  });
};

const handleLogout = () => {
  UserControllerService.userLogoutUsingPost();
  location.reload();
};

const handleLogin = () => {
  console.log(route.path);
  router.push({
    path: "/user/login",
    query: {
      redirect: route.path,
    },
  });
};
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

#username {
  font-size: 16px;
  cursor: pointer;
}

.login_logout {
  font-size: 16px;
  cursor: pointer;
  padding: 5px 10px;
}

.login_logout:hover {
  color: royalblue;
  background: var(--color-fill-3);
}
</style>
