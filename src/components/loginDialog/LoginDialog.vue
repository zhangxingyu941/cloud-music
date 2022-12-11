<template>
  <div class="login-dialog" v-if="loginDialog">
    <i class="iconfont icon-fork" @click="loginShow"></i>
    <div class="code-box" v-if="loginType === 'phone'" @click="handleScanLogin">
      <img src="../../assets/img/code.gif" alt="二维码" title="扫码登录更安全" />
      <div></div>
    </div>
    <span v-else-if="loginType === 'reg'" @click="handlePhoneLogin">&lt; 返回登录</span>
    <div class="login-scan-code" v-if="loginType === 'scan'">
      <h2>扫码登录</h2>
      <img src="../../assets/img/code.gif" alt="二维码" />
      <p @click="handlePhoneLogin">手机号登录 ></p>
    </div>
    <div class="login-phone" v-else-if="loginType === 'phone'">
      <img src="../../assets/img/logo.webp" alt="logo" />
      <div>
        <i class="iconfont icon-shouji"></i>
        <input type="text" placeholder="请输入手机号" />
      </div>
      <div class="security" v-if="Security">
        <i class="iconfont icon-yanzhengma"></i>
        <input type="text" placeholder="请输入验证码" />
        <span>获取验证码</span>
      </div>
      <div v-else>
        <i class="iconfont icon-mima"></i>
        <input type="password" placeholder="请输入密码" />
      </div>
      <div>
        <input type="checkbox" />
        <span class="cheat">记住密码</span>
        <span class="forget-pass" @click="handleForgetPass">忘记密码</span>
        <span @click="handleSecurityLogin">{{ Security ? "密码登录" : "验证码登录" }}</span>
      </div>
      <button type="submit">登录</button>
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
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let loginDialog = ref<boolean>(false);
function loginShow() {
  loginDialog.value = !loginDialog.value;
  loginType.value = "scan";
}

type loginTypes = "scan" | "phone" | "reg";

let loginType = ref<loginTypes>("scan");
let reg = ref<boolean>(false);
let Security = ref<boolean>(false);
function handlePhoneLogin() {
  loginType.value = "phone";
  reg.value = false;
}
function handleScanLogin() {
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

defineExpose({
  loginShow,
});
</script>

<style lang="less">
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
      width: 150px;
      height: 150px;
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
      .cheat {
        color: #999;
      }
      .forget-pass {
        margin: 0 30px;
      }
    }
    .security {
      input {
        width: 162px;
        border-top: none;
        border-right: none;
      }
      span {
        border: 1px solid #999;
        display: inline-block;
        height: 40px;
        box-sizing: border-box;
        border-top: none;
        line-height: 40px;
        color: #999;
        font-size: 12px;
        padding: 0 4px;
      }
      span:hover {
        background-color: #eee;
      }
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
