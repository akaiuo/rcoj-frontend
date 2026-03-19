<!--<template>-->
<!--  <div>-->
<!--    <h3>Vue 接收流式数据</h3>-->
<!--    <p>连接状态：{{ isConnected ? "✅ 已连接" : "❌ 断开" }}</p>-->
<!--    <div v-for="(item, index) in streamDataList" :key="index">-->
<!--      {{ item }}-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, onMounted, onBeforeUnmount } from 'vue';-->

<!--const streamDataList = ref([]);-->
<!--const isConnected = ref(false);-->
<!--let eventSource = null;-->

<!--onMounted(() => {-->
<!--  // 1. 创建 EventSource 实例-->
<!--  eventSource = new EventSource('/streamChat');-->
<!--  isConnected.value = true;-->

<!--  // 2. 接收数据-->
<!--  eventSource.onmessage = (event) => {-->
<!--    console.log("收到数据:", event.data);-->
<!--    streamDataList.value.push(event.data);-->
<!--  };-->

<!--  // 3. 异常处理-->
<!--  eventSource.onerror = (error) => {-->
<!--    console.error("SSE 异常：", error);-->
<!--    isConnected.value = false;-->
<!--    eventSource.close();-->
<!--  };-->
<!--});-->

<!--// 4. 组件卸载前关闭连接-->
<!--onBeforeUnmount(() => {-->
<!--  if (eventSource) {-->
<!--    eventSource.close();-->
<!--    isConnected.value = false;-->
<!--    console.log("组件卸载，关闭 SSE 连接");-->
<!--  }-->
<!--});-->
<!--</script>-->





<template>
  <div class="stream-container">
    <!-- 连接状态提示 -->
    <div class="status">
      连接状态：
      <span :class="{'success': isConnected, 'error': !isConnected && hasError, 'loading': isConnecting}">
        {{ statusText }}
      </span>
      <button @click="restartStream" :disabled="isConnecting">重新连接</button>
    </div>
    <!-- 流式输出区域（核心：逐行追加） -->
    <div class="stream-output">
      <div v-for="(item, index) in streamDataList" :key="index" class="stream-item">
        <span class="index">{{ index + 1 }}.</span>
        <span class="content">{{ item }}</span>
      </div>
      <!-- 无数据提示 -->
      <div v-if="streamDataList.length === 0 && !isConnecting && !hasError" class="empty">
        暂无流式数据
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 响应式数据：存储流式数据列表
const streamDataList = ref([]);
// 连接状态相关
const isConnected = ref(false); // 是否已连接
const isConnecting = ref(true); // 是否正在连接
const hasError = ref(false); // 是否出错
const statusText = ref("正在建立连接...");
// 存储 EventSource 实例（便于后续关闭）
let eventSource = null;

// 后端接口地址（替换为你的实际地址）
const STREAM_API_URL = '/streamChat';

/**
 * 初始化流式连接（核心方法）
 */
const initStream = () => {
  // 重置状态
  streamDataList.value = [];
  isConnected.value = false;
  isConnecting.value = true;
  hasError.value = false;
  statusText.value = "正在建立连接...";

  // 关闭旧连接（避免重复连接）
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }

  try {
    // 创建 EventSource 实例，对接后端 SSE 接口
    eventSource = new EventSource(STREAM_API_URL);

    // 1. 连接成功打开时触发
    eventSource.onopen = () => {
      isConnected.value = true;
      isConnecting.value = false;
      hasError.value = false;
      statusText.value = "已连接，正在接收流式数据...";
      console.log("✅ SSE 连接成功打开");
    };

    // 2. 接收流式数据（核心：每收到一条就追加到列表）
    eventSource.onmessage = (event) => {
      // event.data 是后端返回的单条 String 数据
      const newData = event.data;
      // 追加数据到响应式列表 → 页面实时渲染（流式输出的核心）
      streamDataList.value.push(newData);
      console.log("📥 收到流式数据：", newData);

      // 可选：模拟“数据接收完成”的判断（根据后端返回的特定标识）
      if (newData.includes("第五条数据")) {
        statusText.value = "数据接收完毕，连接已关闭";
        eventSource.close(); // 主动关闭连接
        isConnected.value = false;
      }
    };

    // 3. 连接异常/关闭时触发
    eventSource.onerror = (error) => {
      console.error("❌ SSE 连接异常：", error);
      // 重置状态
      isConnected.value = false;
      isConnecting.value = false;
      hasError.value = true;

      // 区分“正常关闭”和“异常错误”
      if (eventSource.readyState === EventSource.CLOSED) {
        statusText.value = "连接已正常关闭";
      } else {
        statusText.value = "连接出错，请重试";
      }

      // 关闭连接
      eventSource.close();
      eventSource = null;
    };
  } catch (e) {
    console.error("❌ 创建 SSE 连接失败：", e);
    hasError.value = true;
    isConnecting.value = false;
    statusText.value = "创建连接失败：" + e.message;
  }
};

/**
 * 重启流式连接
 */
const restartStream = () => {
  initStream();
};

// 组件挂载时初始化连接
onMounted(() => {
  initStream();
});

// 组件卸载前必须关闭连接（避免内存泄漏）
onBeforeUnmount(() => {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
    console.log("🔌 组件卸载，关闭 SSE 连接");
  }
});
</script>

<style scoped>
.stream-container {
  width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.status {
  margin-bottom: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.status .success {
  color: #198754;
}

.status .error {
  color: #dc3545;
}

.status .loading {
  color: #ffc107;
}

.status button {
  padding: 4px 12px;
  background: #0d6efd;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.status button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.stream-output {
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;
}

.stream-item {
  padding: 8px 0;
  border-bottom: 1px dashed #f1f1f1;
  display: flex;
  align-items: flex-start;
}

.stream-item .index {
  color: #6c757d;
  margin-right: 8px;
  font-weight: bold;
}

.stream-item .content {
  flex: 1;
  word-break: break-all;
}

.empty {
  text-align: center;
  color: #6c757d;
  padding: 20px;
}
</style>