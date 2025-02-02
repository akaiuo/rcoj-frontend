<template>
  <div id="postEditorView">
    <h1>创建帖子</h1>
    <a-form auto-label-width :layout="'inline'">
      <a-form-item label="标题" :rules="[{required: true}]">
        <a-input v-model="title" style="max-width: 400px; min-width: 300px" :max-length="{length:40,errorOnly:true}" :word-length="wordLength" show-word-limit/>
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
            placeholder="Please Enter"
            allow-clear
            v-model="tags"
            :size="'large'"
            style="min-width: 200px"
        />
      </a-form-item>
    </a-form>
    <span style="font-size: 14px; line-height: 32px">
      简述<span style="color: rgb(78, 89, 105);"> （不填默认取正文前150字）</span>
    </span>
    <a-textarea :max-length="{length:150,errorOnly:true}" :word-length="wordLength" show-word-limit :auto-size="{maxRows:3, minRows:3}" v-model="preview"/>
    <a-tabs size="large">
      <a-tab-pane key="1">
        <template #title>
          <a-image src="https://img.icons8.com/ios-glyphs/24/text.png" :preview-visible="false"/> 富文本编辑器
        </template>
        <WangEditor @get-html="valueChange" @getText="textValueChange" :editor-style="'minHeight: calc(100vh - 256px)'" style="z-index: 99;"/>
        <a-divider size="0" />
        <a-button :type="'primary'" style="width: 80px;" @click="handleSubmit(1)">发布</a-button>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #title>
          <a-image src="https://img.icons8.com/ios/24/markdown.png" :preview-visible="false"/> MarkDown编辑器
        </template>
        <MdEditor :value="contextMd" :handle-change="handleChangeMd"/>
        <a-divider size="0"/>
        <a-button :type="'primary'" style="width: 80px;" @click="handleSubmit(2)">发布</a-button>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import WangEditor from "@/components/WangEditor.vue";
import {ref} from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {Message} from "@arco-design/web-vue";
import {PostControllerService} from "../../../generated/post";

const title = ref("")
const tags = ref([])
const contextWang = ref("")
const textWang = ref("")
const contextMd = ref("")
const preview = ref("")

const valueChange = (data: string) => {
  contextWang.value = data;
}
const textValueChange = (data: string) => {
  textWang.value = data;
}

const handleChangeMd = (val: string) => {
  contextMd.value = val;
};

const handleSubmit = async (editorType: number) => {
  if (/^\s*$/.test(title.value)) {
    Message.warning("请输入标题");
    return;
  }
  if (wordLength(title.value) > 40 || wordLength(preview.value) > 150) {
    Message.warning("输入长度超出限制");
    return;
  }
  if (editorType === 1 && textWang.value == "" || editorType === 2 && contextMd.value == "") {
    Message.warning("内容为空");
    return;
  }
  const resp = await PostControllerService.addPostUsingPost({
    title: title.value,
    tags: tags.value,
    content: editorType === 1 ? contextWang.value : contextMd.value,
    preview: preview.value == "" ? (editorType === 1 ? getSliceStr(textWang.value, 150) : getSliceStr(contextMd.value, 150)) : preview.value,
    editorType: editorType,
  });
  if (resp.code != 0) {
    Message.error("发布失败：" + resp.message);
  }else {
    Message.success("发布成功");
  }
}

const wordLength = (str: string) => {
  // 字符串长度计算：英文记0.5个单位，其它字符记1个单位
  const regOther = /[\u007f-\uffff]/g;
  str = str.replace(regOther, 'aa');
  return Math.floor((str.length + 1) / 2);
}

const getSliceStr = (str: string, len: number) => {
  if (str.length < len) {
    return str;
  }
  let cnt = 0;
  const regOther = /[\u007f-\uffff]/g;
  for(let i = 0; i < str.length; i++) {
    if (regOther.exec(str.charAt(i))) {
      cnt += 1;
    }else {
      cnt += 0.5;
    }
    if (cnt >= len) {
      return str.slice(0, i);
    }
  }
  return str;
}
</script>

<style scoped>
#postEditorView {
}
@media screen {
  #postEditorView {
    margin: 32px 16px;
    width: calc(100% - 32px);
  }
}
@media screen and (min-width: 1232px) {
  #postEditorView {
    margin: 32px auto;
    width: 1200px;
  }
}
</style>