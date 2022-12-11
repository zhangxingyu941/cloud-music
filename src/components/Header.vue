<template>
  <div class="header-box">
    <div class="header">
      <img src="../assets/img/logo.webp" alt="logo" />
      <div class="header-right">
        <div class="header-right-search">
          <input type="text" placeholder="请输入歌名 歌手 歌词或专辑" />
          <button><i class="iconfont icon-sousuo"></i></button>
        </div>
        <i class="iconfont icon-huanfu"></i>
        <div class="header-right-login">
          <img src="../assets/img/logo.webp" alt="头像" />
          <span>未登录</span>
        </div>
        <img src="../assets/img/githublogo.png" alt="github" title="点击跳转github" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.header-box {
  width: 100%;
  background-color: #ec4141;
  padding: 0 30px;
  box-sizing: border-box;
  .header {
    margin: auto;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 80px;
    }

    .header-right {
      display: flex;
      align-items: center;
      .header-right-search {
        display: flex;
        align-items: center;

        input {
          background: #fff;
          outline: none;
          border: none;
          height: 30px;
          width: 200px;
          font-size: 16px;
          padding: 0 0 0 4px;
        }

        input::placeholder {
          font-size: 14px;
        }

        button {
          height: 30px;
          width: 30px;
          border: none;
          background-color: #fff;
          cursor: pointer;
          transition: 0.2s ease-in;
        }

        button:hover {
          background-color: #eee;
        }
      }
      .header-right-login {
        display: flex;
        align-items: center;
        margin: 0 20px;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        span {
          margin-left: 10px;
          color: #fff;
          letter-spacing: 2px;
        }
      }
      > i {
        color: #fff;
        font-size: 30px;
        margin-left: 20px;
      }
      > img {
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
