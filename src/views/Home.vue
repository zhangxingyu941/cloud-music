<template>
  <div id="header">
    <Header />
  </div>
  <div class="main">
    <div class="main-left">
      <Sidebar />
    </div>
    <c-scrollbar>
      <div class="main-right">
        <Router-view />
      </div>
    </c-scrollbar>
  </div>
  <div id="footer">
    <Footer />
  </div>
  <Login-dialog v-if="isLoginShow" />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { storeToRefs } from "pinia";
import Header from "components/Header.vue";
import Sidebar from "components/Sidebar.vue";
import Footer from "components/Footer.vue";
import LoginDialog from "components/loginDialog/LoginDialog.vue";
import { userInfo } from "../store/user";
import { getAccountInfo, anonimousLogin } from "../api/login";

const users = userInfo();
const { isLoginShow, user } = storeToRefs(users);

onMounted(async () => {
  const { profile } = await getAccountInfo();
  if (profile) return;
  anonimousLogin().then((res) => {
    localStorage.setItem("cookie", res.cookie);
  });
});
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
}
.main-left {
  width: 200px;
  border-right: 1px solid #e0e0e0;
}
.main-right {
  box-sizing: border-box;
  padding: 20px 0 0;
  width: calc(100vw - 232px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

#footer {
  position: sticky;
  bottom: 0;
  z-index: 100;
  width: 100%;
}
</style>
