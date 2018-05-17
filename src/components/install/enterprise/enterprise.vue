// 企业设置
<template>
    <div class="enterprise">
      <div class="install-title">
        <div>
          企业名称与logo设置
        </div>
      </div>
      <div class="install-main">
        <ul>
          <li class="enterpriseLi-name">
            <div class="enterpriseLi-left">
             <small>*</small> 企业名称：
            </div>
            <div class="enterpriseLi-right">
              <input type="text" v-model="nameVal">
            </div>
          </li>
          <li class="enterpriseLi-text">
            <div class="enterpriseLi-left">
             企业简介：
            </div>
            <div class="enterpriseLi-right">
              <textarea placeholder="不超过150字" maxlength="150" v-model="textVal">
              </textarea>
              <p class="etext-tost">{{etexttostVal}} / 150</p>
            </div> 
          </li>
          <li class="enterpriseLi-logo">
            <div class="enterpriseLi-left">
             企业logo：
            </div>
            <div class="enterpriseLi-right">
              <div class="e-l-r-left">
                <img :src="logoImgUrlVal" alt="">
              </div>
              <div class="e-l-r-right">
                <label for="logoFile">
                  上传
                </label>
                <input id="logoFile" type="file">
                <p class="logoTost">上传尺寸为1:1,建议640*640,大小不超过1M</p>
              </div>
            </div>   
          </li>
          <li class="enterpriseLi-logo">
            <div class="enterpriseLi-left">
             开机启动图：
            </div>
            <div class="enterpriseLi-right">
              <div class="e-l-r-left">
                <img :src="enterImgUrlVal" alt="">
              </div>
              <div class="e-l-r-right">
                <label for="logoFile">
                  上传
                </label>
                <input id="logoFile" type="file">
                <p class="logoTost">上传尺寸为1:1,建议640*640,大小不超过1M</p>
              </div>
            </div>   
          </li>
          <li class="enterpriseLi-link">
            <div class="enterpriseLi-left">
             
            </div>
            <div class="enterpriseLi-right">
              <div class="e-l-r-top">
                启动图跳转链接
              </div>
              <div class="e-l-r-bot">
                <input type="text" placeholder="http://">
              </div>
            </div> 
          </li>
          <li class="enterpriseLi-link">
            <div class="enterpriseLi-left">
             
            </div>
            <div class="enterpriseLi-right">
              <div class="e-l-r-top">
                启动图有效期（有效期到期后自动下线）
              </div>
              <div class="e-l-r-tiem">
                <div>
                  <el-date-picker :picker-options="pickerOptions1" v-model="advStartTime" type="datetime" placeholder="起始时间" :editable='false'
                    clearable></el-date-picker>
                </div>
                <div>
                  <el-date-picker :picker-options="pickerOptions1" v-model="advEndTime" type="datetime" placeholder="结束时间" :editable='false'
                    clearable></el-date-picker>    
                </div>
              </div>
            </div> 
          </li>
          <li class="enterpriseLi-but">
            <div>
              保存
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      advStartTime: "", // 开始时间
      advEndTime: "", // 结束时间
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }, // 禁止今日之前选择
      enterImgUrlVal: "/static/img/默认图片.png", // 开机启动图
      logoImgUrlVal: "/static/img/默认图片.png", // logo设置
      nameVal: "企业名称", // 企业名称
      textVal: "", // 企业简介
      etexttostVal: 0 // 企业简介字数限制
    };
  },
  filters: {},
  created: function() {},
  watch: {
    textVal(val) {
      if (val) {
        this.etexttostVal = val.length;
      }
    }
  },
  methods: {
    ...mapActions([])
  }
};
</script>
<style scoped>
.enterpriseLi-but > div {
  height: 34px;
  width: 100px;
  background-color: #38adff;
  cursor: pointer;
  border-radius: 5px;
  line-height: 34px;
  text-align: center;
  margin: 0 auto;
  color: #fff;
}
.enterpriseLi-but {
  width: 100%;
  height: 35px;
  margin-bottom: 50px;
  margin-top: 30px !important;
}
.e-l-r-tiem {
  width: 100%;
  margin-top: 8px;
  /* border: 1px solid red; */
  height: 45px;
  display: flex;
}
.e-l-r-tiem > div:nth-child(2) {
  margin-left: 10px;
}
.redBorder {
  border: 1px solid #ff5f57;
}
.e-l-r-top {
  width: 100%;
  font-size: 12px;
  height: 15px;
  line-height: 15px;
  color: #333;
}
.e-l-r-bot {
  width: 100%;
  margin-top: 8px;
}
.e-l-r-bot input {
  height: 34px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  width: 550px;
  padding-left: 10px;
}
.enterpriseLi-link .enterpriseLi-right {
  min-height: 60px;
  min-width: 500px;
  /* border: 1px solid red; */
  overflow: hidden;
}
.e-l-r-left {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #e4eaf0;
}
.e-l-r-left img {
  width: 100%;
  height: 100%;
}
.logoTost {
  position: absolute;
  font-size: 12px;
  color: #8f8e94;
  bottom: 5px;
  left: 0;
}
.e-l-r-right {
  position: relative;
  display: flex;
  height: 80px;
  align-items: center;
  margin-left: 28px;
  width: 400px;
}
.e-l-r-right label {
  width: 80px;
  border-radius: 4px;
  cursor: pointer;
  height: 32px;
  background-color: #38adff;
  line-height: 30px;
  color: #fff;
  text-align: center;
  margin-bottom: 15px;
}
.e-l-r-right input {
  width: 0px;
  height: 1px;
  overflow: hidden;
  display: block;
  display: none;
}
.enterpriseLi-logo {
  width: 91%;
  align-items: center;
  height: 83px;
}
.enterpriseLi-logo .enterpriseLi-left {
  height: 80px;
  line-height: 35px;
}
.enterpriseLi-logo .enterpriseLi-right {
  height: 80px;
  display: flex;
  align-items: center;
}
.enterpriseLi-text textarea {
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  width: 550px;
  padding-left: 10px;
  height: 100px;
  padding-top: 5px;
  resize: none;
  font-size: 14px;
  line-height: 20.44px;
}
.enterpriseLi-text .enterpriseLi-left {
  height: 120px;
  line-height: 35px;
}
.enterpriseLi-text .enterpriseLi-right {
  position: relative;
}
.etext-tost {
  position: absolute;
  z-index: 1000;
  right: 32px;
  bottom: 8px;
  color: red;
  font-size: 12px;
}

.enterpriseLi-text {
  width: 91%;
  align-items: center;
  height: 120px;
}
.enterpriseLi-name input {
  height: 34px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  width: 550px;
  padding-left: 10px;
}

.enterpriseLi-right {
  margin-left: 15px;
  width: 590px;
}
.enterpriseLi-left {
  width: 90px;
  font-size: 14px;
  text-align: right;
}
.enterpriseLi-name small {
  color: red;
}
.install-main .enterpriseLi-name {
  width: 91%;
  height: 37px;
  margin-top: 10px;
  align-items: center;
}
.install-main ul li {
  width: 91%;
  /* border: 1px solid red; */
  margin-top: 25px;
  min-height: 30px;
  display: flex;
  overflow: hidden;
}
.install-main {
  min-height: 70px;
  width: 100%;
}
.install-main ul {
  display: flex;
  align-items: center;
  flex-direction: column;
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

.enterprise {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  min-height: 700px;
}
</style>