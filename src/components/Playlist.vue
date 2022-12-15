<template>
  <div class="playlist-box" v-if="isShowPlaylist">
    <div class="playlist-top">
      <h2>当前播放</h2>
      <div class="playlist-info">
        <span>总22首</span>
        <span>清空列表</span>
      </div>
    </div>
    <c-scrollbar height="calc(100vh - 160px)" trigger="hover">
      <div class="playlist-bottom">
        <div class="playlist-song current">
          <span>歌曲名称</span>
          <span>歌手</span>
          <span>00:00</span>
        </div>
      </div>
    </c-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
const props = defineProps({
  isShowPlaylist: Boolean,
});
const { isShowPlaylist } = toRefs(props);
</script>

<style lang="less">
.playlist-box {
  position: absolute;
  background-color: #fff;
  bottom: 70px;
  right: 0;
  width: 400px;
  height: calc(100vh - 140px);
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.371);
  padding: 0 20px;
  box-sizing: border-box;
  .playlist-top {
    .playlist-info {
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      span:first-child {
        color: #999;
        font-size: 14px;
      }
      span:last-child {
        color: #507daf;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
  .playlist-bottom {
    .current {
      span:first-child,
      span:nth-child(2) {
        color: #ec4141;
      }
    }
    .playlist-song {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      span {
        color: #999;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
      }
      span:first-child {
        width: 60%;
      }
      span:nth-child(2) {
        width: 20%;
      }
      span:last-child {
        width: 10%;
      }
    }
    .playlist-song:hover {
      background-color: #eee;
    }
  }
}
</style>
