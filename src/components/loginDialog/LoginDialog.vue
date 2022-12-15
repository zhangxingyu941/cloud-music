<template>
  <div class="login-dialog" v-loading="!codeImgBase">
    <i class="iconfont icon-fork" @click="loginShow"></i>
    <div class="code-box" v-if="loginType === 'phone'" @click="handleScanLogin">
      <img src="../../assets/img/code.gif" alt="二维码" title="扫码登录更安全" />
      <div></div>
    </div>
    <span v-else-if="loginType === 'reg'" @click="handlePhoneLogin">&lt; 返回登录</span>
    <div class="login-scan-code" v-if="loginType === 'scan'">
      <h2>扫码登录</h2>
      <img v-if="codeImgBase" :src="codeImgBase" alt="二维码" />
      <p @click="handlePhoneLogin">手机号登录 ></p>
    </div>
    <div class="login-phone" v-else-if="loginType === 'phone'">
      <img src="../../assets/img/logo.webp" alt="logo" />
      <div>
        <i class="iconfont icon-shouji"></i>
        <input type="tel" placeholder="请输入手机号" v-model="phone" @focus="handleFocus" />
      </div>
      <div class="security" v-if="Security">
        <i class="iconfont icon-yanzhengma"></i>
        <input type="text" placeholder="请输入验证码" v-model="verifyCode" />
        <span @click="handleGetVerifyCode">{{ time === 30 ? "获取验证码" : time + "秒后重发" }}</span>
      </div>
      <div v-else>
        <i class="iconfont icon-mima"></i>
        <input type="password" placeholder="请输入密码" v-model="password" />
      </div>
      <span>{{ errorMessage }}</span>
      <div>
        <span class="forget-pass" @click="handleForgetPass">忘记密码</span>
        <span @click="handleSecurityLogin">{{ Security ? "密码登录" : "验证码登录" }}</span>
      </div>
      <button type="submit" @click="handleSubmit">登录</button>
      <p @click="handleReg">注册</p>
    </div>
    <div class="login-register" v-else>
      <img src="../../assets/img/logo.webp" alt="logo" />
      <div>
        <i class="iconfont icon-shouji"></i>
        <input type="text" placeholder="请输入手机号" />
      </div>
      <div>
        <i class="iconfont icon-mima"></i>
        <input type="password" placeholder="请输入密码" />
      </div>
      <p>密码8-20位，至少包含字符/数字/字符2种组合</p>
      <button type="submit">{{ reg ? "下一步" : "注册" }}</button>
    </div>
    <Slide-verify
      v-if="slideVerifyShow"
      ref="slideVerify"
      slider-text="向右滑"
      :accuracy="-1"
      @success="onSuccess"
      @refresh="onRefresh"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
import {
  getCodeKey,
  generatingCode,
  checkCodeState,
  getAccountInfo,
  loginForCellphone,
  getVerifyCode,
} from "../../api/login";
import { userInfo } from "../../store/user";
import md5 from "md5";
import SlideVerify, { SlideVerifyInstance } from "vue3-slide-verify";
import "vue3-slide-verify/dist/style.css";

const { $notify } = getCurrentInstance()!.appContext.config.globalProperties;
let codeImgBase = ref<string>("");
const users = userInfo();
let key: string = "";
let timer: any = null;
// 800 二维码过期 | 801 等待扫码 | 802 待确认 | 803 授权登录成功(803 状态码下会返回 cookies)
// type codeStateType = 800 | 801 | 802 | 803;
// let codeState = ref<codeStateType>(800);
function getCodeImg() {
  getCodeKey()
    .then((k) => {
      key = k.data.unikey;
      return generatingCode(k.data.unikey);
    })
    .then((res) => {
      codeImgBase.value = res.data.qrimg;
    });
}

function polling() {
  timer = setInterval(() => {
    checkCodeState(key).then((res) => {
      if (res.code === 800) {
        getCodeImg();
      } else if (res.code === 803) {
        $notify({
          type: "success",
          title: "登陆成功",
          showClose: false,
        });
        localStorage.setItem("cookie", res.cookie);
        getAccountInfo().then((info) => {
          const { profile } = info;
          users.user.name = profile.nickname;
          users.user.avatarUrl = profile.avatarUrl;
        });
        users.isLoginShow = false;
      }
    });
  }, 3000);
}

onMounted(() => {
  getCodeImg();
  polling();
});

onUnmounted(() => {
  clearInterval(timer);
});

function loginShow() {
  users.isLoginShow = !users.isLoginShow;
}

type loginTypes = "scan" | "phone" | "reg";

let loginType = ref<loginTypes>("scan");
let reg = ref<boolean>(false);
let Security = ref<boolean>(false);

function handlePhoneLogin() {
  loginType.value = "phone";
  clearInterval(timer);
  reg.value = false;
}

function handleScanLogin() {
  getCodeImg();
  polling();
  loginType.value = "scan";
}

function handleReg() {
  loginType.value = "reg";
}

function handleForgetPass() {
  reg.value = true;
  loginType.value = "reg";
}

function handleSecurityLogin() {
  Security.value = !Security.value;
}

let phone = ref<string>("");
let verifyCode = ref<string>("");
let password = ref<string>("");
let errorMessage = ref<string>("");
let getVerigyCode = ref<boolean>(false);
const slideVerify = ref<SlideVerifyInstance>();
let slideVerifyShow = ref<boolean>(false);
let time = ref<number>(30);

function handleFocus() {
  errorMessage.value = "";
}

function verifyPhone() {
  const test =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
  if (!test.test(phone.value)) {
    errorMessage.value = "手机号不正确！！！";
    return false;
  }
  return true;
}

function onSuccess() {
  setTimeout(() => {
    slideVerifyShow.value = false;
  }, 1500);
  getVerifyCode(phone.value).then((res) => {
    if (res.data) {
      $notify({
        type: "success",
        title: "验证码发送成功",
        showClose: false,
      });
      --time.value;
      const i = setInterval(() => {
        --time.value;
        if (time.value <= 0) {
          clearInterval(i);
          time.value = 30;
        }
      }, 1000);
    } else {
      $notify({
        type: "error",
        title: "验证码发送失败",
        showClose: false,
      });
    }
  });
}

function onRefresh() {
  slideVerify.value?.refresh();
}

function handleGetVerifyCode() {
  if (time.value !== 30) return;
  if (!verifyPhone()) return;
  slideVerifyShow.value = true;
}

function handleSubmit() {
  if (!verifyPhone()) return;
  let data = {};
  if (Security.value) {
    data = {
      phone: phone.value,
      md5_password: md5(password.value),
    };
  } else {
    data = {
      phone: phone.value,
      captcha: verifyCode.value,
    };
  }

  loginForCellphone(data).then((res) => {
    console.log(res);
    if (res.code === 502) {
      errorMessage.value = res.message;
    }
  });
  console.log(phone);
}
</script>

<style lang="less">
#slideVerify {
  position: fixed;
  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #000;
  background-color: #fff;
}
.login-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 350px;
  height: 500px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 0 10px #000;
  border-radius: 10px;
  padding: 6px;
  box-sizing: border-box;
  z-index: 999;
  > i {
    position: absolute;
    right: 6px;
    top: 6px;
    font-size: 20px;
    color: #a5a5a5;
    cursor: pointer;
  }
  > span {
    font-size: 12px;
    color: #999;
    cursor: pointer;
    position: absolute;
  }
  .code-box {
    width: 50px;
    height: 50px;
    overflow: hidden;
    position: absolute;
    img {
      width: 50px;
      height: 50px;
      cursor: pointer;
    }
    div {
      width: 100px;
      height: 100px;
      background-color: #fff;
      position: absolute;
      top: 20px;
      transform: rotate(45deg);
    }
  }
  .login-scan-code {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    img {
      width: 200px;
      height: 200px;
      margin: 50px 0;
    }
    p {
      font-size: 14px;
      color: #a5a5a5;
      cursor: pointer;
    }
  }
  .login-phone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    > span {
      color: red;
      font-size: 12px;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-bottom: 40px;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 74%;
      i {
        border: 1px solid #999999;
        height: 40px;
        display: inline-block;
        box-sizing: border-box;
        border-right: none;
        padding-left: 10px;
        line-height: 40px;
      }
      input::placeholder {
        font-size: 14px;
      }
      input {
        border: 1px solid #999999;
        border-left: none;
        height: 40px;
        outline: none;
        font-size: 18px;
        box-sizing: border-box;
      }
      input[type="password"],
      .icon-mima,
      .icon-yanzhengma {
        border-top: none;
      }
      span {
        font-size: 14px;
        color: #0c73c2;
        cursor: pointer;
      }
      .cheat {
        color: #999;
      }
    }
    .security {
      input {
        width: 150px;
        border-top: none;
        border-right: none;
      }
      span {
        border: 1px solid #999;
        display: inline-block;
        text-align: center;
        height: 40px;
        width: 80px;
        box-sizing: border-box;
        border-top: none;
        line-height: 40px;
        color: #999;
        font-size: 12px;
        padding: 0 4px;
        transition: 0.2s all;
      }
      span:hover {
        background-color: #eee;
      }
    }
    button {
      background-color: #ff3a3a;
      border: none;
      border-radius: 6px;
      width: 74%;
      height: 40px;
      font-size: 16px;
      letter-spacing: 6px;
      color: #fff;
      cursor: pointer;
    }
    p {
      margin-top: 10px;
      cursor: pointer;
    }
  }
  .login-register {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-bottom: 40px;
    }
    div {
      display: flex;
      align-items: center;
      i {
        border: 1px solid #999999;
        height: 40px;
        display: inline-block;
        box-sizing: border-box;
        border-right: none;
        padding-left: 10px;
        line-height: 40px;
      }
      input::placeholder {
        font-size: 14px;
      }
      input {
        border: 1px solid #999999;
        border-left: none;
        height: 40px;
        outline: none;
        font-size: 18px;
        padding: 0 6px;
        box-sizing: border-box;
      }
      input[type="password"],
      .icon-mima,
      .icon-yanzhengma {
        border-top: none;
      }
      span {
        font-size: 14px;
        color: #0c73c2;
        cursor: pointer;
      }
    }
    p {
      font-size: 12px;
      color: #999;
      margin-bottom: 20px;
    }
    button {
      background-color: #ff3a3a;
      border: none;
      border-radius: 6px;
      width: 80%;
      height: 40px;
      font-size: 16px;
      letter-spacing: 6px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
