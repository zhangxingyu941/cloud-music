<template lang="">
  <div class="footer">
    <div class="footer-left">
      <img src="../assets/img/logo.webp" alt="歌曲封面" />
      <div class="footer-song">
        <div>
          <span>歌曲名称<span>歌曲其他信息......</span></span>
          <i class="iconfont icon-aixin"></i>
        </div>
        <p>歌手</p>
      </div>
    </div>
    <div class="footer-center">
      <div class="footer-operation">
        <i class="iconfont icon-24gl-shuffle"></i>
        <i class="iconfont icon-shangyishou"></i>
        <i class="iconfont icon-24gf-play icon-back"></i>
        <i class="iconfont icon-xiayishou"></i>
        <span>词</span>
      </div>
      <div class="progress-bar">
        <span>00:00</span>
        <p>
          <span></span>
        </p>
        <span>00:00</span>
      </div>
    </div>
    <div class="footer-right">
      <i class="iconfont icon-shengyin"></i>
      <div class="footer-voice">
        <div ref="voiceProgress">
          <span
            :style="{ bottom: bottom + 'px' }"
            @mousedown="handleVoiceRegulatorMousedown"
            class="voice-regulator"
          ></span>
          <span :style="{ height: bottom + 'px' }"></span>
        </div>
      </div>
      <i class="iconfont icon-24gf-playlist"></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const voiceProgress = ref<any>(null);
let bottom = ref<number>(0);
let isMove = false;
let yVal = 0;
function handleVoiceRegulatorMousedown(e: any) {
  isMove = true;
  yVal = e.clientY;
}
function handleVoiceRegulatorMousemove(e: any) {
  if (!isMove) return;
  e.preventDefault();
  bottom.value += yVal - e.clientY;
  bottom.value = bottom.value >= 65 ? 65 : bottom.value;
  bottom.value = bottom.value <= 0 ? 0 : bottom.value;
  yVal = e.clientY;
}
function handleVoiceRegulatorMouseup() {
  isMove = false;
}
document.onmousemove = handleVoiceRegulatorMousemove;
document.onmouseup = handleVoiceRegulatorMouseup;
</script>

<style lang="less" scoped>
.footer {
  height: 70px;
  display: flex;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30px;
  .footer-left,
  .footer-center,
  .footer-right {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .footer-left {
    img {
      width: 60px;
      height: 60px;
      margin-right: 10px;
      cursor: pointer;
    }
    .footer-song {
      font-size: 14px;
      > div {
        display: flex;
        i {
          cursor: pointer;
        }
        > span {
          cursor: pointer;
          display: inline-block;
          white-space: nowrap;
          width: 150px;
          overflow: hidden;
          > span {
            color: #b7b7b7;
            margin-left: 3px;
          }
        }
        p {
          cursor: pointer;
        }
      }
    }
  }

  .footer-center {
    justify-content: center;
    flex-direction: column;
    .footer-operation {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 12px;
      }
      span:hover {
        cursor: pointer;
        color: #f06767;
      }
      .icon-back {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
        background-color: #f5f5f5;
      }
      i:hover {
        cursor: pointer;
        color: #f06767;
      }
    }
    .progress-bar {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        margin: 0 5px;
        display: inline-block;
        width: 300px;
        height: 3px;
        box-sizing: border-box;
        background-color: #cecece;
        position: relative;
        border-radius: 2px;
        width: 90%;
        span {
          border-radius: 2px;
          position: absolute;
          display: inline-block;
          width: 100px;
          height: 3px;
          background-color: red;
        }
      }
      > span {
        font-size: 12px;
      }
    }
  }
  .footer-right {
    justify-content: right;
    position: relative;
    .footer-voice {
      position: absolute;
      top: -75px;
      right: 35px;
      background-color: #fff;
      height: 90px;
      width: 30px;
      box-shadow: 0px 8px 30px #ccc;
      display: none;
      justify-content: center;
      align-items: center;
      div {
        height: 70px;
        width: 4px;
        background-color: #cecece;
        position: relative;
        border-radius: 2px;
        .voice-regulator {
          display: block;
          width: 10px;
          height: 10px;
          background-color: #f06767;
          border-radius: 50%;
          position: absolute;
          bottom: 0;
          left: -3px;
        }
        span {
          border-radius: 2px;
          position: absolute;
          bottom: 0;
          display: block;
          width: 4px;
          height: 0px;
          background-color: #f06767;
        }
      }
    }
    .icon-shengyin:hover ~ .footer-voice,
    .footer-voice:hover {
      display: flex;
    }
    .footer-voice::after {
      content: "";
      display: block;
      width: 0px;
      height: 0px;
      border-top: 8px solid rgb(255, 255, 255);
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      position: absolute;
      top: 90px;
      left: 7px;
    }
    i {
      margin-left: 20px;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>
