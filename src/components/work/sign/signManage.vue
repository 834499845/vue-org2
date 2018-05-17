<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="signManage">
    <div class="opNoticeTop">
      <div>日常签到</div>
    </div>
    <div class="signManageSearch">
      <div class="signManageSearchLeft">
        <div class="signManageSearchLeftList">
          <div class="signManageSearchLeftListLeft">
            选择月份：
          </div>
          <div class="signManageSearchLeftListRight">
            <el-date-picker v-model="monthvalue" type="month" placeholder="选择月份" :picker-options="pickerOptions0">
            </el-date-picker>
          </div>
        </div>
        <div class="signManageSearchLeftList">
          <div class="signManageSearchLeftListLeft">
            发送人：
          </div>
          <div class="signManageSearchLeftListRight signManageSearchLeftListRightp">
            选择部门，人员
          </div>
        </div>
      </div>
      <div class="signManageSearchRight">
        <div class="signManageSearchRightSearch" @click="searchClick">
          查询
        </div>
        <div class="signManageSearchRightexport" @click="exportClick">
          导出
        </div>
      </div>
    </div>
    <div class="signManageMain">
      <div class="signManageMainLeft">
        <ul>
          <li class="signManageMainLeftLi" v-for="(item,index) in leftLists" :key="index">
            <div class="signManageMainLiOne">
              {{item.userName}}
            </div>
            <div class="signManageMainLiTwo">
              {{item.deptName}}
            </div>
            <div class="signManageMainLiThr">
              {{item.postName}}
            </div>
          </li>
        </ul>
      </div>
      <div class="signManageMainRight" id="freezing">
        <ul>
          <li class="signManageMainRighttLi" v-for="(item,index) in rightLists" :key="index">
            <div class="signManageMainRighttLiOne" :key="itemArrindex" v-for="(itemArr,itemArrindex) in item.arr">
              <div v-show="index == 0">{{itemArr.signTime | timeFun}}</div>
              <div v-show="index == 0">{{itemArr.signWeek | weekFun}}</div>
              <div @click="signDetailsClick(index,itemArrindex)" :class="{'numSelect':isnumSelect = itemArr.signCount > 0 ? true:false}" v-show="index != 0">{{itemArr.signCount}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="signManagePage">
      <div></div>
      <div>
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" layout="total, prev, pager, next" :page-size="currentpageNum"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
    <!-- 详情 -->
    <div class="updatePwd" v-show="updatePwdShow">
      <transition name="slide-fade">
        <div class="updatePwd-content" v-show="updatePwdShow">
          <div class="up-content-title">
            <div>
              签到详情
            </div>
            <div @click="cancelClick">
              X
            </div>
          </div>
          <div class="up-content-main">
            <ul>
              <li class="signDetailsListsLi" :key="index" v-for="(item,index) in signDetailsLists" v-show="signDetailsLists.length > 0">
                <div class="signDetailsListsTop">
                  <div>发顺丰</div>
                  <div>2018-03-02</div>
                  <div>18:50:06</div>
                </div>
                <div class="signDetailsListsCenter">
                  <div>
                    地点：
                  </div>
                  <div>
                    发的说法骄傲搜附加按实际发神经的佛家神佛撒打飞机发的说法骄傲搜附加按实际发神经
                  </div>
                </div>
                <div class="signDetailsListsCenter">
                  <div>
                    备注：
                  </div>
                  <div>
                    发的说法骄傲搜附加按实际发神经的佛家神佛撒打飞机发的说法骄傲搜附加按实际发神经的佛家神佛撒打飞机发的说法骄傲搜附加按实际发神经的佛家神佛撒打飞机发的说法骄傲搜附加按实际发神经的佛家神佛撒打飞机
                  </div>
                </div>
              </li>
              <li v-show="signDetailsLists.length > 0">
                暂无数据
              </li>
            </ul>
          </div>
          <div class="up-content-but">
            <div></div>
            <div @click="cancelClick">
              确定
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
require("../../../../API/config.js");
import { mapActions } from "vuex";
export default {
  data() {
    return {
      signDetailsLists: [],
      updatePwdShow: false, // 签到详情
      currentPage: 1,
      currentpageNum: 10,
      totalNum: 0,
      pickerOptions0: {
        disabledDate(time) {
          return Date.now() < time.getTime();
        }
      }, // 时间禁止访问
      exportDataClickTrueOrFalse: true, // 导出防重复
      monthvalue: "", // 时间
      navLists: [], // 第一列数据
      rightLists: [], // 左边数据
      leftLists: [], // 右边数据
      dataLists: [] // 总数据
    };
  },
  created: function() {
    this.listFun();
    this.oid = sessionStorage.getItem("orgId");
    this.uid = sessionStorage.getItem("userId");
  },
  methods: {
    // 查看签到详情-取消
    cancelClick() {
      this.updatePwdShow = false;
    },
    // 查看签到详情
    signDetailsClick(index, itemArrindex) {
      var self = this;
      var standardTime = new Date(
        self.rightLists[index].arr[itemArrindex].signTime * 1
      );
      var y, m, d, h, f;
      y = standardTime.getFullYear();
      m = standardTime.getMonth() + 1;
      m = m > 9 ? m : "0" + m;
      d = standardTime.getDate();
      d = d > 9 ? d : "0" + d;
      var timeStr = y + "-" + m + "-" + d;
      var obj = {
        userId: self.rightLists[index].arr[itemArrindex].userId,
        signDate: timeStr
      };
      if (self.rightLists[index].arr[itemArrindex].signCount * 1 > 0) {
        self
          .getsignWebSignDailylist(JSON.stringify(obj))
          .then(data => {
            if (data.statusCode == 200) {
              self.updatePwdShow = true;
              if (data.data) {
                self.signDetailsLists = [];
                data.data.forEach(function(ele, ind) {
                  ele.userId = self.leftLists[index].userName;
                });
                self.signDetailsLists = data.data;
              }
            } else {
              self.$message({
                type: "info",
                message: data.statusMessage
              });
            }
          })
          .catch(msg => {
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      } else {
        self.$message({
          type: "info",
          message: "暂无记录"
        });
      }
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.listFun();
      let free = document.getElementById("freezing");
      free.scrollLeft = 0;
    },
    // 搜索
    searchClick() {
      var self = this;
      self.currentPage = 1;
      var standardTime = new Date(self.monthvalue);
      var y, m, d, h, f;
      y = standardTime.getFullYear();
      m = standardTime.getMonth() + 1;
      m = m > 9 ? m : "0" + m;
      d = standardTime.getDate();
      d = d > 9 ? d : "0" + d;
      var timeStr = y + "-" + m;
      var obj = {
        userIds: "6384240661796753408",
        deptIds: "6383873765272457216",
        signDate: timeStr,
        pageNo: self.currentPage,
        pageSize: self.currentpageNum
      };
      var object = JSON.stringify(obj);

      self
        .getsignWebSignDailyStatistics(object)
        .then(data => {
          if (data.statusCode == 200) {
            self.dataLists = [];
            self.totalNum = data.data.total * 1;
            self.dataLists = data.data.records;
            self.rightLists = [];
            self.leftLists = [];
            self.navLists = [];

            self.dataLists[0].monthList.forEach(function(ele, ind) {
              self.navLists.push({
                signTime: ele.signTime,
                signWeek: ele.signWeek,
                signCount: ele.signCount,
                userId: ele.userId
              });
            });
            self.dataLists.unshift({
              userName: "名称",
              deptName: "部门",
              postName: "职位",
              monthList: []
            });
            self.navLists.forEach(function(ele, ind) {
              self.dataLists[0].monthList.push({
                signTime: ele.signTime,
                signWeek: ele.signWeek,
                signCount: ele.signCount,
                userId: ele.userId
              });
            });
            self.dataLists.forEach(function(ele, ind) {
              self.leftLists.push({
                userName: ele.userName,
                deptName: ele.deptName,
                postName: ele.postName
              });
            });
            self.dataLists.forEach(function(ele, ind) {
              self.rightLists.push({
                arr: ele.monthList
              });
            });
          } else {
            self.$message({
              type: "info",
              message: data.statusMessage
            });
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    // 导出
    exportClick() {
      var self = this;
      if (self.exportDataClickTrueOrFalse == true) {
        self.exportDataClickTrueOrFalse = false;
        var standardTime = new Date(self.monthvalue);
        var y, m, d, h, f;
        y = standardTime.getFullYear();
        m = standardTime.getMonth() + 1;
        m = m > 9 ? m : "0" + m;
        d = standardTime.getDate();
        d = d > 9 ? d : "0" + d;
        var timeStr = y + "-" + m;
        self
          .getsignWebSignDailyExport({
            userIds: "6384240661796753408",
            deptIds: "6383873765272457216",
            signDate: timeStr
          })
          .then(data => {
            self.exportDataClickTrueOrFalse = true;
            if (data.statusCode) {
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            } else {
              window.open(
                "http://192.168.10.65:26140/web/sign/daily/export?userIds=6384240661796753408&deptIds=6383873765272457216&signDate=2018-03"
              );
            }
          })
          .catch(msg => {
            self.exportDataClickTrueOrFalse = true;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    listFun() {
      var self = this;
      this.monthvalue = new Date();
      var standardTime = new Date(self.monthvalue);
      var y, m, d, h, f;
      y = standardTime.getFullYear();
      m = standardTime.getMonth() + 1;
      m = m > 9 ? m : "0" + m;
      d = standardTime.getDate();
      d = d > 9 ? d : "0" + d;
      var timeStr = y + "-" + m;
      var obj = {
        userIds: "6384240661796753408",
        deptIds: "6383873765272457216",
        signDate: timeStr,
        pageNo: self.currentPage,
        pageSize: self.currentpageNum
      };
      var object = JSON.stringify(obj);
      self
        .getsignWebSignDailyStatistics(object)
        .then(data => {
          if (data.statusCode == 200) {
            self.totalNum = data.data.total * 1;
            self.dataLists = data.data.records;
            self.rightLists = [];
            self.leftLists = [];
            self.navLists = [];

            self.dataLists[0].monthList.forEach(function(ele, ind) {
              self.navLists.push({
                signTime: ele.signTime,
                signWeek: ele.signWeek,
                signCount: ele.signCount
              });
            });
            self.dataLists.unshift({
              userName: "名称",
              deptName: "部门",
              postName: "职位",
              monthList: []
            });
            self.navLists.forEach(function(ele, ind) {
              self.dataLists[0].monthList.push({
                signTime: ele.signTime,
                signWeek: ele.signWeek,
                signCount: ele.signCount
              });
            });
            self.dataLists.forEach(function(ele, ind) {
              self.leftLists.push({
                userName: ele.userName,
                deptName: ele.deptName,
                postName: ele.postName
              });
            });
            self.dataLists.forEach(function(ele, ind) {
              self.rightLists.push({
                arr: ele.monthList
              });
            });
          } else {
            self.$message({
              type: "info",
              message: data.statusMessage
            });
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    ...mapActions([
      "getsignWebSignDailylist",
      "getsignWebSignDailyStatistics",
      "getsignWebSignDailyExport"
    ])
  },
  filters: {
    timeFun(val) {
      if (val) {
        var standardTime = new Date(val * 1);
        var y, m, d, h, f;
        y = standardTime.getFullYear();
        m = standardTime.getMonth() + 1;
        m = m > 9 ? m : "0" + m;
        d = standardTime.getDate();
        d = d > 9 ? d : "0" + d;
        h = standardTime.getHours();
        h = h > 9 ? h : "0" + h;
        f = standardTime.getMinutes();
        f = f > 9 ? f : "0" + f;
        return m + "-" + d;
      } else {
        return "暂无";
      }
    },
    typeFun: function(val) {
      if (val == 1) {
        return "部门";
      } else {
        return "人员";
      }
    },
    weekFun(val) {
      if (val == 7) {
        return "日";
      } else if (val == 1) {
        return "一";
      } else if (val == 2) {
        return "二";
      } else if (val == 3) {
        return "三";
      } else if (val == 4) {
        return "四";
      } else if (val == 5) {
        return "五";
      } else if (val == 6) {
        return "六";
      }
    }
  },
  watch: {
    searchsmemVal: function(val) {
      var self = this;
    }
  }
};
</script>
<style scoped>
.signDetailsListsTop {
  width: 100%;
  display: flex;
  font-size: 14px;
  color: #000;
}

.signDetailsListsTop > div:nth-child(1) {
  width: 80px;
}

.signDetailsListsTop > div:nth-child(2) {
  margin-right: 15px;
}

.signDetailsListsCenter {
  width: 100%;
  display: flex;
  margin-top: 10px;
}

.signDetailsListsCenter > div:nth-child(1) {
  width: 80px;
  font-size: 14px;
}

.signDetailsListsCenter > div:nth-child(2) {
  width: 450px;
  min-height: 25px;
}

.signDetailsListsBottom {
  width: 100%;
  border: 1px solid red;
  display: flex;
}

.signDetailsListsLi {
  width: 540px;
  min-height: 70px;
  margin: 0 auto;
  margin-top: 7px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.signManagePage > div:nth-child(2) {
  margin-right: 45px;
}

.signManagePage {
  height: 30px;
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.signManageSearchRightSearch {
  width: 70px;
  height: 35px;
  cursor: pointer;
  border-radius: 3px;
  background-color: #288df0;
  text-align: center;
  line-height: 35px;
  color: #fff;
  margin-right: 15px;
}

.signManageSearchRightexport {
  width: 70px;
  cursor: pointer;
  height: 35px;
  border-radius: 3px;
  background-color: #288df0;
  text-align: center;
  line-height: 35px;
  color: #fff;
}

.signManageSearchLeftListLeft {
  width: 80px;
  height: 28px;
  line-height: 28px;
  text-align: right;
}

.signManageSearchLeftListRightp {
  padding-left: 5px;
  border: 1px solid #38adff;
}

.signManageSearchLeftListRight {
  width: 150px;
  height: 28px;
  border-radius: 4px;
  line-height: 28px;
}

.signManageSearchLeftList {
  display: flex;
  margin-left: 35px;
  margin-top: 10px;
}

.signManageSearchRight {
  display: flex;
  margin-right: 45px;
  margin-top: 10px;
}

.signManageSearchLeft {
  display: flex;
}

.signManageSearch {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.signManageMainRighttLiOne > div:nth-child(1) {
  width: 100%;
  height: 20px;
  overflow: hidden;
  text-align: center;
  margin-top: 5px;
  font-size: 14px;
}

.signManageMainRighttLiOne > div:nth-child(2) {
  width: 100%;
  height: 20px;
  overflow: hidden;
  margin-top: 1px;
  text-align: center;
  font-size: 14px;
}

.signManageMainRighttLiOne > div:nth-child(3) {
  overflow: hidden;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}

.signManageMainRighttLiOneNum {
  overflow: hidden;
  text-align: center;
  line-height: 50px;
}

.signManageMainRighttNavLi {
  width: 50px;
  float: left;
}

.signManageMainRighttLi {
  display: flex;
  /* align-items: center; */
  height: 50px;
  width: 100%;
}
.numSelect {
  color: #38adff !important;
}
.signManageMainRight {
  width: 600px;
  overflow-y: hidden;
  overflow-x: scroll;
  /* box-sizing: border-box; */
}

.signManageMainLeft {
  width: 300px;
}

.signManageMainRighttLi > div {
  min-width: 50px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  height: 50px;
  /* float: left; */
}

.signManageMainLeftLi > div:nth-child(1),
.signManageMainRighttLi > div:nth-child(1) {
  border-left: 0;
}

.signManageMainRighttLi:nth-child(1) > div {
  /* border-top: 1px solid #ccc; */
  position: relative;
}

.signManageMainRighttLi:nth-child(1) > div::after {
  position: absolute;
  top: 0;
  width: 100%;
  /* height: 1px; */
  background-color: #ccc;
  content: "";
  left: 0;
}

.signManageMainLeftLi:nth-last-child(1) > div {
  position: relative;
  border-bottom: 0;
}

.signManageMainLeftLi:nth-last-child(1) > div::after {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  content: "";
  left: 0;
}

.signManageMainRighttLi:nth-last-child(1) > div {
  position: relative;
  border-bottom: 0;
}

.signManageMainRighttLi:nth-last-child(1) > div::after {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  content: "";
  left: 0;
}

.signManageMainLeftLi:nth-child(1) > div {
  position: relative;
}

.signManageMainLeftLi:nth-child(1) > div::after {
  position: absolute;
  top: 0;
  width: 100%;
  /* height: 1px; */
  background-color: #ccc;
  content: "";
  left: 0;
}

.signManageMainLeftLi > div {
  border-left: 1px solid #ccc;
  height: 50px;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
}

.signManageMainLeftLi {
  display: flex;
  align-items: center;
  height: 50px;
}

.signManageMainLeft ul {
  width: 300px;
  overflow: hidden;
  min-height: 520px;
  /* border-left: 1px solid #ccc; */
  border-right: 1px solid #ccc;
}

.signManageMainLiThr {
  width: 100px;
  overflow: hidden;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}

.signManageMainLiTwo {
  width: 100px;
  overflow: hidden;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 50px;
  text-align: center;
}

.signManageMainLiOne {
  width: 100px;
  overflow: hidden;
  line-height: 50px;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.signManageMain {
  min-height: 520px;
  width: 900px;
  margin: 0 auto;
  display: flex;
  margin-top: 10px;
  border: 1px solid #ccc;
}

.signManage {
  width: 100%;
  min-height: 600px;
  margin-bottom: 40px;
}
.opNoticeTop div {
  color: #303030;
  font-size: 14px;
  padding-top: 24px;
  padding-bottom: 12px;
  margin-left: 44px;
  width: calc(100% - 88px);
  border-bottom: 1px solid #d9d9d9;
}

.opNoticeTop {
  width: 100%;
}
.up-content-main {
  height: 440px;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  border-top: 1px solid #e5e5e5;
}

.up-content-title > div:nth-child(1) {
  margin-left: 15px;
}

.up-content-title > div:nth-child(2) {
  margin-right: 15px;
  font-size: 16px;
  color: #ccc;
  cursor: pointer;
}

.up-content-title {
  height: 52px;
  width: 100%;
  background-color: #f0f6fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.updatePwd-content {
  width: 600px;
  height: 550px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 70px;
}

.updatePwd {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0.7;
}

.up-content-but {
  height: 60px;
  width: 100%;
  background-color: #f0f6fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e5e5e5;
}

.up-content-but > div:nth-child(2) {
  width: 55px;
  height: 35px;
  border-radius: 4px;
  background-color: #38adff;
  text-align: center;
  line-height: 35px;
  color: #fff;
  margin-right: 25px;
  cursor: pointer;
}
</style>