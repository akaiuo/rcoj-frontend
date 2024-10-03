<template>
  <div id="basicLayout">
    <a-layout>
      <a-layout-header class="header">
        <global-header />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
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
}
</style>
