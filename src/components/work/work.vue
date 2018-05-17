// 工作台
<template>
    <div class="work">
      <div class="work-content">
        <div class="work-content-top">
          应用管理
        </div>
        <div class="work-content-bottom">
          <div class="workContent-list">
            <div class="workContent-list-top">
              基础应用
            </div>
            <div class="workContent-list-bottom">
              <ul class="workContentUl">
                <li class="workContentLi" v-for="(item,index) in lists" :key="index" @click="listClick(index)">
                  <div>
                    <img :src="item.img" alt="">
                  </div>
                  <div>
                    {{item.name}}
                  </div>
                </li>
              </ul>
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
      lists: [
        { name: "日志", img: "/static/img/1@3x.png", path: "loglist" },
        { name: "公告", img: "/static/img/4@3x.png", path: "notice" },
        { name: "签到", img: "/static/img/4@3x.png", path: "sign" },
        { name: "审批", img: "/static/img/5@3x.png", path: "examine" },
        { name: "资讯", img: "/static/img/6@3x.png", path: "information" },
        { name: "网盘", img: "/static/img/9@3x.png", path: "network" }
      ] //基础应用列表
    };
  },
  filters: {},
  created: function() {},
  watch: {},
  methods: {
    listClick(index) {
      this.$router.push({
        path: "/home/" + this.lists[index].path
      });
    },
    ...mapActions([])
  }
};
</script>
<style scoped>
.workContentLi {
  height: 70px;
  width: 220px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 30px;
}
.workContentLi:hover {
  border: 1px solid #38adff;
}
.workContentLi > div:nth-child(2) {
  font-size: 14px;
  margin-left: 13px;
  color: #333;
}
.workContentLi > div:nth-child(1) {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  overflow: hidden;
  margin-left: 14px;
}
.workContentLi > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}
.workContentUl {
  display: flex;
  flex-wrap: wrap;
}
.workContent-list-top {
  height: 30px;
  width: 100%;
  line-height: 30px;
  font-size: 13px;
  color: #b2b2b2;
}

.workContent-list-bottom {
  min-height: 30px;
  width: 100%;
  margin-top: 10px;
}
.workContent-list {
  width: 100%;
  min-height: 60px;
  margin-top: 35px;
}
.work-content-top {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  color: #333;
  margin-top: 25px;
  border-bottom: 1px solid #ccc;
}

.work-content {
  width: 765px;
  min-height: 500px;
}
.work {
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  height: 100%;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
</style>