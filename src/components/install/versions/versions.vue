// 版本信息管理
<template>
    <div class="versions">
      <div class="install-title">
        <div>
          <div>
            版本信息管理
          </div>
          <div @click="addClick">
            新增版本信息
          </div>
        </div>
      </div>
      <div class="install-main">
        <div class="versions-main">
          <ul>
            <li class="fisterLi">
              <div>
                版本类型
              </div>
              <div>
                资源链接
              </div>
              <div>
                版本号
              </div>
              <div>
                版本说明
              </div>
              <div>
                更新时间
              </div>
              <div>
                操作
              </div>
            </li>
            <li class="dataLi" v-for="(item,index) in verLists" :key="index">
              <div>
                {{item.a}}
              </div>
              <div>
                {{item.b}}
              </div>
              <div>
                {{item.c}}
              </div>
              <div>
                {{item.d}}
              </div>
              <div>
                {{item.e}}
              </div>
              <div class="dataLi-op">
                <div @click="updateClick">
                  <img src="/static/img/1@3x.png" alt="">
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 新增版本信息 -->
      <div class="updatePwd" v-show="updatePwdShow">
        <transition name="slide-fade">
          <div class="updatePwd-content" v-show="updatePwdShow">
            <div class="up-content-title">
              <div>
                新增版本信息
              </div>
              <div @click="cancelClick">
                X
              </div>
            </div>
            <div class="up-content-main">
              <div class="up-c-m-list">
                <div class="up-c-m-listLeft">
                 <small>*</small> 版本类型：
                </div>
                <div class="up-c-m-listRight">
                    <select v-model="typeModelVal">
                        <option v-for="(tyep,index) in tyepLists" :key="index" v-bind:value="index">{{tyep.name}}</option>
                    </select>
                </div>
              </div>
              <div class="up-c-m-list">
                <div class="up-c-m-listLeft">
                 <small>*</small> 版本号：
                </div>
                <div class="up-c-m-listRight">
                  <input type="text" placeholder="请输入版本号">
                </div>
              </div>
              <div class="up-c-m-file">
                <div class="up-c-m-listLeft">
                 <small>*</small> 上传apk：
                </div>
                <div class="up-c-m-listRight">
                  <label for="fileApk">
                    上传APK
                  </label>
                  <input id="fileApk" type="file">
                </div>
              </div>
              <div class="up-c-m-listNews">
                <div class="up-c-m-listLeft">
                 
                </div>
                <div class="up-c-m-listNewsRight">
                  {{linkApkUrlVal}}
                </div>
              </div>
              <div class="up-c-m-text">
                <div class="up-c-m-listLeft">
                 <small>*</small> 版本说明：
                </div>
                <div class="up-c-m-listRight">
                  <textarea></textarea>
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
      updatePwdShow: false, // 弹框显示隐藏
      verLists: [
        {
          a: "Andiraod",
          b:
            "https://image.botong.tech/tech/temp/42cb274735614228acb0360be185e241.apk",
          c: "1.2.6.1",
          d:
            "1.更新伯通后台管理端 2.优化伯通客户端的日志，审批模块， 3.增加伯通客户端联系人模块的搜索和添加功能 4.适配iPhoneX",
          e: "2017-01-02 08:09"
        }
      ], // 版本列表
      typeModelVal: 0, // 版本类型选择
      linkApkUrlVal: "链接地址...",
      tyepLists: [{ name: "安卓" }, { name: "iOS" }] //版本类型选择
    };
  },
  filters: {},
  created: function() {},
  watch: {},
  methods: {
    // 点击新增
    addClick() {
      this.updatePwdShow = true;
    },
    // 点击修改
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
  min-height: 15px;
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
  width: 340px;
}
.up-c-m-list select {
  border: 1px solid #ccc;
  height: 35px;
  border-radius: 5px;
  line-height: 35px;
  padding-left: 10px;
  width: 350px;
}
.up-c-m-file .up-c-m-listRight {
  display: flex;
  align-items: center;
}
.up-c-m-file label {
  width: 80px;
  height: 33px;
  border-radius: 3px;
  background-color: #38adff;
  text-align: center;
  line-height: 33px;
  color: #fff;
  cursor: pointer;
}
.up-c-m-file input {
  display: block;
  width: 0px;
  height: 0px;
  display: none;
  border: 0px solid red;
  overflow: hidden;
}
.up-c-m-file {
  margin-top: 20px;
  width: 100%;
  display: flex;
  height: 37px;
  align-items: center;
}
.up-c-m-text textarea {
  border: 1px solid #ccc;
  height: 80px;
  border-radius: 5px;
  padding-left: 10px;
  width: 340px;
  resize: none;
}
.up-c-m-text .up-c-m-listLeft {
  height: 80px;
  line-height: 25px;
}
.up-c-m-text {
  margin-top: 20px;
  width: 100%;
  display: flex;
  height: 80px;
  align-items: center;
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
  min-height: 240px;
  width: 100%;
  border-top: 1px solid #e5e5e5;
  margin-bottom: 20px;
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
  min-height: 350px;
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
.fisterLi {
  display: flex;
  height: 50px;
  line-height: 50px;
}
.dataLi {
  display: flex;
  min-height: 50px;
  border-top: 1px solid #ccc;
}
.dataLi > div {
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  word-break: break-all;
  border-left: 1px solid #ccc;
}
.fisterLi > div {
  text-align: center;
  border-left: 1px solid #ccc;
}
.fisterLi > div:nth-child(1),
.dataLi > div:nth-child(1) {
  width: 10%;
  border: 0;
}
.fisterLi > div:nth-child(2),
.dataLi > div:nth-child(2) {
  width: 25%;
  padding-left: 10px;
  padding-right: 10px;
}
.fisterLi > div:nth-child(3),
.dataLi > div:nth-child(3) {
  width: 10%;
}
.fisterLi > div:nth-child(4),
.dataLi > div:nth-child(4) {
  width: 30%;
  padding-left: 10px;
  padding-right: 10px;
}
.dataLi > div:nth-child(4) {
  padding-top: 10px;
  padding-bottom: 10px;
}
.fisterLi > div:nth-child(5),
.dataLi > div:nth-child(5) {
  width: 18%;
}
.fisterLi > div:nth-child(6),
.dataLi > div:nth-child(6) {
  width: 7%;
}
.dataLi-op {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dataLi-op > div {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.dataLi-op > div img {
  width: 20px;
  height: 20px;
}
.versions-main {
  width: 91%;
  min-height: 80px;
  border: 1px solid #ccc;
  margin-bottom: 40px;
}
.install-main {
  min-height: 80px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
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

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.install-title > div > div:nth-child(1) {
  padding-left: 15px;
  color: #000;
}

.install-title > div > div:nth-child(2) {
  margin-right: 15px;
  border: 1px solid #fff;
  background-color: #38adff;
  height: 29px;
  font-size: 14px;
  line-height: 29px;
  border-radius: 3px;
  padding-right: 9px;
  padding-left: 9px;
  cursor: pointer;
  text-align: center;
  color: #fff;
}

.versions {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  min-height: 400px;
}
</style>