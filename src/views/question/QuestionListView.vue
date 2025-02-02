<template>
  <div id="manageQuestionView">
    <a-form :layout="'inline'">
      <a-form-item field="title" label="题目">
        <a-input v-model="req.title" style="max-width: 400px" />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          style="width: 200px"
          placeholder="Please Enter"
          allow-clear
          v-model="req.tags"
        />
      </a-form-item>
      <a-button @click="handleSearch" :type="'primary'">搜索</a-button>
    </a-form>
    <a-divider :size="0" />
    <a-table :columns="columns" :data="dataList" :pagination="false">
      <template #title="{ record }">
        <span @click="toQuestion(record.id)" class="title">{{
          record.title
        }}</span>
      </template>
      <template #tags="{ record }">
        <a-space>
          <a-tag v-for="(val, idx) in record.tags" :key="idx" color="arcoblue">
            {{ val }}
          </a-tag>
        </a-space>
      </template>
      <template #acceptRate="{ record }">
        <div style="display: flex">
          <a-progress
            :percent="calSubmitRate(record)"
            :animation="true"
            :style="{ width: '50%' }"
            :status="'success'"
          />
          <sapn> ({{ record.acceptNum }}/{{ record.submitNum }})</sapn>
        </div>
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
import { onMounted, ref } from "vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const columns = [
  {
    title: "题目id",
    dataIndex: "id",
    width: 200,
  },
  {
    title: "题目",
    slotName: "title",
    minWidth: 300,
  },
  {
    title: "标签",
    slotName: "tags",
    width: 160,
  },
  {
    title: "通过率(通过/提交)",
    slotName: "acceptRate",
    width: 300,
  },
];

const total = ref();
const dataList = ref([]);

const req = ref({
  pageSize: 20,
  current: 1,
  title: "",
  tags: [],
});

const loadData = async () => {
  const resp = await QuestionControllerService.listQuestionVoByPageUsingPost(
    req.value
  );
  if (resp.code === 0) {
    dataList.value = resp.data.records;
    total.value = resp.data.total;
  } else {
    message.error("题单加载失败：" + resp.message);
  }
};

onMounted(() => {
  loadData();
});

const calSubmitRate = (record: any) => {
  if (!record.submitNum || record.submitNum === 0 || !record.acceptNum) {
    return 0;
  } else {
    return Number((record.acceptNum / record.submitNum).toFixed(3));
  }
};

const route = useRouter();
const toQuestion = (id: number) => {
  route.push({
    path: "/view/question/" + id,
  });
};

const handleSearch = () => {
  req.value.current = 1;
  loadData();
};
</script>

<style scoped>
.title {
  cursor: pointer;
}

.title:hover {
  color: cadetblue;
  text-decoration: underline;
}

#manageQuestionView {
  min-width: 300px;
}

@media screen {
  #manageQuestionView {
    margin: 32px 16px;
    width: calc(100% - 32px);
  }
}

@media screen and (min-width: 1432px) {
  #manageQuestionView {
    margin: 32px auto;
    width: 1400px;
  }
}
</style>
