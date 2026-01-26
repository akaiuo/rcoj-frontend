<template>
  <div id="questionView">
    <a-split
      :min="0"
      :max="0.7"
      :direction="'horizontal'"
      :style="{
        width: '100%',
        minWidth: '500px',
        border: '1px solid var(--color-border)',
      }"
      style="height: calc(100vh - 148px)"
    >
      <template #first>
        <a-tabs :type="'card-gutter'" :size="'medium'">
          <a-tab-pane key="question" title="问题" style="z-index: 1">
            <a-card v-if="question" :title="question.title || ''" class="card">
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
            <a-card class="card">
              <QuestionComment :question-id="props.id"/>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="answer" title="题解" style="z-index: 1">
            <a-card class="card">
              <QuestionBlog />
            </a-card>
          </a-tab-pane>
        </a-tabs>
      </template>
      <template #second>
        <CodeEditor
          :lang="req.lang"
          :handle-change="editorInput"
          :font-size="editorSettings.fontSize"
          :theme="editorSettings.theme"
          :value="req.code"
          :tab-size="4"
          :height="'83vh'"
        />
      </template>
    </a-split>
    <div class="footer">
      <div id="left">
        <a-space size="large">
          <div class="action" @click="handleThumb">
            <icon-thumb-up
              :size="22"
              v-show="!isThumb"
              class="icon"
            />
            <icon-thumb-up-fill
              :size="22"
              style="color: steelblue"
              v-show="isThumb"
              class="icon"
            />
            <span> {{ question?.thumbNum ?? "-1" }} </span>
          </div>
          <div class="action" @click="handleFavor">
            <icon-star
              :size="22"
              v-show="!isFavor"
              class="icon"
            />
            <icon-star-fill
              :size="22"
              style="color: darkorange"
              v-show="isFavor"
              class="icon"
            />
            <span> {{ question?.favourNum ?? "-1" }} </span>
          </div>
        </a-space>
      </div>
      <div id="right" style="float: right">
        <a-space>
          <div>
            <a-popover title="编辑器设置" trigger="click" :position="'top'">
              <icon-settings :size="24" class="action" />
              <template #content>
                <a-space :direction="'vertical'">
                  <div>
                    <span>字号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <a-input-number
                      :style="{ width: '120px' }"
                      v-model:model-value="editorSettings.fontSize"
                    />
                  </div>
                  <div>
                    <span>tab长度：</span>
                    <a-select
                      :style="{ width: '120px' }"
                      v-model="editorSettings.tabSize"
                    >
                      <a-option>2</a-option>
                      <a-option>4</a-option>
                      <a-option>8</a-option>
                    </a-select>
                  </div>
                  <div>
                    <span>主题：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <a-select
                      :style="{ width: '120px' }"
                      v-model="editorSettings.theme"
                    >
                      <a-option>vs</a-option>
                      <a-option>vs-dark</a-option>
                      <a-option>hc-black</a-option>
                      <a-option>hc-light</a-option>
                    </a-select>
                  </div>
                </a-space>
              </template>
            </a-popover>
          </div>
          <div>
            <icon-info-circle class="action" @click="handleClickInfo" :size="24"/>
          </div>
          <div>
            <span style="margin-left: 6px">语言：</span>
            <a-select :style="{ width: '120px' }" v-model="req.lang">
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>python</a-option>
            </a-select>
          </div>
          <div>
            <a-button
              :type="'primary'"
              @click="submitQuestion"
              style="float: right; margin-right: 6px"
            >
              &nbsp;提交&nbsp;
            </a-button>
          </div>
        </a-space>
      </div>
    </div>
  </div>
  <a-modal v-model:visible="infoVisible" :hide-cancel=true>
    <template #title>
      编译器版本
    </template>
    <div>
      java: 17-jdk-alpine<br/>
      <code style="background-color: #cccccc">javac -encoding UTF8 $src</code><br/>
      * 务必使用Main类作为主函数入口 <br/><br/>
      python: 3.11.14-alpine3.23<br/>
      <code style="background-color: #cccccc">python3 $src</code><br/><br/>
      c++: GCC 11.2.0<br/>
      <code style="background-color: #cccccc">g++ -DONLINE_JUDGE -fno-tree-ch -O2 -Wall -std=gnu++20 -pipe $src -lm -o $exe</code><br/><br/>
      * 除c/c++外，其他语言两倍时间限制
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, withDefaults } from "vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import MdViewer from "@/components/MdViewer.vue";
import CodeEditor from "@/components/codeEditor.vue";
import QuestionComment from "@/components/QuestionComment.vue";
import QuestionBlog from "@/components/QuestionBlog.vue";
import {Modal} from "@arco-design/web-vue";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const editorSettings = ref({
  fontSize: 12,
  tabSize: 4,
  theme: "vs",
});

const infoVisible = ref(false);

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

const req = ref({
  code: "",
  lang: "java",
});

const editorInput = (val: string) => {
  req.value.code = val;
};

const submitQuestion = async () => {
  if (!question.value?.id) {
    return;
  }
  console.log(req.value.code);
  const resp = await QuestionControllerService.doQuestionSubmitUsingPost({
    code: req.value.code,
    lang: req.value.lang,
    questionId: question.value.id,
  });
  if (resp.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败：" + resp.message);
  }
};

const isThumb = ref(false);
const isFavor = ref(false);
const handleThumb = () => {
  isThumb.value = !isThumb.value;
  if (isThumb.value) question.value.thumbNum += 1;
  else question.value.thumbNum -= 1;
};
const handleFavor = () => {
  isFavor.value = !isFavor.value;
  if (isFavor.value) question.value.favourNum += 1;
  else question.value.favourNum -= 1;
};

const handleClickInfo = () => {
  infoVisible.value = true;
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
#questionView {
  margin: 12px;
}

a-col {
  border: black 1px solid;
}

.footer {
  box-shadow: #eee 5px 5px 15px;
  height: 50px;
  width: 100%;
  display: flow;
}

#left {
  margin: 12px;
  height: 24px;
  width: 200px;
  float: left;
}

#middle {
  display: flex;
  align-items: center;
}

#right {
  display: flex;
  justify-content: flex-end;
  float: right;
  margin: 10px;
}

.card {
  min-width: 400px;
}

.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.action:hover {
  background: var(--color-fill-3);
}
</style>
