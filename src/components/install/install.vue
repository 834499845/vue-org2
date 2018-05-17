// 主页
<template>
  <div class="installdata">
    <div class="homeData-left">
      <ul>
        <li :class="{'barLi':true,'barSelectLi':isBarSelectLi == index,'barNoSelectLi':isBarNoSelectLi == index}" v-for="(item,index) in barLists" :key="index" @click="barListsClick(index)" @mouseover="barListsMouse(index)">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="homeData-right">
      <router-view keep-alive></router-view>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isBarSelectLi: 0, // 选中侧栏
      isBarNoSelectLi: -1, // 未选中侧栏
      barLists: [
        { name: "企业设置", path: "enterprise" },
        { name: "通讯录信息", path: "communication" },
        { name: "更换主管理员", path: "mainmanag" },
        { name: "设置子管理员", path: "sonmanag" },
        { name: "版本信息管理", path: "versions" },
        { name: "修改登录密码", path: "updatepwd" }
      ] //侧栏列表
    };
  },
  filters: {},
  created: function() {
    this.fetchPathFun();
  },
  watch: {},
  methods: {
    // 路由跳转
    fetchPathFun(val) {
      var valPath = this.$route.path;
      if (valPath == "/home/install/enterprise") {
        this.isBarSelectLi = 0;
      } else if (valPath == "/home/install/communication") {
        this.isBarSelectLi = 1;
      } else if (valPath == "/home/install/mainmanag") {
        this.isBarSelectLi = 2;
      } else if (
        valPath == "/home/install/sonmanag" ||
        valPath == "/home/install/opSonmanag"
      ) {
        this.isBarSelectLi = 3;
      } else if (valPath == "/home/install/versions") {
        this.isBarSelectLi = 4;
      } else if (valPath == "/home/install/updatepwd") {
        this.isBarSelectLi = 5;
      } else {
        this.isBarSelectLi = -1;
      }
    },
    // 点击侧栏
    barListsClick(index) {
      this.isBarSelectLi = index;
      this.isBarNoSelectLi = index;
      this.$router.push({
        path: "/home/install/" + this.barLists[index].path
      });
    },
    // 触摸侧栏
    barListsMouse(index) {
      if (this.isBarSelectLi == index) {
        this.isBarNoSelectLi = -1;
      } else {
        this.isBarNoSelectLi = index;
      }
    },
    ...mapActions([])
  }
};
</script>
<style scoped>
.homeData-left ul {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 15px;
}
.barNoSelectLi {
  background-color: #eeeeee;
}
.barSelectLi {
  background-color: #38adff;
  color: #fff;
}
.barLi {
  width: 100%;
  height: 40px;
  overflow: hidden;
  padding-left: 14px;
  font-size: 14px;
  line-height: 40px;
  cursor: pointer;
  user-select: none;
}
.homeData-left {
  width: 300px;
  background-color: #f4f6f8;
  box-sizing: content-box;
}

.homeData-right {
  width: 898px;
  min-height: 497px;
  background-color: #fff;
  border-left: 1px solid #dedede;
}

.installdata {
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  min-height: 497px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
</style>