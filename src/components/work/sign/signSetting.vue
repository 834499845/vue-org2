<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="signSetting">
    <div class="opNoticeTop">
      <div>签到设置</div>
    </div>
    <div class="signSettingTop">
      <div class="signSettingTop-left">
        签到设置：
      </div>
      <div class="signSettingTop-right">
        <div class="signSettingTopRtop">
          以下方式满足一项，考勤组成员即可完成考勤。
        </div>
        <div class="signSettingTopRbot">
          <ul>
            <!-- v-for="(item,index) in lists" :key="index"  -->
            <li class="signSettingTopRbotListLi">
              <div>{{setObj.adress}}</div>
              <div>{{setObj.distance}}米</div>
              <div class="signSettingTopRbotListLiOp">
                <div @click="updateClick()">编辑</div>
                <!-- <div @click="deleteClick()">删除</div> -->
              </div>
            </li>
            <li class="signSettingTopRbotAddLi" v-show="!setObj.distance">
              <div @click="addLocationClick">
                添加
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="signSettingBot">
      <div class="signSettingBot-left">
        时间设置：
      </div>
      <div class="signSettingBot-right">
        <div class="signSettingBotRTop">
          <div class="signSettingBotRTopOne">
            <div>
              <img v-show="outShow" @click="ourShowClick(1)" src="/static/img/out@2x.png" alt="">
              <img v-show="!outShow" @click="ourShowClick(1)" src="/static/img/on@2x.png" alt="">
            </div>
            <div>
              不限时间
            </div>
          </div>
          <div class="signSettingBotRTopOne">
            <div>
              <img v-show="!outShow" @click="ourShowClick(2)" src="/static/img/out@2x.png" alt="">
              <img v-show="outShow" @click="ourShowClick(2)" src="/static/img/on@2x.png" alt="">
            </div>
            <div>
              固定时间
            </div>
          </div>
        </div>
        <div class="signSettingBotRcenter" v-show="outShow">
          <div>
            <el-time-select placeholder="起始时间" @change="changeStartTimeClick" v-model="advStartTime" :picker-options="{
              start: '06:00',
              step: '00:10',
              end: '23:00'
            }">
            </el-time-select>
          </div>
          <div>
            <el-time-select placeholder="结束时间" @change="changeEndTimeClick" v-model="advEndTime" :picker-options="{
              start: '06:00',
              step: '00:10',
              end: '23:00'
            }">
            </el-time-select>
          </div>
        </div>
        <div class="signSettingBotRbot">
          时间范围内显示打卡异常
        </div>
      </div>
    </div>
    <div class="signSettingBut">
      <div @click="addClick">保存</div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      timeTrue: false,
      advStartTime: "", // 开始时间
      advEndTime: "", // 结束时间
      outShow: false,
      lists: [{ name: "11", num: 500 }, { name: "11", num: 500 }],
      setObj: {},
      addClickTrue: false
    };
  },
  mounted() {},
  created: function() {
    this.listFun();
  },
  methods: {
    changeEndTimeClick() {
      if (this.advEndTime && this.advStartTime) {
        var advEndTimedate = new Date(
          "2018-04-23 " + this.advEndTime + ":00:000"
        );
        var advStartTimedate = new Date(
          "2018-04-23 " + this.advStartTime + ":00:000"
        );
        var advEndTimedateUnit = advEndTimedate.getTime();
        var advStartTimedateUnit = advStartTimedate.getTime();
        if (advStartTimedateUnit > advEndTimedateUnit) {
          this.timeTrue = false;
        } else {
          this.timeTrue = true;
        }
      } else {
        this.timeTrue = false;
      }
    },
    changeStartTimeClick() {
      if (this.advStartTime && this.advEndTime) {
        var advEndTimedate = new Date(
          "2018-04-23 " + this.advEndTime + ":00:000"
        );
        var advStartTimedate = new Date(
          "2018-04-23 " + this.advStartTime + ":00:000"
        );
        var advEndTimedateUnit = advEndTimedate.getTime();
        var advStartTimedateUnit = advStartTimedate.getTime();
        if (advStartTimedateUnit > advEndTimedateUnit) {
          this.timeTrue = false;
        } else {
          this.timeTrue = true;
        }
      } else {
        this.timeTrue = false;
      }
    },
    // 确认添加
    addClick() {
      var self = this;
      if (self.setObj.lat) {
        if (self.addClickTrue == false) {
          self.addClickTrue = true;
          var obj = {};
          if (self.outShow == true) {
            if (self.timeTrue == false) {
              self.$message({
                type: "info",
                message: "开始时间小于结束时间"
              });
              self.addClickTrue = false;
            } else {
              obj = {
                distance: self.setObj.distance,
                orgId: sessionStorage.getItem("oidItem"),
                lng: self.setObj.lng,
                lat: self.setObj.lat,
                adress: self.setObj.adress,
                timeStatus: 1,
                startTime: self.advStartTime,
                endTime: self.advEndTime
              };
              self
                .getsignWebSignOutsetting(JSON.stringify(obj))
                .then(data => {
                  self.addClickTrue = false;
                  if (data.statusCode == 200) {
                    self.$message({
                      type: "success",
                      message: "设置成功"
                    });
                    self.listFun();
                  } else {
                    self.$message({
                      type: "info",
                      message: data.statusMessage
                    });
                  }
                })
                .catch(msg => {
                  self.addClickTrue = false;
                  self.$message({
                    type: "info",
                    message: "服务器异常"
                  });
                });
            }
          } else {
            obj = {
              distance: self.setObj.distance,
              orgId: sessionStorage.getItem("oidItem"),
              lng: self.setObj.lng,
              lat: self.setObj.lat,
              adress: self.setObj.adress,
              timeStatus: 0
            };
            self
              .getsignWebSignOutsetting(JSON.stringify(obj))
              .then(data => {
                self.addClickTrue = false;
                if (data.statusCode == 200) {
                  self.$message({
                    type: "success",
                    message: "设置成功"
                  });
                  self.listFun();
                } else {
                  self.$message({
                    type: "info",
                    message: data.statusMessage
                  });
                }
              })
              .catch(msg => {
                self.addClickTrue = false;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          }
        }
      } else {
        self.$message({
          type: "info",
          message: "请添加地址"
        });
      }
    },
    // 时间选择
    ourShowClick(index) {
      if (index == 2) {
        this.outShow = true;
      } else {
        this.outShow = false;
        // this.advEndTime = ''
        // this.advStartTime = ''
      }
    },
    // 删除
    deleteClick() {},
    // 编辑
    updateClick() {
      var self = this;
      this.$router.push({
        path: "/home/sign/signAddSetting",
        query: {
          lat: this.setObj.lat,
          lng: this.setObj.lng,
          distance: this.setObj.distance
        }
      });
    },
    addLocationClick() {
      this.$router.push({
        path: "/home/sign/signAddSetting"
      });
    },
    // 初始化数据
    listFun() {
      var self = this;
      self.advEndTime = "";
      self.advStartTime = "";
      self
        .getsignWebSignOutgetsetting({
          orgId: sessionStorage.getItem("oidItem")
        })
        .then(data => {
          if (data.statusCode == 200) {
            self.setObj = data.data;
            self.advStartTime = self.setObj.startTime;
            self.advEndTime = self.setObj.endTime;
            if (self.setObj.timeStatus == 1) {
              self.outShow = true;
            } else {
              self.outShow = false;
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
    },
    ...mapActions(["getsignWebSignOutsetting", "getsignWebSignOutgetsetting"])
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
.signSettingBut > div {
  height: 34px;
  width: 100px;
  background-color: #38adff;
  cursor: pointer;
  border-radius: 5px;
  line-height: 34px;
  text-align: center;
  margin: 0 auto;
  color: #fff;
}

.signSettingBut {
  width: 100%;
  height: 35px;
  margin-bottom: 50px;
  margin-top: 30px !important;
}

.signSettingBotRTopOne {
  display: flex;
  margin-right: 20px;
  align-items: center;
  height: 35px;
  font-size: 14px;
  color: #000;
}

.signSettingBotRTopOne img {
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin-right: 10px;
}

.signSettingBotRTop {
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
}

.signSettingBotRcenter > div {
  margin-right: 15px;
}

.signSettingBotRcenter {
  width: 100%;
  width: 100%;
  height: 35px;
  margin-top: 15px;
  display: flex;
  align-items: center;
}

.signSettingBotRbot {
  font-size: 14px;
  margin-top: 15px;
  color: #ccc;
  width: 100%;
}

.signSettingTopRbotListLiOp > div {
  cursor: pointer;
}

.signSettingTopRbotListLiOp {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.signSettingTopRbotListLi > div:nth-child(1) {
  width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.signSettingTopRbotListLi > div:nth-child(2) {
  width: 80px;
  border-left: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.signSettingTopRbotListLi > div:nth-child(3) {
  width: 120px;
  border-left: 1px solid #ccc;
}

.signSettingTopRbotListLi {
  display: flex;
  align-items: center;
  min-height: 35px;
}

.signSettingTopRbotAddLi > div {
  width: 55px;
  height: 35px;
  border-radius: 4px;
  background-color: #38adff;
  text-align: center;
  line-height: 35px;
  color: #fff;
  margin-right: 25px;
  cursor: pointer;
  border-top: 1px solid #ccc;
}

.signSettingTopRbotAddLi {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 65px;
}

.signSettingTopRbot {
  width: 680px;
  border: 1px solid #ccc;
  margin-top: 15px;
}

.signSettingTopRtop {
  font-size: 14px;
  color: #ccc;
}

.signSettingTop-right {
  width: 680px;
  margin-left: 10px;
}

.signSettingBot-right {
  width: 680px;
  margin-left: 10px;
}

.signSettingTop-left,
.signSettingBot-left {
  width: 100px;
  font-size: 14px;
  color: #000;
  line-height: 25px;
  text-align: right;
  margin-left: 16px;
}

.signSettingBot {
  height: 150px;
  width: 100%;
  display: flex;
  margin-top: 15px;
}

.signSettingTop {
  min-height: 150px;
  display: flex;
  width: 100%;
  margin-top: 15px;
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

.signSetting {
  width: 100%;
  min-height: 500px;
}
</style>