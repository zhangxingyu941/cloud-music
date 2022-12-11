<template>
  <div class="new-disc">
    <div class="disc-name">
      <h2 class="disc-title">新碟上架</h2>
      <div class="disc-type">
        <p>
          <span>全部</span>
          <span class="disc-selected"></span>
        </p>
        <p>
          <span>华语</span>
          <span></span>
        </p>
        <p>
          <span>欧美</span>
          <span></span>
        </p>
        <p>
          <span>韩国</span>
          <span></span>
        </p>
        <p>
          <span>日本</span>
          <span></span>
        </p>
      </div>
    </div>
    <div class="disc-list">
      <div class="disc-card" v-for="i in [1, 2, 3, 4, 5]">
        <div class="disc-cover">
          <img src="../assets/img/logo.webp" alt="歌曲封面" />
        </div>
        <div class="disc-text">
          <p>歌曲</p>
          <p>歌手</p>
        </div>
        <p class="disc-label">new</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style lang="less">
.new-disc {
  margin: 20px 0;
  background-color: #fff;
  padding: 0 20px;
  border-radius: 20px;
  margin: 20px 0;
  .disc-name {
    display: flex;
    .disc-title {
      margin-right: 30px;
    }
    .disc-type {
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
        .disc-selected:last-child {
          position: absolute;
          z-index: 1;
          bottom: 2px;
          width: 100%;
          border: 3px solid red;
        }
      }
    }
  }
  .disc-list {
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .disc-card {
      width: 30%;
      height: 80px;
      margin-bottom: 30px;
      display: flex;
      background-color: #eeeeee;
      border-radius: 4px;
      position: relative;
      overflow: hidden;
      .disc-cover {
        margin-right: 10px;
        img:first-child {
          width: 100%;
          height: 100%;
          z-index: 1;
          border-radius: 4px;
        }
        img:last-child {
          width: 80px;
          height: 80px;
          left: 15px;
          z-index: 0;
        }
      }
      .disc-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        p {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        p:last-child {
          font-size: 12px;
          color: #979797;
        }
      }
    }
    .disc-label {
      background-color: #fd5d2e;
      height: 20px;
      line-height: 20px;
      width: 80px;
      text-align: center;
      color: #fff;
      transform: rotate(45deg);
      position: absolute;
      right: -25px;
      top: 6px;
    }
  }
}
</style>
