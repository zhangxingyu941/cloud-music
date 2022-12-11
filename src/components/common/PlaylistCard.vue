<template>
  <div class="palylist-card">
    <h2 class="card-title">热门推荐</h2>
    <div class="card-content">
      <div class="card-palylist" v-for="i in [1, 2, 3, 4, 5, 7]" :key="i">
        <div class="palylist-cover">
          <img src="../../assets/img/logo.webp" alt="歌单封面" />
          <span>介绍</span>
        </div>
        <p>歌单介绍</p>
        <div>
          <span>#标签1</span>
          <span>#标签2</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style lang="less" scoped>
.palylist-card {
  background-color: #fff;
  padding: 0 20px;
  border-radius: 20px;
  margin: 20px 0;
  .card-title {
    padding-top: 20px;
  }
  .card-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .card-palylist {
      display: inline-block;
      width: 18%;
      margin-bottom: 20px;
      .palylist-cover {
        position: relative;
        img {
          width: 100%;
          border-radius: 10px;
        }
        span {
          position: absolute;
          top: 0px;
          right: -4px;
          padding: 2px 10px 0;
          font-size: 12px;
          color: #fff;
          display: inline-block;
          border-radius: 0 10px 0 0;
          background-image: linear-gradient(to right, transparent, rgba(24, 22, 22, 0.692));
        }
      }
      p {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      div {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        span {
          color: #de6e57;
          margin-right: 4px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
