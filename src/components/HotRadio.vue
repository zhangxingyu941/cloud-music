<template>
  <div class="hot-radio">
    <h2>热门电台</h2>
    <div class="radio-list">
      <div class="radio" v-for="i in [1, 2, 3, 4, 5]">
        <img src="../assets/img/logo.webp" alt="电台封面" />
        <div class="radio-details">
          <p>电台名称</p>
          <p>电台来源</p>
          <div>
            <span>期数</span>
            <span>订阅数</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts"></script>
<style lang="less" scoped>
.hot-radio {
  background-color: #fff;
  border-radius: 20px;
  width: 60%;
  padding: 1px 20px;
  .radio-list {
    display: flex;
    flex-wrap: wrap;
    .radio {
      display: flex;
      width: 50%;
      margin-bottom: 20px;
      img {
        width: 20%;
      }
      .radio-details {
        width: 80%;
        border-bottom: 1px solid #bbbbbb;
        margin: 0 20px;
        p:first-child {
          font-weight: 600;
        }
        p:nth-child(2) {
          font-size: 14px;
          color: #848484;
        }
        > div {
          display: flex;
          justify-content: space-between;
          span {
            font-size: 12px;
            color: #848484;
          }
        }
      }
    }
  }
}
</style>
