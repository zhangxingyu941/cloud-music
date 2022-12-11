<template>
  <div class="song-list">
    <h2>飙升榜</h2>
    <div class="song">
      <img src="../assets/img/logo.webp" alt="" />
      <div class="song-text">
        <p>歌曲名称</p>
        <p>作者</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts"></script>
<style lang="less" scoped>
.song-list {
  width: 24%;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 20px;
  padding: 1px 20px 30px;
  margin-bottom: 20px;
  .song {
    display: flex;

    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    p:last-child{
      font-size: 14px;
      color: #808080;
    }
  }
}
</style>
