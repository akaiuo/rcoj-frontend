<template>
  <div id="basicLayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">
        <global-header />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
<!--      <a-layout-footer class="footer">-->
<!--        ©<a href="http://8.222.157.217" target="_blank">powered by whoj</a>-->
<!--      </a-layout-footer>-->
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  margin-bottom: 8px;
  box-shadow: #eee 1px 1px 5px;
  position: relative;
  left: 0;
  right: 0;
  top: 0;
}

#basicLayout .content {
  background: white;
  min-width: 600px;
  padding-bottom: 32px;
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  text-align: center;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
