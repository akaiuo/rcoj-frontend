<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-if="route.path.startsWith('/view/question')">
      <QuestionLayout />
    </template>
    <template v-else>
      <basic-layout />
    </template>
  </div>
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
});
</script>
