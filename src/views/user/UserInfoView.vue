<template>
  <div id="userInfoView">
    <div class="wrapper">
      <div class="box a">
        <UserInfo />
      </div>
      <div class="box b">
        <SubmitStatistic />
      </div>
      <div class="box c">
        <div style="height: 100%; float: left; display: flow">
          <a-menu
            mode="vertical"
            :default-selected-keys="selectedKey"
            @menu-item-click="doMenuClick"
            :style="{ width: '200px', borderRadius: '15px', height: '100%' }"
            style="
              box-shadow: rgba(0, 0, 0, 0.15) 0 15px 25px,
                rgba(0, 0, 0, 0.05) 5px 5px 10px;
            "
          >
            <a-menu-item key="4">
              <icon-user-add />
              我的关注&nbsp;&nbsp;<span class="grayCircle">{{
                userMessage.myFollow
              }}</span></a-menu-item
            >
            <a-menu-item key="5">
              <icon-user-group />
              我的粉丝&nbsp;&nbsp;<span class="grayCircle">{{
                userMessage.myFan
              }}</span></a-menu-item
            >
            <a-divider />
            <a-menu-item key="mySubmit">
              <icon-upload />
              提交记录
            </a-menu-item>
            <a-menu-item key="2">
              <icon-star-fill />
              收藏的题解
            </a-menu-item>
            <a-menu-item key="3">
              <icon-star-fill />
              收藏的题目
            </a-menu-item>
          </a-menu>
        </div>
        <div style="float: right; display: flow; width: 1000px; height: 480px; overflow: scroll">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserInfo from "@/components/userInfo/UserInfo.vue";
import SubmitStatistic from "@/components/userInfo/SubmitStatistic.vue";
import { ref } from "vue";
import {useRouter} from "vue-router";

const userMessage = ref({
  myFollow: 328986,
  myFan: 54,
});

const router = useRouter()

const doMenuClick = (key: string) => {
  router.push({
    path: "/user/info/" + key,
  });
};

const selectedKey = ref(['mySubmit']);

//路由跳转时，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKey.value = [to.path];
});

</script>

<style scoped>
#userInfoView {
  //border: black 1px solid; height: 800px; margin: 32px auto; max-width: 1220px;
}

.wrapper {
  display: grid;
  grid-template-columns: [col1-start] 355px [col2-start] 355px [col3-start] 480px [col3-end];
  grid-template-rows: [row1-start] 300px [row2-start] 480px [row2-end];
  grid-gap: 15px;
}

.a {
  grid-column: col1-start / col3-start;
  grid-row: row1-start;
}

.b {
  grid-column: col3-start;
  grid-row: row1-start / row2-start;
}

.c {
  grid-column: col1-start / col3-end;
  grid-row: row2-start;
  z-index: 9999;
}

.box {
  border-radius: 15px;
  //padding: 200px;
  //font-size: 24px;
  box-shadow: rgba(0, 0, 0, 0.15) 0 15px 25px, rgba(0, 0, 0, 0.05) 5px 5px 10px;
}

.grayCircle {
  background-color: lightgray;
  border-radius: 15px;
  padding: 0 2px;
}
</style>