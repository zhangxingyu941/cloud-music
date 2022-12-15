<template>
  <div class="music-details" :style="{ top: isShow ? 0 + 'vh' : 100 + 'vh' }">
    <i class="iconfont icon-shanglajiantou" @click="handleMusicDetails"></i>
    <div class="music-left">
      <img src="../../assets/img/changpian.png" alt="唱片" />
      <img src="../../assets/img/shouyin.png" alt="收音" />
    </div>
    <div class="music-right">
      <div class="music-name">
        <h2>歌曲名称</h2>
        <div>
          <span>歌手:某某莫</span>
          <span>专辑:某某莫</span>
        </div>
      </div>
      <div class="music-lyrics">
        <c-scrollbar trigger="hover">
          <div>
            <p>111</p>
            <p>222</p>
            <p>111</p>
            <p>222</p>
            <p>111</p>
            <p>222</p>
            <p class="current">111</p>
            <p>222</p>
            <p>222</p>
            <p>111</p>
            <p>222</p>
            <p>111</p>
            <p>222</p>
            <p>111</p>
            <p>222</p>
            <p>222</p>
            <p>111</p>
            <p>222</p>
            <p>111</p>
            <p>222</p>
            <p>111</p>
            <p>222</p>
          </div>
        </c-scrollbar>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["MusicShow"]);

const { isShow } = toRefs<any>(props);

function handleMusicDetails() {
  emit("MusicShow");
}
</script>
<style lang="less">
.music-details {
  position: fixed;
  left: 0px;
  width: 100vw;
  height: calc(100vh - 70px);
  background-image: linear-gradient(#d0d0d0, #ffffff);
  padding: 20px 20px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in-out;
  > i {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 30px;
    color: #999;
    cursor: pointer;
  }
  .music-left {
    width: 500px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img:first-child {
      width: 350px;
    }
    img:last-child {
      width: 180px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: rotate(0deg);
      transform-origin: left top;
    }
  }
  .music-right {
    width: 500px;
    height: 100%;
    .music-name {
      margin-bottom: 20px;
      height: 10%;
      h2 {
        text-align: center;
        margin: 10px 0;
      }
      div {
        display: flex;
        justify-content: center;
        span {
          font-size: 14px;
          color: #999;
        }
        span:first-child {
          margin-right: 20px;
        }
      }
    }
    .music-lyrics {
      height: 80%;
      position: relative;
      overflow: hidden;
      > div {
        position: absolute;
        width: 100%;
        p {
          width: 100%;
          text-align: center;
          padding: 4px 0;
          color: #000;
        }
        .current {
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
