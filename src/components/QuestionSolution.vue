<template>
  <div id="questionSolution">
    <a-button type="primary" shape="round" style="margin-bottom: 16px; position: absolute; right: 24px" @click="addSolution">
      <icon-plus size="large"/>编写题解
    </a-button>
    <div style="padding-top: 42px">
      <a-list
          class="list-demo-action-layout"
          :bordered="false"
          :data="posts"
          :pagination-props="paginationProps"
          hoverable
      >
        <template #item="{ item }" >
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
                <span style="font-weight: bold; font-size: large" >{{item.title}}</span><br/>
                <span style="color: rgb(128,128,128)">@{{item.username}}</span>
              </template>
              <template #description>
                <span>{{item.description}}</span>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
        <template #scroll-loading>
          <div v-if="isBottom">--所有题解已加载完成--</div>
          <a-spin v-else />
        </template>
      </a-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, ref, withDefaults} from "vue";
import {PostControllerService} from "../../generated/post";
import {Message} from "@arco-design/web-vue";
import {useRouter} from "vue-router";

interface Props {
  questionId: string;
}

const props = withDefaults(defineProps<Props>(), {
  questionId: () => "",
});

const posts = ref([])

const isBottom = ref(true)

const req = ref({
  questionId: props.questionId,
  pageSize: 15,
  current: 1,
})
const loadData = async () => {
  const resp = await PostControllerService.getSolutionListUsingPost(req.value);
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
        imageSrc: record.userVO.userAvatar,
      })
    }
    req.value.current += 1;
    console.log(resp.pages)
    if (resp.data.pages < req.value.current) {
      isBottom.value = true;
    }
  }
}

const route = useRouter()
const toPost = (postId: number) => {
  const { href } = route.resolve({
    path: "/post/view/" + postId,
  });
  window.open(href, '_blank');
};

const addSolution = () => {
  route.push("/add/solution/" + props.questionId)
}

onMounted(() => {
  loadData()
})

</script>

<style scoped>

.list-demo-action-layout .list-demo-item {
  width: auto;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .list-demo-item img {
  width: 100%;
}

#avatar {
  vertical-align: top;
  justify-content: start;
  display: grid;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}

#questionSolution {

}
.list-demo-item:hover {
  cursor: pointer;
}
</style>