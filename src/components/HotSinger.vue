<template>
  <div class="hot-singer">
    <h2>热门歌手</h2>
    <div class="singer-list">
      <div class="singer-img" v-for="i in [1, 2, 3, 4, 5, 5]">
        <img src="../assets/img/logo.webp" alt="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts"></script>
<style lang="less">
.hot-singer {
  width: 35%;
  background-color: #fff;
  border-radius: 20px;
  padding: 0 20px;
  box-sizing: border-box;
  .singer-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .singer-img {
      width: 26%;
      cursor: pointer;
      margin-bottom: 20px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
