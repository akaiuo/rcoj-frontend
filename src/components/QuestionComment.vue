<template>
  <div id="questionComment">
    <div id="editComment">
      <a-form :layout="'inline'">
        <a-form-item>
          <span style="font-size: 20px">评论</span>
          <span style="color: rgb(128, 128, 128)">（支持MarkDown编辑）</span>
        </a-form-item>
        <a-form-item>
          <a-button
            :type="'primary'"
            id="handleSubmitComment"
            @click="addComment"
            >发布评论
          </a-button>
        </a-form-item>
      </a-form>
      <MdEditor
        v-model:value="myComment"
        :handle-change="editCommentHandleChange"
      />
    </div>
    <a-divider />
    <a-space>
      <span>排序</span>
      <a-select v-model="commentSort">
        <a-option>最新</a-option>
        <a-option>最早</a-option>
        <a-option>热门</a-option>
      </a-select>
    </a-space>
    <a-divider size="0" />
    <div v-for="(val, idx) in comments" :key="val.commentId">
      <a-comment :author="val.author" :datetime="val.dateTime">
        <template #content>
          <MdViewer :value="val.content" />
        </template>
        <template #actions>
          <span class="action" key="heart" @click="onLikeChange(idx as number)">
            <span v-if="val.isLike">
              <IconHeartFill :style="{ color: '#f53f3f' }" />
            </span>
            <span v-else>
              <IconHeart />
            </span>
            {{ val.likeNum + (val.isLike ? 1 : 0) }}
          </span>
          <span class="action" key="reply"> <IconMessage /> 回复 </span>
          <span
            v-show="val.author === store.state.user.loginUser.userName"
            class="action"
            @click="onDeleteChange(idx as number)"
            ><IconDelete />删除</span
          >
        </template>
        <template #avatar>
          <a-avatar>
            <img
              alt="avatar"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            />
          </a-avatar>
        </template>
      </a-comment>
      <a-divider :type="'solid'" :margin="15" :size="0" />
    </div>
    <a-pagination :total="100" :page-size="10" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, withDefaults } from "vue";
import MdViewer from "@/components/MdViewer.vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../generated/question";
import { Message } from "@arco-design/web-vue";
import { useStore } from "vuex";

const store = useStore();

interface Props {
  questionId: string;
}

const props = withDefaults(defineProps<Props>(), {
  questionId: () => "",
});

const myComment = ref("");

const comments = ref();

const editCommentHandleChange = (val: string) => {
  myComment.value = val;
};

const commentSort = ref("最新");

const onLikeChange = (idx: number) => {
  if (comments.value[idx].isLike) {
    QuestionControllerService.cancelThumbCommentUsingPut(
      comments.value[idx].commentId
    );
  } else {
    QuestionControllerService.thumbCommentUsingPut(
      comments.value[idx].commentId
    );
  }
  comments.value[idx].isLike = !comments.value[idx].isLike;
};

const onDeleteChange = async (idx: number) => {
  const resp = await QuestionControllerService.deleteCommentUsingDelete(
    comments.value[idx].commentId
  );
  if (resp.code !== 0) {
    Message.error(resp.message);
  } else {
    Message.success("评论已删除");
    await loadData();
  }
};

const req = ref({
  current: 1,
  pageSize: 10,
  questionId: props.questionId,
  sortField: "createTime",
  sortOrder: "descend",
});

const loadData = async () => {
  const resp =
    await QuestionControllerService.postCommentsByQuestionIdUsingPost(
      req.value
    );
  if (resp.code != 0) {
    Message.error(resp.message);
    return;
  }
  comments.value = [];
  for (const record of resp.data.records) {
    console.log(record);
    comments.value.push({
      commentId: record.id,
      author: record.userVO.userName,
      content: record.content,
      dateTime: record.createTime,
      avatar: record.userVO.avatar,
      likeNum: record.thumbNum - (record.hasThumb ? 1 : 0),
      isLike: record.hasThumb,
    });
  }
};

const addComment = async () => {
  if (myComment.value === "") {
    Message.warning("评论不能为空");
    return;
  }
  const resp = await QuestionControllerService.addCommentUsingPost({
    questionId: props.questionId,
    content: myComment.value,
  });
  if (resp.code != 0) {
    Message.error(resp.message);
  } else {
    Message.success("评论成功");
    myComment.value = "";
    await loadData();
  }
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
#questionComment {
}

.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.action:hover {
  background: var(--color-fill-3);
}

#handleSubmitComment {

}
</style>