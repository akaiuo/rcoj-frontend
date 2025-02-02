<template>
  <div id="manageQuestionView">
    <a-form :layout="'inline'">
      <a-form-item field="title" label="题目">
        <a-input v-model="search.title" />
      </a-form-item>
      <a-form-item field="createUser" label="创建用户">
        <a-input v-model="search.user" />
      </a-form-item>
      <a-button @click="handleSearch" :type="'primary'">搜索</a-button>
      <a-button
        :type="'primary'"
        id="createQuestion"
        @click="handleCreateQuestion"
        >创建题目
      </a-button>
    </a-form>
    <a-divider size="0" />
    <a-table :columns="columns" :data="dataList" :pagination="false">
      <template #optional="{ record }">
        <a-space>
          <a-button @click="editRow(record)" type="primary">编辑</a-button>
          <a-popconfirm
            content="确定删除?"
            type="error"
            @ok="deleteRow(record)"
          >
            <a-button status="danger">删除</a-button>
          </a-popconfirm>
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

const search = ref({
  title: "",
  user: "",
});

const handleSearch = () => {
  alert("search");
};

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
};

const route = useRouter();

const handleCreateQuestion = () => {
  route.push({
    path: "/add/question",
  });
};

const editRow = (question: Question) => {
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
  min-width: 800px;
}

#createQuestion {
  margin-left: auto;
}

@media screen {
  #manageQuestionView {
    margin: 32px 16px;
    width: calc(100% - 32px);
  }
}

@media screen and (min-width: 1632px) {
  #manageQuestionView {
    margin: 32px auto;
    width: 1600px;
  }
}
</style>
