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
              <span><icon-heart />{{item.thumbNum}}</span>
              <span><icon-star />{{item.favourNum}}</span>
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
      bb
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {PostControllerService} from "../../../generated/post";
import {Message} from "@arco-design/web-vue";
import {useRouter} from "vue-router";

const posts = ref([])

const data = ref();
const req = ref({
  pageSize: 15,
  current: 1,
})
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
        thumbNum: record.thumbNum,
        favourNum: record.favourNum,
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

const toUser = (userId: number) => {
  //TODO 跳转到用户主页
}

onMounted(() => {
  window.addEventListener("scroll", handleWindow);
  window.addEventListener("scroll", handleBottom);
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
}

.b {
  grid-column: col2-start / col2-end;
  grid-row: row1-start / row2-start;
  position: fixed;
  width: 350px;
  height: 300px;
  background-color: #cccccc;
  left: calc((100vw - 1366px) / 2 + 1016px);
}

.box {
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0 15px 25px, rgba(0, 0, 0, 0.05) 5px 5px 10px;
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