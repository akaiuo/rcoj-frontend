<template>
  <div id="basicLayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">
        <global-header />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        ©<a href="http://8.222.157.217" target="_blank">powered by whoj</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style>
#basicLayout {
}

#basicLayout .header {
  margin-bottom: 8px;
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  background: linear-gradient(to right, #bbb, #fff);
  margin-bottom: 16px;
  padding: 20px;
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: absolute; /* 绝对定位，不占据盒子空间 */
  bottom: 0; /* 底部间距0 */
  left: 0; /* 左间距0 */
  right: 0; /* 右间距0 */
  text-align: center;
}
</style>
