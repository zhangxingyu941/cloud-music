<template>
  <div class="swiper-box">
    <div ref="view">
      <img class="current" src="../../assets/img/logo.webp" alt="" />
      <img src="../../assets/img/logo.webp" alt="" />
      <img src="../../assets/img/logo.webp" alt="" />
      <img src="../../assets/img/logo.webp" alt="" />
      <img src="../../assets/img/logo.webp" alt="" />
      <img src="../../assets/img/logo.webp" alt="" />
      <img src="../../assets/img/logo.webp" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref, onUnmounted } from "vue";
const view: Ref<any> = ref(null);
function animation() {
  const current = view.value.querySelector(".current") || view.value.firstElementChild;
  current?.classList.remove("current");
  if (current?.nextElementSibling) {
    current.nextElementSibling.classList.add("current");
  } else {
    view.value.firstElementChild?.classList.add("current");
  }
}

function click(ev: any) {
  if (!ev.target.closest("img")) return;
  const current = view.value.querySelector(".current") || view.value.firstElementChild;
  current.classList.remove("current");
  ev.target.closest("img").classList.add("current");
}

onMounted(() => {
  view.value.addEventListener("animationiteration", animation);

  view.value.addEventListener("click", click);
});

onUnmounted(() => {
  removeEventListener("animationiteration", animation);
  removeEventListener("click", click);
});
</script>

<style lang="less" scoped>
.swiper-box {
  display: flex;
  overflow: hidden;
  height: 300px;
  @keyframes scroll {
    to {
      transform: translateZ(0.1px);
    }
  }
  > div:hover {
    animation-play-state: paused;
  }
  > div {
    cursor: pointer;
    width: 100%;
    position: relative;
    transform-style: preserve-3d;
    perspective: 500px;
    display: flex;
    justify-content: center;
    animation: scroll 3s infinite;
    img {
      width: 50%;
      position: absolute;
      display: grid;
      place-content: center;
      transform: translate3d(0, 0, -100px);
      border-radius: 20px;
    }
    .current {
      transform: translate3d(0, 0, 0);
    }
    .current + img {
      transform: translate3d(30%, 0, -100px);
    }
    img:has(+ .current) {
      transform: translate3d(-30%, 0, -100px);
    }
    img.current:first-child ~ img:last-child {
      transform: translate3d(-30%, 0, -100px);
      opacity: 1;
    }
    img:first-child:has(~ img.current:last-child) {
      transform: translate3d(30%, 0, -100px);
      opacity: 1;
    }
  }
}
</style>
