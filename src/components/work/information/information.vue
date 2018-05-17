// 资讯
<template>
  <div class="information">
    <div class="work-title">
      <div @click="backClick">
        返回
      </div>
      <div>
        资讯管理
      </div>
      <div></div>
    </div>
    <div class="work-content">
      <div class="workContent-left">
        <ul class="workContentUL">
          <li class="workContentOneLi" v-for="(itemOne,OneIndex) in sideLists" :key="OneIndex">
            <div :class="{workContentOneLiIDv:true,workContentOneLiIDvliOneBg:isliOneBg == OneIndex}" @click="loOneClick(OneIndex)">
              {{itemOne.name}}
            </div>
            <div class="liTwo" v-show="itemOne.children && isliTwo == OneIndex">
              <ul class="liTwoUl">
                <li class="workContentTwoLi" v-for="(itemTwo,TwoIndex) in itemOne.children" :key="TwoIndex" @click="loTwoClick(TwoIndex)">
                  <div :class="{workContentTwoLiDv:isworkContentTwoLiDv == TwoIndex}">
                    {{itemTwo.name}}
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="workContent-right">
        <router-view class="view" keep-alive></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isworkContentTwoLiDv: 0,
      isliOneBg: 0,
      isliTwo: 0,
      isWorkContentSelectli: 0, //选中路由侧栏样式
      sideLists: [
        {
          name: "企业文化",
          path: "enterpriseformation",
          children: []
        },
        {
          name: "公司制度",
          path: "systemInformation",
          children: [
            {
              name: "列表",
              path: "listinteriorcultivateInformation"
            },
            {
              name: "分类",
              path: "typeinteriorcultivateInformation"
            }
          ]
        },
        {
          name: "培训资料",
          path: "cultivateInformation",
          children: [
            {
              name: "在职",
              path: "interiorcultivateInformation"
            },
            {
              name: "入职",
              path: "externalcultivateInformation"
            }
          ]
        }
      ] // 侧栏路由
    };
  },
  filters: {},
  created: function() {
    var pathStr = this.$route.path;
    var pathOne = pathStr.split("/")[2];
  },
  methods: {
    // 路由点击
    loOneClick(index) {
      this.isliOneBg = index;
      this.isliTwo = index;
      if (this.sideLists[index].children.length == 0) {
        this.$router.push({
          path: "/home/information/" + this.sideLists[index].path
        });
      } else {
        this.$router.push({
          path:
            "/home/information/" +
            this.sideLists[index].path +
            "/" +
            this.sideLists[index].children[0].path
        });
      }
      this.isworkContentTwoLiDv = 0;
    },
    loTwoClick(index) {
      this.isWorkContentSelectli = index;
      this.isworkContentTwoLiDv = index;
      this.$router.push({
        path:
          "/home/information/" +
          this.sideLists[this.isliOneBg].path +
          "/" +
          this.sideLists[this.isliOneBg].children[index].path
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
.workContentOneLiIDv {
  height: 45px;
  line-height: 45px;
  width: 100%;
}

.workContentTwoLiDv {
  width: 100%;
  height: 45px;
  color: #38adff;
}

.workContentOneLi {
  min-height: 45px;
  width: 210px;
  width: 100%;
  cursor: pointer;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.workContentOneLiIDvliOneBg {
  position: relative;
  background-color: #f1f8ff;
}

.workContentOneLiIDvliOneBg::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 3px;
  background-color: #38adff;
  height: 45px;
  content: "";
}

.workContentTwoLi {
  height: 45px;
  width: 210px;
  line-height: 45px;
}

.liTwoUl {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.liTwo {
  width: 210px;
  overflow: hidden;
}

.workContentUL {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
  /* border: 1px solid red; */
}

.workContent-left {
  /* border: 1px solid red; */
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

.information {
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