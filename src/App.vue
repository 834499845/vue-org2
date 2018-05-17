// 工作台
<template>
  <div class="homeApp">
    <router-view class="view" keep-alive></router-view>
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
  created: function() {},
  watch: { $route: "fetchData" },
  methods: {
    // 监视路由
    fetchData(val) {
      var pathStr = val.path;
      var pathOne = pathStr.split("/")[1];
      if (pathOne == "address") {
        this.isSelectNav = 0;
      } else if (
        pathOne == "work" ||
        pathOne == "loglist" ||
        pathOne == "notice" ||
        pathOne == "sign" ||
        pathOne == "examine" ||
        pathOne == "information"
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
        path: "/" + this.navLists[index].path
      });
    },
    // 退出
    quitClick() {
      this.$router.push({
        path: "login"
      });
    },
    // 主页跳转
    homeClick() {
      this.isSelectNav = -1;
      this.$router.push({
        path: "/home"
      });
    },
    ...mapActions([])
  }
};
</script>
<style scoped>
.view {
  width: 100%;
  min-height: 100%;
}
.homeApp {
  overflow: hidden;
  width: 100%;
  min-height: 100%;
}
</style>