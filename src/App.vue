<template>
  <div id="app">
    <template
      v-if="
        route.path.startsWith('/user') && !route.path.startsWith('/user/info')
      "
    >
      <router-view />
    </template>
    <template v-if="route.path.startsWith('/view/question')">
      <QuestionLayout />
    </template>
    <template v-else>
      <basic-layout />
    </template>
  </div>
  <!--纸片人-->
<!--  <vue-live2d-->
<!--      :model="['Potion-Maker/Pio', 'school-2017-costume-yellow']"-->
<!--      :size="kanbanStyle.size"-->
<!--      :direction="kanbanStyle.direction"-->
<!--      :style="kanbanStyle.style"-->
<!--      v-if="false"-->
<!--  ></vue-live2d>-->
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import BasicLayout from "@/layout/BasicLayout.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import QuestionLayout from "@/layout/QuestionLayout.vue";
const route = useRoute();
import {ref} from "vue";

const kanbanStyle = ref({
  direction: 'right',
  style: 'position: fixed; bottom: 0; right: 0;',
  width: 500,
  height: 500,
  size: 350,
})

/**
 * 全局初始化函数，全局单次调用的代码写到这里
 */
const doInit = () => {
  console.log(
    "                                                    __----~~~~~~~~~~~------___\n" +
      "                                   .  .   ~~//====......          __--~ ~~\n" +
      "                   -.            \\_|//     |||\\\\  ~~~~~~::::... /~\n" +
      "                ___-==_       _-~o~  \\/    |||  \\\\            _/~~- \n" +
      "        __---~~~.==~||\\=_    -_--~/_-~|-   |\\\\   \\\\        _/~\n" +
      "    _-~~     .=~    |  \\\\-_    '-~7  /-   /  ||    \\      /\n" +
      "  .~       .~       |   \\\\ -_    /  /-   /   ||      \\   /\n" +
      " /  ____  /         |     \\\\ ~-_/  /|- _/   .||       \\ /\n" +
      " |~~    ~~|--~~~~--_ \\     ~==-/   | \\~--===~~        .\\\n" +
      "          '         ~-|      /|    |-~\\~~       __--~~\n" +
      "                      |-~~-_/ |    |   ~\\_   _-~            /\\\n" +
      "                           /  \\     \\__   \\/~                \\__\n" +
      "                       _--~ _/ | .-~~____--~-/                  ~~==.\n" +
      "                      ((->/~   '.|||' -_|    ~~-/ ,              . _||\n" +
      "                                 -_     ~\\      ~~---l__i__i__i--~~_/\n" +
      "                                 _-~-__   ~)  \\--______________--~~\n" +
      "                               //.-~~~-~_--~- |-------~~~~~~~~\n" +
      "                                      //.-~~~--\\\n" +
      "                  神兽保佑\n" +
      "                代码无BUG!" +
      ""
  );
};

onMounted(() => {
  doInit();
  console.log('finish loading');
});



</script>
