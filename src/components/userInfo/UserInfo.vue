<template>
  <div id="userInfo">
    <div id="avatar">
    <a-avatar :size="144" shape="square">
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      />
    </a-avatar>
    <a-divider size="0" />
    <a-button :type="'primary'" style="margin-left: 32px; width: 80px">更改头像</a-button>
    </div>
    <div id="desc">
    <a-descriptions :size="'large'" :column="1">
      <a-descriptions-item label="uid">
        1234567890
      </a-descriptions-item>
      <a-descriptions-item label="用户名">
        java大王
      </a-descriptions-item>
      <a-descriptions-item label="邮箱">
        javaking@gmail.com
      </a-descriptions-item>
    </a-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
#userInfo {
  height: 300px;
  margin: 30px;
}

#avatar {
  float: left;
}

#desc {
  width: 400px;
  margin-left: 200px;
}
</style>
