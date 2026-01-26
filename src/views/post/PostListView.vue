<template>
  <div id="postListView">
    <div class="box a">
      <a-list
          class="list-demo-action-layout"
          :bordered="false"
          :data="posts"
          :pagination-props="paginationProps"
          hoverable
      >
        <template #scroll-loading>
          <!-- 瀑布式获取数据-->
          <div v-if="isBottom">--所有文章已加载完成--</div>
          <a-spin v-else /> <!-- 加载动画-->
        </template>
        <template #item="{ item }">
          <a-list-item class="list-demo-item" action-layout="vertical" @click="toPost(item.postId)">
            <template #actions>
              <span><icon-heart />{{item.favourNum}}</span>
              <span><icon-star />{{item.starNum}}</span>
            </template>
            <a-list-item-meta>
              <template #avatar>
                <a-avatar shape="circle" id="avatar">
                  <img alt="avatar" :src="item.avatar" />
                </a-avatar>
              </template>
              <template #title>
                <span style="font-size: 18px; font-weight: bold">{{item.title}}</span><br/>
                <span class="username" >{{item.username}}</span>
              </template>
              <template #description>
                {{item.description}}
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <div class="box b">
      <div style="height: 260px; padding: 16px;" class="boxB">
        <span>帖子过滤器</span>
        <a-button :status="'normal'" :size="'small'" @click="addPostHandle" style="margin-left: 16px" type="primary">
          <icon-plus/>创建帖子
        </a-button>
        <a-form :label-align="'left'" auto-label-width style="margin-top: 16px;" :size="'small'">
          <a-form-item label="标题">
            <a-input v-model="req.title"></a-input>
          </a-form-item>
          <a-form-item field="tags" label="标签">
            <a-input-tag
                style="width: 200px"
                allow-clear
                v-model="req.tags"
            />
          </a-form-item>
          <a-form-item label="发布时间">
            <a-date-picker
                style="width: 200px"
                show-time
                format="YYYY-MM-DD hh:mm:ss"
                placeholder="该时间点之后"
                v-model="req.createAfter"
                value-format="YYYY-MM-DDThh:mm:ss"
            />
          </a-form-item>
          <a-form-item>
            <a-date-picker
                style="width: 200px;"
                show-time
                format="YYYY-MM-DD hh:mm:ss"
                placeholder="该时间点之前"
                v-model="req.createBefore"
                value-format="YYYY-MM-DDThh:mm:ss"
            />
          </a-form-item>
          <a-form-item>
            <a-button :type="'primary'" @click="handleSearch">筛选</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div style="height: 486px; margin-top: 20px" class="boxB">
        <div style="height: 100px; padding: 16px;">
          <span>一言</span>
          <br/>
          <span style="font-size: 20px; display: block; padding-top: 10px">{{hitokoto}}</span>
        </div>
        <div id="calendar">
          <a-date-picker
              hide-trigger
              style="width: 350px;"
          />
        </div>
      </div>
    </div>
    <a-back-top :style="{position:'fixed'}" />
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {PostControllerService} from "../../../generated/post";
import {Message} from "@arco-design/web-vue";
import {useRouter} from "vue-router";
import axios from "axios";
import {languages} from "monaco-editor";
import json = languages.json;

const posts = ref([])

const data = ref();
const req = ref({
  pageSize: 15,
  current: 1,
  title: "",
  tags: [],
  createAfter: "",
  createBefore: "",
})

const hitokoto = ref("");

const isBottom = ref(false)

const loadData = async () => {
  const resp = await PostControllerService.getPostListUsingPost(req.value);
  if (resp.code != 0) {
    Message.error(resp.message);
  }else {
    for (const record of resp.data.records) {
      posts.value.push({
        postId: record.id,
        title: record.title,
        description: record.preview,
        crateTime: record.createTime,
        tags: record.tags,
        favourNum: record.favourNum,
        starNum: record.starNum,
        userId: record.userVO.userId,
        username: record.userVO.userName,
        userRole: record.userVO.userRole,
        avatar: record.userVO.userAvatar,
      })
    }
    req.value.current += 1;
    console.log(resp.pages)
    if (resp.data.pages < req.value.current) {
      isBottom.value = true;
    }
  }
}

const handleSearch = () => {
  // alert(JSON.stringify(req.value));
  posts.value = [];
  req.value.current = 1;
  isBottom.value = false;
  loadData();
}


const handleWindow = () => {
  const boxB = document.getElementsByClassName("box b");
  if (window.scrollY <= 88) {
    boxB[0].style.top = 104 - window.scrollY + "px";
  }else {
    boxB[0].style.top = "16px";
  }
}

let block = false;
const handleBottom = async () => {
  // 变量 scrollHeight 是滚动条的总高度
  let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  // 变量 windowHeight 是可视区的高度
  let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
  // 变量 scrollTop 为当前页面的滚动条纵坐标位置
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // 滚动条到底部的距离 = 滚动条的总高度 - 可视区的高度 - 当前页面的滚动条纵坐标位置
  let scrollBottom = scrollHeight - windowHeight - scrollTop
  console.log(scrollBottom,'scrollBottom')
  if (!isBottom.value && scrollBottom < 100) {
    // 阻隔多线程调用 （测试中暂未发现问题）
    if (block) {
      return;
    }
    block = true;
    await loadData()
    block = false;
  }
}

const route = useRouter();

const toPost = (postId: number) => {
  const { href } = route.resolve({
    path: "/post/view/" + postId,
  });
  window.open(href, '_blank');
};

const addPostHandle = () => {
  route.push({
    path: "post/edit"
  })
}

const toUser = (userId: number) => {
  //TODO 跳转到用户主页
}

const loadHitokoto = async () => {
  await axios.get('/hitokoto')
      .then(function (resp) {
        // 成功处理
        console.log(resp.data.hitokoto);
        hitokoto.value = resp.data.hitokoto;
      })
      .catch(function (error) {
        // 错误处理
        console.log(error);
      })
      .finally(function () {
        // 总是执行
      });
}

onMounted(() => {
  window.addEventListener("scroll", handleWindow);
  window.addEventListener("scroll", handleBottom);
  loadHitokoto();
  loadData();
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleWindow);
  window.removeEventListener("scroll", handleBottom);
});
</script>

<style scoped>
#postListView {
  display: grid;
  grid-gap: 16px;
  margin: 32px auto;
}

.list-demo-action-layout .list-demo-item {
  cursor: pointer;
}

.username:hover {
  color: cadetblue;
  text-decoration: underline;
}

.a {
  grid-column: col1-start / col2-start;
  box-shadow: rgba(0, 0, 0, 0.15) 0 15px 25px, rgba(0, 0, 0, 0.05) 5px 5px 10px;
  background-color: white;
}

.b {
  grid-column: col2-start / col2-end;
  grid-row: row1-start / row2-start;
  position: fixed;
  width: 350px;
  left: calc((100vw - 1366px) / 2 + 1016px);
}

.boxB {
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0 15px 25px, rgba(0, 0, 0, 0.05) 5px 5px 10px;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
}


@media screen and (min-width: 1398px){
  #postListView {
    grid-template-columns: [col1-start] 1000px [col2-start] 350px [col2-end];
    width: 1366px;
  }
}
@media screen and (max-width: 1398px) and (min-width: 1198px) {
  #postListView {
    grid-template-columns: [col1-start] auto [col2-start] 350px [col2-end];
    width: auto;
    margin: 32px 16px;
  }
  .b {
    left: auto;
    right: 16px;
  }
}
@media screen and (max-width: 1198px) {
  #postListView {
    grid-template-columns: [col1-start] auto [col2-start];
    width: auto;
    margin: 32px 16px;
  }
  .b {
    display: none;
  }
}
</style>