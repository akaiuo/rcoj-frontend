<template>
  <div id="submitStatistic">
    <span style="justify-content: center; display: flex">提交分析</span>
    <div style="float: left; width: 35%; padding-top: 20px">
      <a-descriptions :layout="'vertical'" :column="1" :size="'medium'">
        <a-descriptions-item label="提交数">{{desc.submitNum}}</a-descriptions-item>
        <a-descriptions-item label="提交通过数">{{desc.passSubmitNum}}</a-descriptions-item>
        <a-descriptions-item label="通过题目数">{{desc.passQuestionNum}}</a-descriptions-item>
      </a-descriptions>
    </div>
    <div style="width: 65%; float: right">
      <e-charts :option="option" style="width: 100%; height: 250px"></e-charts>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const option = {
  tooltip: {
    // 气泡框
    trigger: "item",
  },
  legend: {
    // 图例
    show: false,
    top: "10",
    left: "center",
  },
  series: [
    {
      type: "pie",
      avoidLabelOverlap: true,
      label: {
        show: false,
        position: "absolute",
        size: 20,
      },
      emphasis: {
        label: {
          show: false,
          fontSize: 28,
          fontWeight: "bold",
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "通过" },
        { value: 735, name: "超出时间限制" },
        { value: 580, name: "答案错误" },
        { value: 484, name: "运行错误" },
        { value: 300, name: "超出内存限制" },
      ],
      color: ["green", "orange", "red", "skyblue", "orange"],
    },
  ],
};

const desc = ref({
  submitNum: 2319,
  passSubmitNum: 1048,
  passQuestionNum: 782,
});
</script>

<style scoped>
#submitStatistic {
  height: 300px;
  margin: 24px;
}
</style>