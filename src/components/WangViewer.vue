<template>
  <div id="wangViewer">
    <Editor
        style="overflow-y: hidden"
        :style="editorStyle"
        v-model="props.text"
        :defaultConfig="editorConfig"
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
  text: string,
  handleChange: (val: string) => void,
  editorStyle: string
}

const props = withDefaults(defineProps<Props>(), {
  text: "",
  handleChange: (val: string) => null,
  editorStyle: ""
});

const value = ref("")
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const editorConfig: Partial<IEditorConfig> = {
  /* 编辑器配置 */
  readOnly: true,
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

</script>

<style scoped>

</style>