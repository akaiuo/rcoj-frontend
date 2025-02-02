<template>
    <div id="wangEditor" style="border: 1px solid #ccc">
      <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="props.mode"
      />
      <Editor
          style="overflow-y: hidden"
          :style="editorStyle"
          v-model="value"
          :defaultConfig="editorConfig"
          :mode="props.mode"
          @onCreated="handleCreated"
          @change="handleChange"
      />
    </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { defineProps, onBeforeUnmount, onMounted, ref, shallowRef, watch, withDefaults} from "vue";
import { IEditorConfig } from '@wangeditor/editor'
import {editor} from "monaco-editor";

interface Props {
  mode: string,
  text: string,
  handleChange: (val: string) => void,
  readonly: boolean,
  editorStyle: string
}

const props = withDefaults(defineProps<Props>(), {
  mode: "default",
  text: "",
  handleChange: (val: string) => null,
  readonly: false,
});

const value = ref("")
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {}
const editorConfig: Partial<IEditorConfig> = {
  /* 编辑器配置 */
  readOnly: props.readonly,
};

onMounted(() => {
  // console.log(props.value)
});

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
});

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
};

const emit = defineEmits(["getHtml", "getText"]);
const getHtml = () => {
  const editor = editorRef.value;
  if (editor == null)
    return null;
  return editor.getHtml();
};
const getText = () => {
  const editor = editorRef.value;
  if (editor == null)
    return null;
  return editor.getText();
};

watch(value, (newVal, oldValue) => { // 设置监听，当文本内容变化时，调用该函数
  emit("getHtml", getHtml()); // 给父组件传递文本内容
  emit("getText", getText()); // 给父组件传递文本内容
})

</script>

<style scoped>

</style>