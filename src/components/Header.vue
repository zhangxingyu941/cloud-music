<template>
  <div class="header-box">
    <div class="header">
      <img src="../assets/img/logo.webp" alt="logo" />
      <div class="header-right">
        <div class="header-right-search">
          <input type="text" placeholder="请输入歌名 歌手 歌词或专辑" />
          <button><i class="iconfont icon-sousuo"></i></button>
          <div class="search-results">
            <div class="cearch-type">
              <i class="iconfont icon-yinle"><span>单曲</span></i>
              <div>
                <p>111</p>
                <p>111</p>
                <p>111</p>
                <p>111</p>
              </div>
            </div>
            <div class="cearch-type">
              <i class="iconfont icon-geshou"><span>歌手</span></i>
              <div>
                <p>111</p>
                <p>111</p>
                <p>111</p>
                <p>111</p>
              </div>
            </div>
            <div class="cearch-type">
              <i class="iconfont icon-zhuanji"><span>专辑</span></i>
              <div>
                <p>111</p>
                <p>111</p>
                <p>111</p>
                <p>111</p>
              </div>
            </div>
            <div class="cearch-type">
              <i class="iconfont icon-gedan1"><span>歌单</span></i>
              <div>
                <p>111</p>
                <p>111</p>
                <p>111</p>
                <p>111</p>
              </div>
            </div>
          </div>
        </div>
        <i class="iconfont icon-huanfu"></i>
        <div class="huanfu" @click="handleHuanfu">
          <span :class="huanfu === 'default' && 'current'">默认</span>
          <span :class="huanfu === 'dark' && 'current'">暗色</span>
        </div>
        <div class="header-right-login" @click="login">
          <img src="../assets/img/logo.webp" alt="头像" />
          <span>未登录</span>
        </div>
        <a href="https://github.com/zhangxingyu941/cloud-music" target="_blank">
          <img src="../assets/img/githublogo.png" alt="github" title="点击跳转github" />
        </a>
      </div>
    </div>
  </div>
  <LoginDialog ref="loginRef" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import LoginDialog from "./loginDialog/LoginDialog.vue";

let loginRef = ref<any>(null);
function login() {
  loginRef.value.loginShow();
}
type huanfuType = "default" | "dark";
let huanfu = ref<huanfuType>("default");
function handleHuanfu(e: any) {
  if (e.target.innerText === "暗色") {
    huanfu.value = "dark";
    if (document.getElementById("dark")) return;
    const d = document.createElement("style");
    d.setAttribute("type", "text/css");
    d.setAttribute("id", "dark");
    d.innerHTML = "html { filter: invert(1) } img {filter: invert(1)}";
    document.getElementsByTagName("head")[0].appendChild(d);
  } else {
    huanfu.value = "default";
    if (!document.getElementById("dark")) return;
    const styles = document.getElementsByTagName("style");
    styles[styles.length - 1].remove();
  }
}
</script>

<style scoped lang="less">
.header-box {
  width: 100%;
  background-color: hsl(0, 82%, 59%);
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
      .icon-huanfu {
        cursor: pointer;
      }
      .icon-huanfu:hover + .huanfu {
        display: block;
      }
      .huanfu:hover {
        display: block;
      }
      .huanfu {
        display: none;
        position: absolute;
        top: 50px;
        right: 160px;
        z-index: 1;
        background-color: #fff;
        padding: 10px 20px;
        border-radius: 8px;
        span {
          display: inline-block;
          padding: 2px 6px;
          cursor: pointer;
        }
        span:hover {
          background-color: rgb(255, 0, 0);
        }
        .current {
          background-color: rgb(255, 0, 0);
        }
      }
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

        .search-results {
          display: none;
          position: absolute;
          top: 60px;
          right: 250px;
          background-color: #fff;
          width: 250px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgb(124, 124, 124);
          box-sizing: border-box;
          padding: 10px;
          max-height: 50vh;
          overflow-y: scroll;
          .cearch-type {
            display: flex;
            border-bottom: 1px solid #999;
            i {
              width: 25%;
              text-align: center;
              display: flex;
              justify-content: center;
              span {
                font-size: 12px;
                margin-left: 2px;
                color: #999;
              }
            }
            div {
              width: 75%;
              border-left: 1px solid #999;
              p {
                padding: 10px 0;
                box-sizing: border-box;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                cursor: pointer;
              }
              p:hover {
                background-color: #eee;
              }
            }
          }
          .cearch-type:last-child {
            border-bottom: none;
          }
        }

        input:focus ~ .search-results {
          display: block;
        }
      }
      .header-right-login {
        display: flex;
        align-items: center;
        margin: 0 20px;
        cursor: pointer;

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
      a {
        img {
          width: 40px;
          height: 40px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
