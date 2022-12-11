<template>
  <div class="sidebar-box">
    <ul @click="handleClick">
      <Router-link v-for="item in list" :to="item.router" :key="item.class">
        <li :class="text === item.name && 'selected'">
          <i class="iconfont" :class="item.class"></i>{{ item.name }}
        </li></Router-link
      >
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import { RouterLink } from "vue-router";

const list = [
  {
    class: "icon-icon-",
    name: "个性推荐",
    router: "/",
  },
  {
    class: "icon-gedan",
    name: "歌单",
    router: "/playlist",
  },
  {
    class: "icon-paixingbang",
    name: "排行榜",
    router: "/ranking",
  },
  {
    class: "icon-geshou",
    name: "歌手",
    router: "/singer",
  },
  {
    class: "icon-MV",
    name: "MV",
    router: "/mv",
  },
  {
    class: "icon-wode",
    name: "我的音乐",
    router: "/my",
  },
];

let text: Ref<string> = ref("个性推荐");
function handleClick(e: any) {
  text.value = e.target.innerText;
}
</script>

<style lang="less" scoped>
.sidebar-box {
  float: left;
  width: 200px !important;
  ul {
    width: 100%;
    padding: 0;
    list-style: none;
    .selected {
      border-left: 2px solid #ec4141;
    }
    li:hover {
      background-color: #eee;
    }
    li {
      box-sizing: border-box;
      padding-left: 10px;
      height: 46px;
      width: 100%;
      line-height: 46px;
      cursor: pointer;
      // transition: 0.2s ease-in;
      i {
        margin-right: 10px;
      }
    }
  }
}
</style>
