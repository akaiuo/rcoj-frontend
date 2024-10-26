<script setup lang="ts">
import * as monaco from "monaco-editor";
import { editor } from "monaco-editor";
import { defineProps, onMounted, ref, toRaw, watch, withDefaults } from "vue";
import LineNumbersType = editor.LineNumbersType;

interface Props {
  value: string;
  lang: string;
  fontSize: number;
  tabSize: number;
  theme: string;
  handleChange: (val: string) => void;
  height: string;
  readOnly: boolean;
  lineNumbers: LineNumbersType;
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  value: "",
  lang: "",
  fontSize: 14,
  tabSize: 4,
  theme: "vs",
  handleChange: (val: string) => null,
  height: "100vh",
  readOnly: false,
  lineNumbers: "on",
});

const codeEditorRef = ref();
const codeEditor = ref();

watch(
  () => props.lang,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.lang
      );
    }
  }
);

// todo 更改字号

watch(
  () => props.theme,
  () => {
    if (codeEditor.value) {
      monaco.editor.setTheme(props.theme);
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.lang,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: false,
    },
    readOnly: props.readOnly,
    fontSize: 15,
    lineNumbers: props.lineNumbers,
  });
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<template>
  <div>
    <div
      id="code-editor"
      ref="codeEditorRef"
      style="margin: 6px"
      :style="{ height }"
    />
  </div>
</template>

<style scoped></style>
