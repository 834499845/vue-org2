// 主页
<template>
  <div class="businessdata">
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
        { name: "成员使用统计", path: "statistics" },
        { name: "管理员操作记录", path: "adminlist" }
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
      if (valPath == "/home/business/statistics") {
        this.isBarSelectLi = 0;
      } else if (valPath == "/home/business/adminlist") {
        this.isBarSelectLi = 1;
      } else {
        this.isBarSelectLi = -1;
      }
    },
    // 点击侧栏
    barListsClick(index) {
      this.isBarSelectLi = index;
      this.isBarNoSelectLi = index;
      this.$router.push({
        path: "/home/business/" + this.barLists[index].path
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
  min-height: 697px;
  background-color: #fff;
  border-left: 1px solid #dedede;
}

.businessdata {
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  min-height: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
</style>