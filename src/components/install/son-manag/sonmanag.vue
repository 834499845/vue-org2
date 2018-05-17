// 设置子管理员
<template>
    <div class="sonmanag">
      <div class="install-title">
        <div>
          <div>
            设置子管理员
          </div>
          <div @click="addClick">
            新增子管理员
          </div>
        </div>
      </div>
      <div class="install-main">
        <div class="sonmanag-main">
          <ul>
            <li class="fisterLi">
              <div>
                成员
              </div>
              <div>
                管理范围
              </div>
              <div>
                权限
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
              <div class="dataLi-op">
                <div @click="updateClick">
                  <img src="/static/img/1@3x.png" alt="">
                </div>
                <div @click="updateClick">
                  <img src="/static/img/1@3x.png" alt="">
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      verLists: [
        {
          a: "Andiraod",
          b: "发撒的撒的",
          c: "1.2.6.1"
        }
      ] // 列表
    };
  },
  filters: {},
  created: function() {},
  watch: {},
  methods: {
    // 点击新增
    addClick() {
      // opSonmanag
      this.$router.push({
        path: "/home/install/opSonmanag"
      });
    },
    // 点击修改
    updateClick() {
      this.$router.push({
        path: "/home/install/opSonmanag"
      });
    },
    ...mapActions([])
  }
};
</script>
<style scoped>
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
  border-left: 1px solid #ccc;
}
.fisterLi > div {
  text-align: center;
  border-left: 1px solid #ccc;
}
.fisterLi > div:nth-child(1),
.dataLi > div:nth-child(1) {
  width: 25%;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  word-break: break-all;
}
.fisterLi > div:nth-child(2),
.dataLi > div:nth-child(2) {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  word-break: break-all;
}
.fisterLi > div:nth-child(3),
.dataLi > div:nth-child(3) {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  word-break: break-all;
}
.fisterLi > div:nth-child(4),
.dataLi > div:nth-child(4) {
  width: 25%;
}
.dataLi-op {
  display: flex;
  align-items: center;
  justify-content: space-around;
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
.sonmanag-main {
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

.sonmanag {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  min-height: 400px;
}
</style>