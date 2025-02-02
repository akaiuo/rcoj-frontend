<template>
  <div id="postPageView">
    <div id="post">
      <div id="postTitle">
        <h1>{{ post.title }}</h1>
        <a-descriptions :layout>
          <a-descriptions-item>
            <span>{{ author.username }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="发布时间">
            <span>{{moment(post.createTime).format()}}</span>
          </a-descriptions-item>
          <a-descriptions-item label="修改时间">
            <span>{{ moment(post.updateTime).format() }}</span>
          </a-descriptions-item>
        </a-descriptions>
        <a-space>
          <a-tag v-for="(val, idx) in post.tags" :key="idx" :size="'large'" color="blue" style="border-radius: 20px;">
            <span>{{val}} </span>
          </a-tag>
        </a-space>
      </div>
      <a-divider :type="'dashed'"/>
      <div v-if="post.editorType === 1">
        <WangViewer :text="post.text" :editor-style="'padding: 0px 22px;'"/>
      </div>
      <div v-if="post.editorType === 2" style="padding: 10px 32px;">
        <MdViewer :value="post.text" />
      </div>
      <div id="panel">
        <div class="in">
          <div id="left" style="float: left; margin: auto 16px">
            <a-space>
              <a-avatar>
                <img alt="avatar" :src="author.avatar" />
              </a-avatar>
              <span style="font-size: 18px; margin-top: 4px">{{
                author.username
              }}</span>
            </a-space>
          </div>
          <div id="right" style="float: right; margin: 8px 16px">
            <a-space size="medium">
              <div class="action" @click="handleThumb">
                <icon-thumb-up :size="22" v-show="!isThumb" class="icon" />
                <icon-thumb-up-fill
                  :size="22"
                  style="color: steelblue"
                  v-show="isThumb"
                  class="icon"
                />
                <span> {{ question?.thumbNum ?? "-1" }} </span>
              </div>
              <div class="action" @click="handleFavor">
                <icon-star :size="22" v-show="!isFavor" />
                <icon-star-fill
                  :size="22"
                  style="color: darkorange"
                  v-show="isFavor"
                />
                <span> {{ question?.favourNum ?? "-1" }} </span>
              </div>
              <div class="action">
                <icon-message :size="22" />
                <span> {{ question?.favourNum ?? "-1" }} </span>
              </div>
            </a-space>
          </div>
        </div>
      </div>
      <hr style="border: 0; border-top: 1px dashed lightgray;">
      <div id="panelRoot" class="grayRect">
        <div class="in">
          <div id="left" style="float: left; margin: auto 16px">
            <a-space>
              <a-avatar>
                <img alt="avatar" :src="author.avatar" />
              </a-avatar>
              <span style="font-size: 18px; margin-top: 4px">{{
                author.username
              }}</span>
            </a-space>
          </div>
          <div id="right" style="float: right; margin: 8px 16px">
            <a-space size="medium">
              <div class="action" @click="handleThumb">
                <icon-thumb-up :size="22" v-show="!isThumb" class="icon" />
                <icon-thumb-up-fill
                  :size="22"
                  style="color: steelblue"
                  v-show="isThumb"
                  class="icon"
                />
                <span> {{ question?.thumbNum ?? "-1" }} </span>
              </div>
              <div class="action" @click="handleFavor">
                <icon-star :size="22" v-show="!isFavor" />
                <icon-star-fill
                  :size="22"
                  style="color: darkorange"
                  v-show="isFavor"
                />
                <span> {{ question?.favourNum ?? "-1" }} </span>
              </div>
              <div class="action">
                <icon-message :size="22" />
                <span> {{ question?.favourNum ?? "-1" }} </span>
              </div>
            </a-space>
          </div>
        </div>
      </div>
    </div>
    <a-divider size="1" />
    <PostComment :postId="props.id"/>
    {{props.id}}
    {{store.state.user.loginUser.id}}
  </div>
</template>

<script setup lang="ts">
import WangViewer from "@/components/WangViewer.vue";
import {defineProps, onMounted, onUnmounted, ref, withDefaults} from "vue";
import QuestionComment from "@/components/QuestionComment.vue";
import {PostControllerService} from "../../../generated/post";
import {Message} from "@arco-design/web-vue";
import MdViewer from "@/components/MdViewer.vue";
import {useStore} from "vuex";
import moment from "moment";
import PostComment from "@/components/PostComment.vue";


interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const store  = useStore();

const post = ref({
  title: "Hello World",
  text: "<p><h2>hello world</h2><br/><br/><br/><br/><br/><br/><br/><p>dsd</p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><p>hhh</p></p>",
  tags: [],
  updateTime: "2025-01-05T15:24:28+08:00",
  createTime: "2025-01-05T15:24:28+08:00",
  editorType: 1,
});
const author = ref({
  avatar:
    "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp",
  username: "abcd",
  id: "34151235",
});

const handleWindow = () => {
  const panel = document.getElementById("panel");
  const panelRoot = document.getElementById("panelRoot");
  const post = document.getElementById("post");

  console.log(window.scrollY, window.innerHeight, post?.offsetHeight);
  if (window.scrollY + window.innerHeight >= post?.offsetHeight) {
    panel.style.display = "none";
  } else {
    panel.style.display = "";
  }
};

// 定义一个函数，用于回到页面顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth", // 可选，平滑滚动效果
  });
};

const loadData = async () => {
  const resp = await PostControllerService.getPostUsingGet(props.id as any);
  if (resp.code != 0) {
    Message.error("获取数据失败：" + resp.message);
  }else {
    const data = resp.data;
    if (data == undefined) {
      Message.warning("数据加载失败")
      return;
    }
    post.value.title = data.title ?? "";
    post.value.text = data.content ?? "";
    post.value.createTime = data.createTime ?? "";
    post.value.updateTime = data.updateTime ?? "";
    post.value.editorType = data.editorType ?? 1;

    author.value.username = data.userVO?.userName ?? "";
    author.value.avatar = data.userVO?.userAvatar ?? "";
    author.value.id = data.userVO?.id  + "" ?? "";

    post.value.tags = [];
    for (const s of data?.tags ?? []) {
      post.value.tags.push(s)
    }
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleWindow);
  loadData()
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleWindow);
});
</script>

<style scoped>
#postPageView {
}

#post {
  box-shadow: rgba(0, 0, 0, 0.15) 0 15px 25px, rgba(0, 0, 0, 0.05) 5px 5px 10px;
  border-radius: 15px;
}

#postTitle {
  padding: 10px 32px 0 32px; /* 上右下左 */
}

#panel {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 54px;
  vertical-align: center;
  display: flex;
  letter-spacing: 1px;

  padding: 0 2px;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 5px, rgba(0, 0, 0, 0.15) -15px -5px 10px;
  background-color: white;
  opacity: 0.9;
}

.action {
  display: inline-block;
  color: var(--color-text-1);
  padding: 0 2px;
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}

#panelRoot {
  height: 54px;
  vertical-align: center;
  display: flex;
  letter-spacing: 1px;
}

.action:hover {
  background: var(--color-fill-3);
}
@media screen {
  #postPageView {
    margin: 32px 16px;
    width: calc(100% - 32px);
  }

  .in {
    margin: auto 16px;
    width: 1200px;
  }
}

@media screen and (min-width: 1232px) {
  #postPageView {
    margin: 32px auto;
    width: 1200px;
  }

  .in {
    margin: auto auto;
    width: 1200px;
  }
}
</style>