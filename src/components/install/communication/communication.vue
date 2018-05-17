// 企业通讯录信息
<template>
  <div class="communication">
    <div class="install-title">
      <div>
        企业通讯录信息
      </div>
    </div>
    <div class="install-label">
      <div>
        <ul>
          <li class="labelLi" v-for="(item,index) in labelLists" :key="index">
            {{item.name}}
          </li>
          <li class="inputLi">
            <div>
              <input type="text">
            </div>
            <div>
              <img src="/static/img/1@3x.png" alt="">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="install-title">
      <div>
        个人详情页展示的字段
      </div>
    </div>
    <div class="install-main">
      <div>
        <div class="main-left">
          <ul>
            <li class="i-m-l-selectLi" v-for="(item,index) in selectLists" :key="index">
              <div>
                <img v-if="item.show" src="/static/img/on@2x.png" alt="">
                <img v-else src="/static/img/out@2x.png" alt="">
              </div>
              <div>
                {{item.name}}
              </div>
            </li>
          </ul>
        </div>
        <div class="main-right">
          <div>
            <img src="/static/img/zhaopian.png" alt="">
          </div>
          <div class="i-m-r-imgList">
            <ul>
              <li class="imglistLi" v-for="(item,index) in imglists" :key="index">
                {{item.name}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------
              </li>
            </ul>
          </div>
          <div>
            <img src="/static/img/zhaopianxia.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      labelLists: [{ name: "部门" }, { name: "邮箱" }, { name: "姓名" }], // 所有标签列表
      selectLists: [
        { name: "部门", show: true },
        { name: "邮箱", show: true },
        { name: "姓名", show: true }
      ], // 选择标签列表
      imglists: [
        { name: "部门", show: true },
        { name: "邮箱", show: true },
        { name: "姓名", show: true }
      ]
    };
  },
  filters: {},
  created: function() {},
  watch: {},
  methods: {
    ...mapActions([])
  }
};
</script>
<style scoped>
.inputLi > div:nth-child(1) {
  width: 160px;
  height: 40px;
  border-radius: 5px;
}
.inputLi > div:nth-child(1) input {
  width: 150px;
  padding-left: 5px;
  height: 40px;
  border: 0px;
  font-size: 16px;
  border-radius: 5px;
}
.inputLi > div:nth-child(2) {
  width: 42px;
  height: 42px;
  overflow: hidden;
  cursor: pointer;
  background-color: rgb(35, 230, 175);
  display: flex;
  align-items: center;
  justify-content: center;
}
.inputLi > div:nth-child(2) img {
  width: 20px;
  height: 20px;
}
.inputLi {
  border: 1px solid #38adff;
  margin-right: 25px;
  margin-top: 15px;
  height: 42px;
  border-radius: 5px;
  width: 200px;
  display: flex;
  justify-content: space-between;
}
.i-m-r-imgList ul {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.imglistLi {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 23px;
  font-size: 17px;
  border-bottom: 1px solid #ccc;
}

.i-m-r-imgList {
  width: 100%;
}

.i-m-l-selectLi {
  display: flex;
  height: 25px;
  align-items: center;
  margin-top: 25px;
  margin-right: 15px;
}

.i-m-l-selectLi > div:nth-child(1) {
  width: 21px;
  height: 21px;
}

.i-m-l-selectLi > div:nth-child(2) {
  margin-left: 10px;
  padding-right: 15px;
}

.i-m-l-selectLi > div:nth-child(1) img {
  width: 21px;
  height: 21px;
}

.main-left {
  width: 500px;
}

.main-left ul {
  display: flex;
  flex-wrap: wrap;
}

.main-right > div {
  width: 100%;
}

.main-right > div img {
  width: 100%;
}

.main-right {
  border: 1px solid #ccc;
  width: 270px;
}

.install-main {
  min-height: 70px;
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  margin-bottom: 45px;
}

.install-main > div {
  width: 91%;
  min-height: 440px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}

.labelLi {
  font-size: 16px;
  color: #38adff;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  border: 1px solid #38adff;
  border-radius: 5px;
  margin-right: 25px;
  cursor: pointer;
  margin-top: 15px;
}

.install-label {
  margin-top: 25px;
  min-height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 45px;
}

.install-label > div ul {
  display: flex;
  flex-wrap: wrap;
}

.install-label > div {
  width: 91%;
  min-height: 40px;
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

.communication {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  min-height: 700px;
}
</style>