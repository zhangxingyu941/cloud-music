<template>
  <div id="header">
    <Header />
  </div>
  <div class="main">
    <div>
      <Sidebar />
    </div>
    <div>
      <Router-view />
    </div>
  </div>
  <div id="footer">
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import Header from "components/Header.vue";
import Sidebar from "components/Sidebar.vue";
import Footer from "components/Footer.vue";
</script>

<style scoped lang="less">
#header {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
}
.main {
  width: 100%;
  margin: auto;
  padding-left: 30px;
  height: calc(100vh - 140px);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;

  > div:first-child {
    width: 200px;
    border-right: 1px solid #e0e0e0;
  }

  > div:last-child {
    box-sizing: border-box;
    padding: 20px 0 0;
    width: calc(100% - 200px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

#footer {
  position: sticky;
  bottom: 0;
  z-index: 100;
  width: 100%;
}
</style>
