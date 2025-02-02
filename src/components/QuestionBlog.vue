<template>
  <div id="questionBolg">
    <a-list
        class="list-demo-action-layout"
        :bordered="false"
        :data="blogs"
        :pagination-props="paginationProps"
        hoverable
    >
      <template #item="{ item }">
        <a-list-item class="list-demo-item" action-layout="vertical">
          <template #actions>
            <span><icon-heart />83</span>
            <span><icon-star />1</span>
          </template>
          <a-list-item-meta>
            <template #avatar>
              <a-avatar shape="circle" id="avatar">
                <img alt="avatar" :src="item.avatar" />
              </a-avatar>
            </template>
            <template #title>
              <span>{{item.title}}</span><br/>
              <span style="font-size: 20px; font-weight: bold">rwreqe</span>
            </template>
            <template #description>
              <MdViewer :value="item.description" />
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
</template>

<script setup lang="ts">
import {ref} from "vue";
import MdViewer from "@/components/MdViewer.vue";

const blogs = ref([{
  avatar: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp",
  title: "nice trip",
  description:
      'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
  imageSrc: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp",
  },
  {
    avatar: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp",
    title: "nice trip",
    description:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
    imageSrc: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp",
  },
  {
    avatar: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp",
    title: "nice trip",
    description:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
    imageSrc: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp",
  },
  {
    avatar: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp",
    title: "nice trip",
    description:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
    imageSrc: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp",
  },
  {
    avatar: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp",
    title: "nice trip",
    description:
        'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
    imageSrc: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp",
  }
])

const isBottom = ref(true)
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

#questionBolg {

}
</style>