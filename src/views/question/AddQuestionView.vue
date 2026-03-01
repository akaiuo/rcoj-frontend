<template>
  <div class="addQuestionView">
    <div id="QuestionOtherInfo" v-if="isEditPage">
      <div style="display: flex; align-items: center">
        <a-space :size="'large'">
          <h1>编辑题目</h1>
          <div>
            <span>题目id</span>
            <icon-question-circle :size="24" />
            <span class="infoVal">{{ form?.id }}</span>
          </div>
          <div>
            <span>创建用户id</span>
            <icon-user :size="24" />
            <span class="infoVal">{{ form?.userId }}</span>
          </div>
        </a-space>
      </div>
      <a-space :size="'large'">
        <div>
          <span>点赞数</span>
          <icon-thumb-up-fill :size="24" />
          <span class="infoVal">{{ form?.thumbNum }}</span>
        </div>
        <div>
          <span>收藏数</span>
          <icon-star-fill :size="24" />
          <span class="infoVal">{{ form?.favourNum }}</span>
        </div>
        <div>
          <span>提交数</span>
          <icon-upload :size="24" />
          <span class="infoVal">{{ form?.submitNum }}</span>
        </div>
        <div>
          <span>通过数</span>
          <icon-check :size="24" />
          <span class="infoVal">{{ form?.acceptNum }}</span>
        </div>
        <div>
          <span>创建时间</span>
          <icon-clock-circle :size="24" />
          <span class="infoVal">{{ moment(form?.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </div>
        <div>
          <span>上次更改时间</span>
          <icon-clock-circle :size="24" />
          <span class="infoVal">{{ moment(form?.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </div>
      </a-space>
    </div>
    <a-form :model="form" :auto-label-width="true" style="align-items: center">
      <a-form-item field="title" label="标题" :rules="[{ required: true }]">
        <a-input v-model="form.title" style="max-width: 400px" />
      </a-form-item>
      <a-form-item
        field="content"
        label="题目内容"
        :rules="[{ required: true }]"
      >
        <MdEditor
          :value="form.content"
          :handle-change="contentHandleChange"
          style="width: 1400px; z-index: 10"
        />
      </a-form-item>
      <a-form-item field="time" label="时间限制">
        <a-slider
          v-model="form.judgeConf.timeLimit"
          step="100"
          max="10000"
          style="width: 400px; display: flex"
        />
        <a-input-number
          v-model="form.judgeConf.timeLimit"
          style="max-width: 100px; margin-left: 20px"
          :max="10000"
          :step="100"
        />
        <span style="margin-left: 10px">ms</span>
      </a-form-item>
      <a-form-item field="memo" label="内存限制">
        <a-slider
          v-model="form.judgeConf.memoLimit"
          step="4000"
          max="1000000"
          style="width: 400px; display: flex"
        />
        <a-input-number
          v-model="form.judgeConf.memoLimit"
          style="max-width: 100px; margin-left: 20px"
          :max="1000000"
          :step="4000"
        />
        <span style="margin-left: 10px">kB</span>
      </a-form-item>
      <a-form-item
        :label="'测试用例'"
        :wrapper-col-style="caseStyle"
        :rules="[{ required: true }]"
      ></a-form-item>
      <a-form-item
        v-for="(post, index) of form.judgeCase"
        :field="`posts[${index}].value`"
        :key="index"
      >
        <div style="display: grid; grid-row: 2; width: 800px">
          <div class="case">
            <span>输入用例{{ index }}</span>
            <a-textarea
              v-model="post.input"
              :auto-size="{ minRows: 3, maxRows: 10 }"
            />
          </div>
          <br />
          <div class="case">
            <span>输出用例{{ index }}</span>
            <a-textarea
              v-model="post.output"
              :auto-size="{ minRows: 3, maxRows: 10 }"
            />
          </div>
        </div>
        <a-button
          @click="handleDelete(index)"
          style="margin-top: auto; margin-left: 20px"
          status="danger"
          >删除
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button @click="handleAdd" type="outline">添加测试用例</a-button>
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          :style="{ width: '400px' }"
          placeholder="Please Enter"
          allow-clear
          v-model="form.tags"
          :size="'large'"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          size="large"
          @click="handleEdit"
          v-if="isEditPage"
          >提交更改
        </a-button>
        <a-button type="primary" size="large" @click="handleSubmit" v-else
          >创建题目
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  QuestionControllerService,
  QuestionEditRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";

const route = useRoute();
const isEditPage = ref(route.path.includes("edit"));
const loadData = async () => {
  const id = route.query.id;
  if (id === null) {
    return;
  }
  const resp = await QuestionControllerService.getQuestionByIdUsingGet(
    route.query?.id as any
  );
  if (resp.code === 0) {
    form.value = resp.data as any;
    form.value.judgeConf = JSON.parse(resp.data?.judgeConf as string);
    form.value.judgeCase = JSON.parse(resp.data?.judgeCase as string);
    form.value.tags = JSON.parse(resp.data?.tags as string);
  } else {
    message.error("获取失败：" + resp.message);
  }
};

let form = ref({
  title: "",
  content: "",
  judgeConf: {
    timeLimit: 1000,
    memoLimit: 256000,
  },
  judgeCase: [
    {
      input: "1 2",
      output: "3",
    },
  ],
  tags: [],
  thumbNum: 0,
  favourNum: 0,
  acceptNum: 0,
  submitNum: 0,
  createTime: "",
  updateTime: "",
  id: 0,
  userId: 0,
});

const router = useRouter();

// 这里防止从编辑页面跳转到添加页面后不变
router.beforeEach((to, from, next) => {
  form.value = {
    title: "",
    content: "",
    judgeConf: {
      timeLimit: 1000,
      memoLimit: 256000,
    },
    judgeCase: [
      {
        input: "1 2",
        output: "3",
      },
    ],
    tags: [],
    thumbNum: 0,
    favourNum: 0,
    acceptNum: 0,
    submitNum: 0,
    createTime: "",
    updateTime: "",
    id: 0,
    userId: 0,
  };
  isEditPage.value = to.path.includes("edit");
  next();
});

const contentHandleChange = (val: string) => {
  form.value.content = val;
};
const handleSubmit = async () => {
  let cancelSubmit = false;
  if (form.value.title === "") {
    message.warning("请输入标题");
    cancelSubmit = true;
  }
  if (form.value.content === "") {
    message.warning("请输入题目内容");
    cancelSubmit = true;
  }
  if (form.value.judgeCase.length == 0) {
    message.warning("请至少添加一个测试用例");
    cancelSubmit = true;
  }
  if (cancelSubmit) return;
  if (form.value.title && form.value.content) {
    const resp = await QuestionControllerService.addQuestionUsingPost(
      form.value as QuestionEditRequest
    );
    if (resp.code === 0) {
      message.success("创建成功");
      await router.push({
        path: "/",
      });
    } else {
      message.error("创建失败：" + resp.message);
    }
  }
};

const handleEdit = async () => {
  if (form.value.judgeCase.length == 0) {
    message.warning("请至少添加一个测试用例");
    return;
  }
  const resp = await QuestionControllerService.editQuestionUsingPost(
    form.value as QuestionEditRequest
  );
  if (resp.code === 0) {
    message.success("更改成功");
    await router.push({
      path: "/manage/question",
    });
  } else {
    message.error("更改失败：" + resp.message);
  }
};

const caseStyle = {
  width: 0,
  float: "left",
  background: "red",
  position: "absolute",
};

const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};

const handleDelete = (index) => {
  form.value.judgeCase.splice(index, 1);
};

onMounted(() => {
  if (isEditPage.value) {
    loadData();
    console.log(1);
  }
});
</script>

<style scoped>
.addQuestionView {
  padding: 32px 10%;
}

.case > * {
  margin-top: 10px; /**子组件的间距*/
}

#QuestionOtherInfo {
  padding-left: 80px;
  padding-bottom: 24px;
}
</style>
