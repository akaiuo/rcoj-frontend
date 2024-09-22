<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import { Viewer } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";

// 这里定义变量，可在引用此组件处声明
interface Props {
  value: string;
  handleChange: (val: string) => void;
}

const plugins = [
  gfm(),
  highlight(),
  math(),
  // Add more plugins here
];

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  value: "",
  handleChange: (val: string) => null,
});
</script>

<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<style scoped></style>
