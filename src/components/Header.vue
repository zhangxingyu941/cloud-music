<template>
  <div class="header-box">
    <div class="header">
      <img src="../assets/img/logo.webp" alt="logo" />
      <div class="header-right">
        <div class="header-right-search">
          <input
            type="text"
            v-model="searchText"
            @focus="handleSearchFocus"
            @input="inputSearch"
            :placeholder="searchKeyWords"
          />
          <button><i class="iconfont icon-sousuo"></i></button>
          <div class="search-results">
            <c-scrollbar maxHeight="50vh" trigger="hover">
              <div class="cearch-type" v-if="searchText && searchList.singleList?.length">
                <i class="iconfont icon-yinle"><span>单曲</span></i>
                <div @click="handleSearchClick(1, $event)">
                  <p v-for="item in searchList.singleList" :key="item.id">{{ item.name }}</p>
                </div>
              </div>
              <div class="cearch-type" v-if="searchText && searchList.singerList?.length">
                <i class="iconfont icon-geshou"><span>歌手</span></i>
                <div @click="handleSearchClick(100, $event)">
                  <p v-for="item in searchList.singerList" :key="item.id">{{ item.name }}</p>
                </div>
              </div>
              <div class="cearch-type" v-if="searchText && searchList.albumList?.length">
                <i class="iconfont icon-zhuanji"><span>专辑</span></i>
                <div @click="handleSearchClick(10, $event)">
                  <p v-for="item in searchList.albumList" :key="item.id">{{ item.name }}</p>
                </div>
              </div>
              <div class="cearch-type" v-if="searchText && searchList.playlistList?.length">
                <i class="iconfont icon-gedan1"><span>歌单</span></i>
                <div @click="handleSearchClick(1000, $event)">
                  <p v-for="item in searchList.playlistList" :key="item.id">{{ item.name }}</p>
                </div>
              </div>
              <div class="cearch-type" v-if="!searchText && searchList.hotSearchList?.length">
                <i class="iconfont icon-resou"><span>热搜</span></i>
                <div>
                  <p v-for="item in searchList.hotSearchList" :key="item.iconUrl">{{ item.searchWord }}</p>
                </div>
              </div>
            </c-scrollbar>
          </div>
        </div>
        <i class="iconfont icon-huanfu"></i>
        <div class="huanfu" @click="handleHuanfu">
          <span :class="huanfu === 'default' && 'current'">默认</span>
          <span :class="huanfu === 'dark' && 'current'">暗色</span>
        </div>
        <div class="header-right-login" @click="login">
          <img v-if="user.avatarUrl" :src="user.avatarUrl" alt="头像" />
          <img v-else src="../assets/img/logo.webp" alt="头像" />
          <span>{{ user.name || "未登录" }}</span>
        </div>
        <div v-if="user.avatarUrl" class="logout" @click="logout">退出登录</div>
        <a href="https://github.com/zhangxingyu941/cloud-music" target="_blank">
          <img src="../assets/img/githublogo.png" alt="github" title="点击跳转github" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { storeToRefs } from "pinia";
import { getSearchKeyWords, getHotSearch, getSearchsuggest, search } from "../api/header";
import { logout as apiLogout } from "../api/login";
import { debounce } from "../utils/tools";
import { userInfo } from "../store/user";

const users = userInfo();
const { user } = storeToRefs(users);
const { appContext } = getCurrentInstance()!;

function login() {
  if (user.value.avatarUrl) return;
  users.isLoginShow = !users.isLoginShow;
}

function logout() {
  apiLogout().then(() => {
    users.$reset();
    localStorage.removeItem("cookie");
    appContext.config.globalProperties.$notify({
      type: "success",
      title: "已退出登录",
      showClose: false,
    });
  });
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

interface searchListType {
  singleList: Array<any>;
  playlistList: Array<any>;
  hotSearchList: Array<any>;
  albumList: Array<any>;
  singerList: Array<any>;
}

let searchList = reactive<searchListType>({
  singleList: [],
  playlistList: [],
  hotSearchList: [],
  albumList: [],
  singerList: [],
});
let searchText = ref<string>("");
let searchKeyWords = ref<string>("");
onMounted(() => {
  getSearchKeyWords().then((res: any) => {
    const { data } = res;
    searchKeyWords.value = data.showKeyword;
  });
});
function handleSearchFocus() {
  if (searchList.hotSearchList.length) return;
  getHotSearch().then((res) => {
    searchList.hotSearchList = res.data;
  });
}
function handleSearcInput() {
  getSearchsuggest(searchText.value).then((res) => {
    const { result } = res;
    searchList.albumList = result?.albums || [];
    searchList.playlistList = result?.playlists || [];
    searchList.singerList = result?.artists || [];
    searchList.singleList = result?.songs || [];
  });
}
const inputSearch = debounce(handleSearcInput, 200);
async function handleSearchClick(type: number, e: any) {
  console.log(type, e.target.innerText);
  searchText.value = e.target.innerText;
  let res: any;
  switch (type) {
    case 1: // 单曲
      res = await search(searchText.value);
      break;
    case 10: // 专辑
      res = await search(searchText.value, 10);
      break;
    case 100: // 歌手
      res = await search(searchText.value, 100);
      break;
    case 1000: // 歌单
      res = await search(searchText.value, 1000);
      break;
    default: // 热搜
      res = await search(searchText.value, 1000);
      break;
  }
  console.log(res);
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
          font-size: 14px;
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
        .search-results:hover {
          display: block;
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
          padding: 0 6px;
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
            .icon-resou {
              color: red;
              span {
                color: red;
              }
            }
            div {
              width: 75%;
              border-left: 1px solid #999;
              p {
                padding: 10px 6px;
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
      .header-right-login:hover ~ .logout {
        display: block;
      }
      .logout {
        display: none;
        position: absolute;
        background-color: #fff;
        top: 55px;
        padding: 6px 8px;
        right: 110px;
        border-radius: 3px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.446);
        cursor: pointer;
      }
      .logout:hover {
        background-color: #eee;
        display: block;
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
