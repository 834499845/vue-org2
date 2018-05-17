// 修改登录密码
<template>
    <div class="versions">
      <div class="install-title">
        <div>
          修改密码
        </div>
      </div>
      <div class="install-main">
        <div>
          <img src="/static/img/1@3x.png" alt="">
        </div>
        <div @click="updateClick">
          修改密码
        </div>
      </div>
      <!-- 修改密码 -->
      <div class="updatePwd" v-show="updatePwdShow">
        <transition name="slide-fade">
          <div class="updatePwd-content" v-show="updatePwdShow">
            <div class="up-content-title">
              <div>
                修改密码
              </div>
              <div @click="cancelClick">
                X
              </div>
            </div>
            <div class="up-content-main">
              <div class="up-c-m-list">
                <div class="up-c-m-listLeft">
                 <small>*</small> 当前密码：
                </div>
                <div class="up-c-m-listRight">
                  <input type="text" placeholder="请输入原密码">
                </div>
              </div>
              <div class="up-c-m-list">
                <div class="up-c-m-listLeft">
                 <small>*</small> 新密码：
                </div>
                <div class="up-c-m-listRight">
                  <input type="text" placeholder="请输入新密码">
                </div>
              </div>
              <div class="up-c-m-listNews">
                <div class="up-c-m-listLeft">
                 
                </div>
                <div class="up-c-m-listNewsRight">
                  新密码必须包含数字、小写字母、大写字母,长度不低于6位,且不能与账号相同
                </div>
              </div>
              <div class="up-c-m-list">
                <div class="up-c-m-listLeft">
                 <small>*</small> 确认密码：
                </div>
                <div class="up-c-m-listRight">
                  <input type="text" placeholder="请输入确认密码">
                </div>
              </div>
            </div>
            <div class="up-content-but">
              <div></div>
              <div @click="affirmClick">
                保存
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      updatePwdShow: false // 弹框显示隐藏
    };
  },
  filters: {},
  created: function() {},
  watch: {},
  methods: {
    // 点击修改密码
    updateClick() {
      this.updatePwdShow = true;
    },
    // 取消修改
    cancelClick() {
      this.updatePwdShow = false;
    },
    // 确认修改
    affirmClick() {
      this.updatePwdShow = false;
    },
    ...mapActions([])
  }
};
</script>
<style scoped>
.up-c-m-listRight {
  margin-left: 30px;
}
.up-c-m-listLeft {
  width: 150px;
  text-align: right;
}
.up-c-m-listLeft small {
  color: red;
}
.up-c-m-listNewsRight {
  margin-left: 35px;
  font-size: 12px;
  color: #ccc;
  width: 350px;
}
.up-c-m-listNews {
  width: 100%;
  display: flex;
  height: 30px;
  margin-top: 5px;
  align-items: center;
}
.up-c-m-listNews input,
.up-c-m-list input {
  border: 1px solid #ccc;
  height: 35px;
  border-radius: 5px;
  line-height: 35px;
  padding-left: 10px;
  width: 350px;
}
.up-c-m-list {
  margin-top: 20px;
  width: 100%;
  display: flex;
  height: 37px;
  align-items: center;
}
.up-content-but {
  height: 60px;
  width: 100%;
  background-color: #f0f6fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e5e5e5;
}
.up-content-but > div:nth-child(2) {
  width: 55px;
  height: 35px;
  border-radius: 4px;
  background-color: #38adff;
  text-align: center;
  line-height: 35px;
  color: #fff;
  margin-right: 25px;
  cursor: pointer;
}
.up-content-main {
  height: 240px;
  width: 100%;
  border-top: 1px solid #e5e5e5;
}
.up-content-title > div:nth-child(1) {
  margin-left: 15px;
}
.up-content-title > div:nth-child(2) {
  margin-right: 15px;
  font-size: 16px;
  color: #ccc;
  cursor: pointer;
}
.up-content-title {
  height: 52px;
  width: 100%;
  background-color: #f0f6fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.updatePwd-content {
  width: 600px;
  height: 350px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 70px;
}
.updatePwd {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}
.install-title {
  height: 80px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}
.install-title > div {
  width: 91%;
  background-color: rgba(56, 173, 255, 0.2);
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #000;
  padding-left: 15px;
}
.install-main > div:nth-child(1) {
  width: 80px;
  height: 80px;
  margin-top: 45px;
}
.install-main > div:nth-child(2):hover {
  background-color: rgba(56, 173, 255, 0.8);
}
.install-main > div:nth-child(2) {
  width: 80px;
  height: 35px;
  line-height: 35px;
  border-radius: 5px;
  background-color: #38adff;
  color: #fff;
  margin-top: 45px;
  text-align: center;
  cursor: pointer;
}
.install-main > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}
.install-main {
  min-height: 70px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
}

.versions {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  min-height: 500px;
}
</style>