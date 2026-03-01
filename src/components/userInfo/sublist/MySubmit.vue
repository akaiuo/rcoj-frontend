<template>
  <div id="mySubmit">
    <a-form :layout="'inline'">
      <a-form-item field="title" label="题目">
        <a-input v-model="search.title" style="max-width: 400px" />
      </a-form-item>
      <a-form-item field="lang" label="语言">
        <a-select :style="{ width: '120px' }" v-model="search.lang">
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>python</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="lang" label="判题状态">
        <a-select :style="{ width: '120px' }" v-model="search.lang">
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>python</a-option>
        </a-select>
      </a-form-item>
      <a-button @click="handleSearch" :type="'primary'">过滤</a-button>
    </a-form>
    <a-divider />
    <a-table :columns="columns" :data="dataList" :pagination="false">
      <template #submitTime="{ record }">
        {{ moment(record?.submitTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #judgeState="{ record }">
        <span :style="stateStyle(record.judgeState)">{{
            judgeState(record.status, record.judgeState)
          }}</span>
      </template>
      <template #maxTime="{ record }">
        <span>{{ showTime(record.maxTime) }}</span>
      </template>
      <template #maxMemo="{ record }">
        <span>{{ showMemo(record.maxMemo) }}</span>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button
              @click="showInfo(record.submitId)"
              type="outline"
              size="small"
          >详情
          </a-button>
        </a-space>
      </template>
    </a-table>
    <a-pagination
        :total="total"
        v-model:page-size="req.pageSize"
        v-model:current="req.current"
        show-total
        show-jumper
        show-page-size
        @update:current="loadData"
        @update:page-size="loadData"
        :page-size-options="[20, 50, 100]"
        :size="'large'"
        style="margin-top: 10px; justify-content: center"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import JUDGE_ENUM from "@/enums/judgeEnum";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment/moment";
import { useStore } from "vuex";
import {QuestionControllerService} from "../../../../generated";

const columns = [
  {
    title: "问题",
    dataIndex: "question",
  },
  {
    title: "语言",
    dataIndex: "lang",
  },
  {
    title: "判题状态",
    slotName: "judgeState",
  },
  {
    title: "提交时间",
    slotName: "submitTime",
  },
  {
    title: "时间",
    slotName: "maxTime",
  },
  {
    title: "内存",
    slotName: "maxMemo",
  }
];
const dataList = ref();
const total = ref();

const req = ref({
  current: 1,
  pageSize: 20,
});

const store = useStore();
const search = ref({
  title: "",
  user: store.state.user.loginUser.userName,
  lang: "",
});

const handleSearch = () => {
  alert("search" + JSON.stringify(search.value));
};

const loadData = async () => {
  const resp =
      await QuestionControllerService.listQuestionSubmitVoByPageUsingPost(
          req.value
      );
  if (resp.code !== 0) {
    message.warning("获取列表失败：" + resp.message);
    return;
  }
  const data = resp.data.records;
  console.log("data: " + data);
  total.value = resp.data.total;
  dataList.value = [];
  for (let i = 0; i < data.length; i++) {
    dataList.value.push({
      submitId: data[i].id,
      userId: data[i].userId,
      submitTime: data[i].createTime,
      question: data[i].questionId,
      lang: data[i].lang,
      judgeState: data[i].judgeInfo.message,
      maxTime: data[i].judgeInfo.maxTime,
      maxMemo: data[i].judgeInfo.maxMemo,
      status: data[i].status,
    });
  }
};

const showTime = (time: number) => {
  if (time == null || time === 0) {
    return "-";
  } else {
    return time + "ms";
  }
};

const showMemo = (memo: number) => {
  if (memo == null || memo === 0) {
    return "-";
  } else {
    return (memo / 1000).toFixed(0) + "kB";
  }
};

const stateStyle = (judgeState: string) => {
  if (judgeState == null || judgeState === "") {
    return null;
  }
  if (judgeState === JUDGE_ENUM.ACCEPTED) {
    return {
      color: "limeGreen",
      fontWeight: "bold",
    };
  } else if (
      judgeState === JUDGE_ENUM.COMPILE_ERROR ||
      judgeState === JUDGE_ENUM.RUNTIME_ERROR
  ) {
    return {
      color: "deepSkyBlue",
      fontWeight: "bold",
    };
  } else {
    return {
      color: "orangeRed",
      fontWeight: "bold",
    };
  }
};

const route = useRouter();
const showInfo = (submitId: string) => {
  route.push({
    path: "/view/submit/" + submitId,
  });
};

const judgeState = (status: number, judgeState: string) => {
  if (status === 0) {
    return "待判题";
  } else if (status === 1) {
    return "判题中";
  } else if (judgeState !== "") {
    return judgeState;
  }
  return "-";
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>

#mySubmit {
  margin: 24px;
}
</style>
