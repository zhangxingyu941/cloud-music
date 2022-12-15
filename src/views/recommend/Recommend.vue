<template>
  <div class="recommend-box">
    <Swiper></Swiper>
    <Playlist-card />
    <New-disc />
    <div class="song-list">
      <Song-list v-for="(item, index) in [1, 2, 3, 4]" :key="index" />
    </div>
    <New-mv />
    <div class="hot-list">
      <Hot-radio />
      <Hot-singer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swiper from "components/common/Swiper.vue";
import PlaylistCard from "components/common/PlaylistCard.vue";
import NewDisc from "components/NewDisc.vue";
import SongList from "components/SongList.vue";
import NewMv from "components/NewMv.vue";
import HotRadio from "components/HotRadio.vue";
import HotSinger from "components/HotSinger.vue";
</script>

<style lang="less" scoped>
.recommend-box {
  width: 80%;
  > .song-list {
    display: flex;
    justify-content: space-between;
  }
  .hot-list {
    display: flex;
    justify-content: space-between;
  }
}
</style>
