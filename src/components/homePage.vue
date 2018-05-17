// 主页
<template>
    <div class="homedata">
        <div class="homeData-left">
            <div class="DataLeft-img">
                <div>
                    <img src="/static/img/1@3x.png" alt="">
                </div>
                <div>
                    测试专用
                </div>
            </div>
            <div class="DataLeft-data">
                <div class="DataLeft-dataList">
                    <div>
                        企业人数：
                    </div>
                    <div>
                        2222人
                    </div>
                </div>
                <div class="DataLeft-dataList">
                    <div>
                        企业人数：
                    </div>
                    <div>
                        2222人
                    </div>
                </div>
                <div class="DataLeft-dataList">
                    <div>
                        企业人数：
                    </div>
                    <div>
                        2222人
                    </div>
                </div>
            </div>
        </div>
        <div class="homeData-right">
            <div class="homeData-rightTop">
                <div class="homeDataSwipe">
                    <template>
                        <el-carousel class="carousel">
                            <el-carousel-item class="carousel" v-for="(item,index) in swipeLists" :key="index">
                                <img :src="item.img" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </template>
                </div>
            </div>
            <div class="homeData-rightBottom">
                <div class="homeDatashortcut">
                    <div class="homeData-shortcut-title">
                        快捷入口
                    </div>
                    <div class="homeData-shortcut-list">
                        <ul>
                            <li class="shortcutLi" v-for="(item,index) in lists" :key="index">
                                <div>
                                    <img :src="item.img" alt="">
                                </div>
                                <div>
                                    <div class="shortcutLi-text-top">
                                        {{item.name}}
                                    </div>
                                    <div class="shortcutLi-text-bot" v-if="item.type == 1">
                                        1人未激活
                                    </div>
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
      swipeLists: [
        { img: "/static/img/1@3x.png" },
        { img: "/static/img/6@3x.png" },
        { img: "/static/img/9@3x.png" },
        { img: "/static/img/4@3x.png" },
        { img: "/static/img/5@3x.png" }
      ], //轮播
      lists: [
        { name: "日志", img: "/static/img/1@3x.png", path: "", type: 0 },
        { name: "公告", img: "/static/img/4@3x.png", path: "", type: 0 },
        { name: "审批", img: "/static/img/5@3x.png", path: "examine", type: 1 }
      ] //快捷入口列表
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
.shortcutLi {
  display: flex;
  width: 185px;
  height: 57px;
  align-items: center;
  border: 1px solid #c3c6ce;
  margin-right: 70px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 25px;
}

.shortcutLi:hover {
  border: 1px solid red;
}

.shortcutLi > div:nth-child(1) {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  overflow: hidden;
  margin-left: 23px;
}

.shortcutLi > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.shortcutLi > div:nth-child(2) {
  margin-left: 20px;
}

.shortcutLi-text-bot {
  font-size: 12px;
  color: #9c9c9c;
  height: 12px;
  line-height: 12px;
  margin-top: 7px;
}

.shortcutLi-text-top {
  font-size: 15px;
  color: #575757;
  height: 16px;
  line-height: 16px;
}

.homeData-shortcut-list ul {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.homeData-shortcut-list {
  width: 100%;
  min-height: 60px;
  margin-top: 25px;
}

.homeData-shortcut-title {
  height: 20px;
  font-size: 19px;
  width: 100%;
  color: #000;
}

.homeDatashortcut {
  width: 800px;
  min-height: 235px;
}

.homeData-rightBottom {
  min-height: 280px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.carousel {
  width: 800px;
  height: 235px !important;
  overflow: hidden;
  border-radius: 5px;
}

.carousel img {
  width: 800px;
  height: 235px !important;
  border-radius: 5px;
}

.homeDataSwipe {
  width: 800px;
  height: 235px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.homeData-rightTop {
  height: 240px;
  width: 100%;
  margin-top: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.DataLeft-data {
  width: 300px;
  min-width: 400px;
  overflow: hidden;
}

.DataLeft-dataList {
  display: flex;
  justify-content: space-between;
  width: 270px;
  height: 20px;
  margin-left: 15px;
  margin-top: 20px;
}

.DataLeft-dataList > div:nth-child(1) {
  color: #929292;
  text-align: left;
}

.DataLeft-dataList > div:nth-child(2) {
  color: #575757;
}

.DataLeft-img > div {
  width: 100%;
  text-align: center;
  font-size: 15px;
}

.DataLeft-img > div:nth-child(1) {
  height: 70px;
  display: flex;
  margin-top: 25px;
  justify-content: center;
}

.DataLeft-img > div:nth-child(2) {
  margin-top: 17px;
  height: 15px;
}

.DataLeft-img > div:nth-child(1) img {
  height: 70px;
  width: 70px;
}

.DataLeft-img {
  width: 300px;
  height: 150px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.DataLeft-img::after {
  position: absolute;
  bottom: 0;
  left: 15px;
  width: 270px;
  height: 1px;
  background-color: #ccc;
  content: "";
}

.homeData-left {
  width: 300px;
  background-color: #f4f6f8;
}

.homeData-right {
  width: 899px;
  background-color: #fff;
  border-left: 1px solid #dedede;
}

.homedata {
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  min-height: 497px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
</style>