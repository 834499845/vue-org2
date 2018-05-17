// 工作台
<template>
  <div class="homeApp">
    <div class="footer">
      <div class="footer-center">
        <div class="footer-left">
          <div class="footer-logo" @click="homeClick">
            <div>
              <img src="/static/img/1@3x.png" alt="">
            </div>
            <div>
              发十大十大
            </div>
          </div>
          <div class="footer-list">
            <ul>
              <li :key="index" :class="{navListLi:true,selectNav:isSelectNav == index}" v-for="(item,index) in navLists" @click="navClick(index)">{{item.name}}</li>
            </ul>
          </div>
        </div>
        <div class="footer-back" @click="quitClick">
          退出
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-content">
        <router-view keep-alive></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isSelectNav: -1, //选中导航
      navLists: [
        { name: "通讯录", path: "address" },
        { name: "工作台", path: "work" },
        { name: "企业数据", path: "business" },
        { name: "设置", path: "install" }
      ] //导航列表
    };
  },
  filters: {},
  created: function() {
    sessionStorage.setItem("oidItem", "6382842835502108672");
    this.fetchData();
  },
  watch: { $route: "fetchData" },
  methods: {
    // 监视路由
    fetchData(val) {
      var pathStr = this.$route.path;
      var pathOne = pathStr.split("/")[2];
      console.log(pathOne);
      if (pathOne == "address") {
        this.isSelectNav = 0;
      } else if (
        pathOne == "work" ||
        pathOne == "loglist" ||
        pathOne == "notice" ||
        pathOne == "sign" ||
        pathOne == "examine" ||
        pathOne == "information" ||
        pathOne == "network" ||
        pathOne == "formDesign"
      ) {
        this.isSelectNav = 1;
      } else if (pathOne == "business") {
        this.isSelectNav = 2;
      } else if (pathOne == "install") {
        this.isSelectNav = 3;
      } else {
        this.isSelectNav = -1;
      }
    },
    // 导航跳转
    navClick(index) {
      this.isSelectNav = index;
      this.$router.push({
        path: "/home/" + this.navLists[index].path
      });
    },
    // 退出
    quitClick() {
      this.$router.push({
        path: "/login"
      });
    },
    // 主页跳转
    homeClick() {
      this.isSelectNav = -1;
      this.$router.push({
        path: "/home/homePage"
      });
    },
    ...mapActions([])
  }
};
</script>
<style scoped>
.footer-left {
  display: flex;
  align-items: center;
}

.footer-logo {
  width: 260px;
  height: 65px;
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
  cursor: pointer;
}

.footer-logo > div:nth-child(1) {
  width: 35px;
  height: 35px;
  overflow: hidden;
}

.footer-logo > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.footer-logo > div:nth-child(2) {
  font-size: 14px;
  margin-left: 15px;
  color: #333;
}

.footer-list {
  height: 65px;
}

.footer-list ul {
  height: 65px;
  display: flex;
  align-items: center;
}

.selectNav::after {
  position: absolute;
  bottom: 0px;
  left: 0;
  height: 3px;
  width: 100%;
  background-color: #38adff;
  content: "";
}

.navListLi {
  position: relative;
  width: 135px;
  height: 65px;
  line-height: 65px;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  color: #333;
}

.footer-back {
  width: 34px;
  cursor: pointer;
  font-size: 12px;
  color: #333;
}

.footer-center {
  width: 1200px;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-content {
  width: 1200px;
  min-height: 700px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
  margin-bottom: 30px;
}

.main {
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 65px);
  overflow: hidden;
}

.footer {
  width: 100%;
  height: 65px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.homeApp {
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>