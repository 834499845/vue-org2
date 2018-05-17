// 签到
<template>
    <div class="loglist">
      <div class="work-title">
        <div @click="backClick">
          返回
        </div>
        <div>
          签到管理
        </div>
        <div></div>
      </div>
      <div class="work-content">
        <div class="workContent-left">
          <ul>
            <li :class="{'workContentL-Li':true,WorkContentSelectli:isWorkContentSelectli == index}" v-for="(item,index) in sideLists" :key="index" @click="sideListsClick(index)">
              {{item.name}}
            </li>
          </ul>
        </div>
        <div class="workContent-right">
          <div class="monthTop">
                <div @click="manageClick()" class="monthTopManage" :class="{monthTopShow:signShow}">
                    日常签到
                </div>
                <div @click="outClick()" class="monthTopOut" :class="{monthTopShow:!signShow}">
                    外出签到
                </div>
            </div>
            <div>
                 <router-view></router-view>
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
      isWorkContentSelectli: 0, //选中路由侧栏样式
      sideLists: [
        { name: "日常签到", path: "signManage" },
        { name: "外出签到", path: "signOut" }
      ], // 侧栏路由
      signShow: true
    };
  },
  filters: {},
  created: function() {},
  watch: {},
  methods: {
    // 路由点击
    sideListsClick(index) {
      this.isWorkContentSelectli = index;
      this.$router.push({
        path: "/home/sign"
      });
    },
    //日常签到
    manageClick() {
      this.signShow = true;
      var pathStr = "signManage";
      this.$router.push({
        path: "/home/sign/" + pathStr
      });
    },
    //外出签到
    outClick() {
      this.signShow = false;
      var pathStr = "signOut";
      this.$router.push({
        path: "/home/sign/" + pathStr
      });
    },
    // 返回
    backClick() {
      this.$router.push({
        path: "/home/work"
      });
    },
    ...mapActions([])
  }
};
</script>
<style scoped>
.WorkContentSelectli {
  background-color: #f1f8ff;
}
.WorkContentSelectli::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 3px;
  background-color: #38adff;
  height: 45px;
  content: "";
}
.workContentL-Li {
  width: 100%;
  height: 45px;
  cursor: pointer;
  text-align: center;
  line-height: 45px;
  overflow: hidden;
  position: relative;
}
.workContent-left ul {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.workContent-left {
  width: 210px;
  min-height: 500px;
  overflow: hidden;
  border-right: 1px solid #ccc;
}
.workContent-right {
  width: calc(100% - 210px);
  min-height: 500px;
  overflow: hidden;
}
.work-content {
  min-height: 500px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.work-title > div:nth-child(1) {
  width: 58px;
  height: 26px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  color: #333;
  line-height: 26px;
  margin-left: 15px;
  cursor: pointer;
}
.work-title > div:nth-child(2) {
  font-size: 14px;
  color: #333;
  margin-right: 15px;
}

.work-title {
  height: 55px;
  background-color: #fff;
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.monthTop {
  width: calc(100%-88px);
  height: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-left: 44px;
  margin-right: 44px;
  padding-top: 10px;
  /* padding-bottom: 12px; */
  color: #303030;
  font-size: 14px;
  display: flex;
}
.monthTopManage,
.monthTopOut {
  text-align: center;
  width: 100px;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 15px;
}

.monthTopManage:hover,
.monthTopOut:hover {
  background: #38adff;
  color: white;
}
.monthTopShow {
  background: #38adff;
  color: white;
  width: 100px;
  height: 36px;
}
.monthTop > div {
  margin-right: 15px;
}
.loglist {
  width: 100%;
  background-color: #fff;
  min-height: 600px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
</style>