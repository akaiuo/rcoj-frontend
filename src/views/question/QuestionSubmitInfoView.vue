<template>
  <div id="QuestionSubmitInfoView">
    <a-descriptions
      :column="{ xs: 5, xl: 9 }"
      :size="'large'"
      layout="vertical"
      bordered
    >
      <a-descriptions-item label="提交id">
        {{ judgeData?.id }}
      </a-descriptions-item>
      <a-descriptions-item label="语言">
        {{ judgeData?.lang }}
      </a-descriptions-item>
      <a-descriptions-item label="题目id">
        {{ judgeData?.questionId }}
      </a-descriptions-item>
      <a-descriptions-item label="提交用户">
        {{ judgeData?.userId }}
      </a-descriptions-item>
      <a-descriptions-item label="提交时间">
        {{ moment(judgeData?.createTime).format() }}
      </a-descriptions-item>
      <a-descriptions-item label="判题时间">
        {{ moment(judgeData?.updateTime).format() }}
      </a-descriptions-item>
      <a-descriptions-item label="判题结果">
        <span :style="stateStyle(judgeData?.judgeInfo.message)">{{
          judgeState(judgeData?.status, judgeData?.judgeInfo.message)
        }}</span>
      </a-descriptions-item>
      <a-descriptions-item label="时间">
        {{ showTime(judgeData?.judgeInfo?.maxTime) }}
      </a-descriptions-item>
      <a-descriptions-item label="内存">
        {{ showMemo(judgeData?.judgeInfo?.maxMemo) }}
      </a-descriptions-item>
    </a-descriptions>
    <a-divider />
    <div id="code">
      <a-descriptions>
        <a-descriptions-item> 提交代码：</a-descriptions-item>
      </a-descriptions>
      <div style="border: #cccccc solid 2px;">
        <CodeEditor
          :lang="judgeData?.lang"
          :value="judgeData?.code"
          :height="'600px'"
          :read-only="true"
          v-if="judgeData?.code !== undefined"
        />
      </div>
    </div>
    <div id="executeInfo" v-if="judgeData?.judgeInfo.message === '编译错误'">
      <a-divider />
      <a-descriptions>
        <a-descriptions-item> 编译器输出：</a-descriptions-item>
      </a-descriptions>
      <CodeEditor
        :lang="'ssh'"
        :value="judgeData?.executeMessage ?? ''"
        :height="'200px'"
        :read-only="true"
        v-if="judgeData?.executeMessage !== undefined"
        :line-numbers="'off'"
      />
    </div>
    <div id="judgeList" v-else>
      <a-divider />
      <a-descriptions>
        <a-descriptions-item> 判题用例信息：</a-descriptions-item>
      </a-descriptions>
      <a-table :columns="columns" :data="judgeList" :pagination="false">
        <template #time="{ record }">
          {{ showTime(record.time) }}
        </template>
        <template #memo="{ record }">
          {{ showMemo(record.memo) }}
        </template>
        <template #judgeState="{ record }">
          <span :style="stateStyle(record.judgeState)">
            {{ record.judgeState }}
          </span>
        </template>
        <template #optional="{ record }">
          <template v-if="record.errorOutput != ''">
            <a-button
              :type="'primary'"
              @click="clickInfo(record.errorOutput)"
              size="small"
            >
              详情
            </a-button>
            <a-modal
              v-model:visible="model.visible"
              @ok="model.visible = false"
              :width="800"
              hide-cancel
            >
              <template #title> 错误输出</template>
              <CodeEditor
                :value="model.info"
                :line-numbers="'off'"
                :height="'200px'"
                :lang="'ssh'"
                :read-only="true"
                v-if="model.visible"
              />
            </a-modal>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, withDefaults } from "vue";
import { QuestionControllerService } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import CodeEditor from "@/components/codeEditor.vue";
import JUDGE_ENUM from "@/enums/judgeEnum";
import moment from "moment/moment";

interface Props {
  submitId: string;
}

const props = withDefaults(defineProps<Props>(), {
  submitId: () => "",
});

const columns = [
  {
    title: "用例编号",
    dataIndex: "num",
  },
  {
    title: "判题状态",
    slotName: "judgeState",
  },
  {
    title: "时间",
    slotName: "time",
  },
  {
    title: "内存",
    slotName: "memo",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const judgeList = ref();
let judgeData = ref();
const loadData = async () => {
  const resp = await QuestionControllerService.getQuestionSubmitVoByIdUsingPost(
    props.submitId as any
  );
  if (resp.code !== 0) {
    Message.error("数据获取失败：" + resp.message);
    return;
  }
  judgeData.value = resp.data;
  judgeList.value = [];
  if (
    judgeData.value.judgeInfoDetail == null ||
    judgeData.value.judgeInfoDetail.messageList == null
  ) {
    return;
  }
  for (let i = 0; i < judgeData.value.judgeInfoDetail.messageList.length; i++) {
    judgeList.value.push({
      num: "#" + i,
      judgeState: judgeData.value.judgeInfoDetail.messageList[i],
      time: judgeData.value.judgeInfoDetail.timeList[i],
      memo: judgeData.value.judgeInfoDetail.memoList[i],
      errorOutput: judgeData.value.judgeInfoDetail.errorOutputList[i],
    });
  }
};

const editorInput = (val: string) => {
  judgeData.value.code = val;
};

const showTime = (time: number) => {
  if (time == null || time === 0) {
    return "-";
  } else {
    return time + "ms";
  }
};

const model = ref({
  visible: false,
  info: "",
});

const clickInfo = (info: string) => {
  model.value.info = info;
  model.value.visible = true;
};

const showMemo = (memo: number) => {
  if (memo == null || memo === 0) {
    return "-";
  } else {
    return (memo / 1000).toFixed(0) + "kB";
  }
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

onMounted(() => {
  loadData();
});
</script>

<style scoped>
#QuestionSubmitInfoView {
  min-width: 800px;
  margin: 32px 10%;
}
</style>
