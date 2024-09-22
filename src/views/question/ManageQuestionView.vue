<template>
  <div id="manageQuestionView">
    <a-table :columns="columns" :data="dataList" :pagination="false">
      <template #optional="{ record }">
        <a-space>
          <a-button @click="editRow(record)" type="primary">编辑</a-button>
          <a-button @click="deleteRow(record)" status="danger">删除</a-button>
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
      :page-size-options="[10, 20, 50, 100]"
      :size="'large'"
      style="margin-top: 10px; justify-content: center"
    />
  </div>
</template>

<script setup lang="ts">
import { Question, QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const columns = [
  {
    title: "题目id",
    dataIndex: "id",
  },
  {
    title: "题目",
    dataIndex: "title",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptNum",
  },
  {
    title: "点赞数",
    dataIndex: "thumbNum",
  },
  {
    title: "收藏数",
    dataIndex: "favourNum",
  },
  {
    title: "创建用户",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
const dataList = ref([]);
const total = ref();

const req = ref({
  current: 1,
  pageSize: 10,
});
const loadData = async () => {
  const resp = await QuestionControllerService.listQuestionByPageUsingPost(
    req.value
  );
  if (resp.code !== 0) {
    message.warning("获取列表失败：" + resp.message);
    return;
  }
  dataList.value = resp.data.records;
  total.value = resp.data.total;
  console.log(resp.data.records);
};

const route = useRouter();
const editRow = (question: Question) => {
  console.log("edit");
  route.push({
    path: "/edit/question",
    query: {
      id: question.id,
    },
  });
};

const deleteRow = async (question: Question) => {
  console.log("delete");
  const resp = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (resp.code === 0) {
    message.success("删除成功");
    // todo 更新数据
    await loadData();
  } else {
    message.error("删除失败" + resp.message);
  }
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
#manageQuestionView {
  padding: 32px 10%;
}
</style>
