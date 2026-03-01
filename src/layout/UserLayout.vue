<template>
  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%">
    <div id="userLayout">
      <a-layout>
        <a-layout-header class="header">
          <icon-left size="36"style="font-size: 36px; position: fixed; margin: 24px;" @click="clickBackWard" class="icon-left"/>
          <div class="title-bar">
            <img class="logo" src="../assets/rc-logo.png" />
            <span class="logo-text">RCOJ</span>
          </div>
        </a-layout-header>
        <a-layout-content class="content">
          <div style="">
            <router-view style="height: 100%" />
          </div>
        </a-layout-content>
        <a-layout-footer class="footer">
          ©<a href="http://8.222.157.217" target="_blank">powered by whoj</a>
        </a-layout-footer>
      </a-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const clickBackWard = () => {
  router.push({
    path: (route.query.redirect as string) ?? "/",
    replace: true,
  });
}
</script>

<style scoped>
#userLayout {
  display: flow;
  align-items: center;
  background: url("../assets/user-bg.png") 0% 0% / 100% 100%;
  height: 100%;
  width: 100%;
}

#userLayout .header {
  margin-bottom: 8px;
  box-shadow: #eee 1px 1px 5px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
  height: 600px;
}

#userLayout .footer {
  background: #efefef;
  padding: 16px;
  position: absolute; /* 绝对定位，不占据盒子空间 */
  bottom: 0; /* 底部间距0 */
  left: 0; /* 左间距0 */
  right: 0; /* 右间距0 */
  text-align: center;
}

.title-bar {
  display: flex;
  align-items: center;
  margin: 16px;
  justify-content: center;
}

.title-bar .logo {
  width: 60px;
}

.logo-text {
  color: black;
  font-size: 28px;
  margin-left: 16px;
}

.icon-left {
  font-size: 16px;
  cursor: pointer;
  padding: 5px 10px;
}

.icon-left:hover {
  color: royalblue;
  background: var(--color-fill-3);
}
</style>
