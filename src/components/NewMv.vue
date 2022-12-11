<template>
  <div class="new-mv">
    <div class="mv-name">
      <h2 class="mv-title">最新MV</h2>
      <div class="mv-type">
        <p>
          <span>全部</span>
          <span class="mv-selected"></span>
        </p>
        <p>
          <span>内地</span>
          <span></span>
        </p>
        <p>
          <span>港台</span>
          <span></span>
        </p>
        <p>
          <span>欧美</span>
          <span></span>
        </p>
        <p>
          <span>日本</span>
          <span></span>
        </p>
        <p>
          <span>韩国</span>
          <span></span>
        </p>
      </div>
    </div>
    <div class="mv-list">
      <div class="mv" v-for="i in [1, 2, 3, 4, 6]">
        <div class="mv-img">
          <img src="../assets/img/logo.webp" alt="" />
          <span>190万</span>
        </div>
        <p>歌曲名称</p>
        <p>歌手</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style lang="less">
.new-mv {
  margin: 20px 0;
  background-color: #fff;
  padding: 0 20px;
  border-radius: 20px;
  margin: 20px 0;
  .mv-name {
    display: flex;
    .mv-title {
      margin-right: 30px;
    }
    .mv-type {
      display: flex;
      align-items: flex-end;
      margin: 0 30px 16px;
      p {
        font-weight: 600;
        width: 60px;
        display: flex;
        height: 40px;
        flex-direction: column;
        align-items: center;
        position: relative;
        cursor: pointer;
        span:first-child {
          text-align: center;
          position: absolute;
          bottom: 0;
          z-index: 2;
        }
        .mv-selected:last-child {
          position: absolute;
          z-index: 1;
          bottom: 2px;
          width: 100%;
          border: 3px solid red;
        }
      }
    }
  }
  .mv-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .mv {
      width: 24%;
      margin-bottom: 30px;
      .mv-img {
        width: 100%;
        position: relative;
        img {
          width: 100%;
          border-radius: 10px;
        }
        span {
          position: absolute;
          border-radius: 0 10px 0 0;
          right: 0;
          color: #fff;
          font-size: 12px;
          padding: 2px 10px;
          background-image: linear-gradient(to right, transparent, rgba(24, 22, 22, 0.692));
        }
      }
      p:last-child {
        font-size: 14px;
        color: #828282;
      }
    }
  }
}
</style>
