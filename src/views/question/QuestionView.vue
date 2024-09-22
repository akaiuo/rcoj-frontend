<template>
  <div id="questionView">
    <a-row :gutter="[24, 24]">
      <a-col :lg="12" :md="24">
        <a-tabs :type="'card-gutter'" :size="'medium'" justify>
          <a-tab-pane key="question" title="问题">
            <a-card v-if="question" :title="question.title || ''">
              <a-descriptions>
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConf.timeLimit ?? -1 }} ms
                </a-descriptions-item>
                <a-descriptions-item label="空间限制">
                  {{ question.judgeConf.memoLimit ?? -1 }} kB
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-popover>
                  <a-button>标签</a-button>
                  <template #content>
                    <a-space>
                      <a-tag
                        v-for="(val, idx) in question.tags"
                        :key="idx"
                        color="arcoblue"
                      >
                        {{ val }}
                      </a-tag>
                    </a-space>
                  </template>
                </a-popover>
              </template>
              <a-divider :size="0" />
              <a-descriptions>
                <a-descriptions-item label="通过数">
                  {{ question.acceptNum }}
                </a-descriptions-item>
                <a-descriptions-item label="提交数">
                  {{ question.submitNum }}
                </a-descriptions-item>
                <a-descriptions-item label="通过率">
                  {{ calSubmitRate(question) }} %
                </a-descriptions-item>
              </a-descriptions>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="讨论">
            Content of Tab Panel 2
          </a-tab-pane>
          <a-tab-pane key="answer" title="题解">
            Content of Tab Panel 3
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :lg="12" :md="24">
        <CodeEditor />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, withDefaults } from "vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/codeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref();
const loadData = async () => {
  const resp = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (resp.code === 0) {
    question.value = resp.data;
  } else {
    message.error("题目加载失败：" + resp.message);
  }
};

const calSubmitRate = (record: any) => {
  if (!record.submitNum || record.submitNum === 0 || !record.acceptNum) {
    return 0;
  } else {
    return Number(((record.acceptNum / record.submitNum) * 100).toFixed(1));
  }
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.addQuestionView {
}

a-col {
  border: black 1px solid;
}
</style>
