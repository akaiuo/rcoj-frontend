<template>
  <div id="example-view">
    <MdEditor :value="mdValue" :handle-change="onMdChange" />
    <CodeEditor :value="codeValue" :handle-change="onCodeChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CodeEditor from "@/components/codeEditor.vue";
import MdEditor from "@/components/MdEditor.vue";

const mdValue = ref("");
const onMdChange = (val: string) => {
  mdValue.value = val;
};
const codeValue = ref("");
const onCodeChange = (val: string) => {
  codeValue.value = val;
};
</script>
