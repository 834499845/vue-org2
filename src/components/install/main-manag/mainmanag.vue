// 企业设置
<template>
    <div class="mainmanag">
      <div class="install-title">
        <div>
          {{titileName}}
          <!-- 修改完成后，绑定找回密码的手机号会修改为新手机号 -->
        </div>
      </div>
      <div class="install-main" v-show="mainmanagFisterShow">
        <div>
          <div class="mainmanag-list">
            <div>
             <small>*</small> 当前绑定钉钉账号：
            </div>
            <div>
              卞童
            </div>
          </div>
          <div class="mainmanag-list">
            <div>
             <small>*</small> 手机号：
            </div>
            <div class="mainmanagList-phone">
              13636898669
            </div>
            <!-- <div class="mainmanagList-code">
              获取验证码
            </div> -->
            <v-reciprocaltime @countDownEnd="sendFisterCodeClick"></v-reciprocaltime>
          </div>
          <div class="mainmanag-list">
            <div>
             <small>*</small> 验证码：
            </div>
            <div class="mainmanagList-inputCode">
              <input type="text" placeholder="请填写验证码">
            </div>
          </div>
          <div class="mainmanag-but">
            <div @click="filterClick">下一步</div>
          </div>
        </div>
      </div>
      <div class="install-main" v-show="!mainmanagFisterShow">
        <div>
          <div class="mainmanag-list">
            <div>
             <small>*</small> 绑定伯通账号：
            </div>
            <div class="mainmanagList-inputPhone">
              <input type="text" placeholder="请输入手机号或名称相关关键词" v-model="phoneVal">
              <div class="inputPhoneList" v-show="inputPhoneListShow">
                <ul>
                  <li class="inputPhoneLi" v-for="(item,index) in phoneLists" :key="index">
                    <div>
                      {{item.name}}
                    </div>
                    <div>
                      手机号：{{item.phone}}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mainmanag-list">
            <div>
             <small>*</small> 手机号：
            </div>
            <div class="mainmanagList-phone">
              13636898669
            </div>
            <!-- <div class="mainmanagList-code">
              获取验证码
            </div> -->
            <v-reciprocaltime @countDownEnd="sendTwoCodeClick"></v-reciprocaltime>
          </div>
          <div class="mainmanag-list">
            <div>
             <small>*</small> 验证码：
            </div>
            <div class="mainmanagList-inputCode">
              <input type="text" placeholder="请填写验证码">
            </div>
          </div>
          <div class="mainmanag-but">
            <div>完成</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
// import reciprocalTime from "../../cModel/reciprocalTime.vue"; // 引入倒计时组件
export default {
  components: { "v-reciprocaltime": reciprocalTime },
  data() {
    return {
      titileName: "换绑主管理账号，需要验证当前主管理账号的身份", // title名称
      mainmanagFisterShow: true, //步骤显示
      phoneVal: "", // 搜索人
      inputPhoneListShow: false, // 控制搜索人显示
      phoneLists: [{ name: "发生地方", phone: "12363659845" }] // 第二步搜索人名单
    };
  },
  filters: {},
  created: function() {},
  watch: {
    phoneVal(val) {
      if (val.length > 0) {
        this.inputPhoneListShow = true;
      } else {
        this.inputPhoneListShow = false;
      }
    }
  },
  methods: {
    // 第一步发送短信验证码
    sendFisterCodeClick() {
      console.log("结束");
    },
    // 第二步发送短信验证码
    sendTwoCodeClick() {},
    // 下一步
    filterClick() {
      this.mainmanagFisterShow = false;
      this.titileName = "修改完成后，绑定找回密码的手机号会修改为新手机号";
    },
    ...mapActions([])
  }
};
</script>
<style scoped>
.mainmanag-but {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
.mainmanag-but > div {
  width: 65px;
  height: 35px;
  border-radius: 5px;
  color: #fff;
  background-color: #38adff;
  line-height: 35px;
  text-align: center;
  cursor: pointer;
}
.mainmanag-list small {
  color: red;
}
.mainmanagList-code {
  height: 35px;
  width: 95px;
  background-color: #38adff;
  text-align: center;
  line-height: 35px;
  color: #fff;
  margin-left: 30px;
  border-radius: 5px;
  cursor: pointer;
}
.inputPhoneLi {
  width: 100%;
  height: 45px;
  cursor: pointer;
  margin-top: 4px;
}
.inputPhoneLi:hover {
  background-color: #38adff;
  color: #fff;
}
.inputPhoneLi > div:nth-child(1) {
  height: 25px;
  line-height: 25px;
  font-size: 15px;
  margin-left: 10px;
}
.inputPhoneLi > div:nth-child(2) {
  height: 15px;
  line-height: 15px;
  font-size: 12px;
  margin-left: 10px;
  margin-top: 1px;
}
.inputPhoneList ul {
  display: flex;
  flex-wrap: wrap;
}
.inputPhoneList {
  position: absolute;
  top: 37px;
  width: 350px;
  left: 5px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  min-height: 200px;
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.mainmanagList-inputPhone {
  height: 35px;
  border-radius: 5px;
  line-height: 35px;
  width: 350px;
  position: relative;
}
.mainmanagList-inputPhone input,
.mainmanagList-inputCode input {
  border: 1px solid #ccc;
  height: 35px;
  border-radius: 5px;
  line-height: 35px;
  padding-left: 10px;
  width: 350px;
}
.mainmanagList-phone {
  border: 1px solid #ccc;
  background-color: #eee;
  height: 35px;
  border-radius: 5px;
  line-height: 35px;
  padding-left: 10px;
  width: 350px;
  margin-right: 10px;
}
.mainmanag-list > div:nth-child(1) {
  width: 185px;
  text-align: right;
}
.mainmanag-list > div:nth-child(2) {
  width: 350px;
  margin-left: 15px;
}
.mainmanag-list {
  margin-top: 20px;
  width: 100%;
  height: 35px;
  align-items: center;
  display: flex;
}
.install-main {
  min-height: 180px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  width: 100%;
}
.install-main > div {
  width: 91%;
  min-height: 180px;
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

.mainmanag {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  min-height: 497px;
}
</style>