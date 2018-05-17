<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="signSetting">
    <div class="opNoticeTop">
      <div>签到设置</div>
    </div>
    <div class="signSettingAdd">
      <div class="signSettingAddLeft">
        位置定位：
      </div>
      <div class="signSettingAddRight">
        <input type="text" placeholder="请输入位置，进行定位" v-model="positionVal">
      </div>
      <div class="positionsignSettingAddRight" @click="positionValClick">
        定位 
      </div>
      <small>拖动地图可以进行选择位置，水滴所指为选中位置</small>
    </div>
    <div class="signSettingAdd">
      <div class="signSettingAddLeft">
        签到范围：
      </div>
      <div class="signSettingAddRight">
          <select @change="distanceValClick" v-model="distanceVal">
            <option v-for="(type,index) in distances" v-bind:value="type" :key="index">{{type}}</option>
          </select>
      </div>
    </div>
    <div class="contirm" id="container">

    </div>
    <div class="signSettingBut">
      <div @click="addClick">保存</div>
      <div @click="cancelClick">取消</div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      geocoder: "",
      addClickTrue: false,
      positionVal: "", // 地图定位输入
      map: "",
      marker: "",
      O: "",
      P: "",
      opLists: [1, 1],
      zoomVal: 20,
      distanceVal: 100, // 距离选中
      distances: [100, 500, 1000] // 距离选择
    };
  },
  mounted() {
    this.listFun();
  },
  created: function() {},
  methods: {
    // 确认取消
    cancelClick() {},
    // 确认添加
    addClick() {
      var self = this;
      if (self.addClickTrue == false) {
        self.addClickTrue = true;
        if (self.positionVal.length > 0) {
          var obj = {
            distance: self.distanceVal,
            orgId: sessionStorage.getItem("oidItem"),
            lng: self.P,
            lat: self.O,
            adress: self.positionVal
          };
          self
            .getsignWebSignOutsetting(JSON.stringify(obj))
            .then(data => {
              self.addClickTrue = false;
              if (data.statusCode == 200) {
                self.$message({
                  type: "success",
                  message: "添加位置成功"
                });
                this.$router.push({
                  path: "/home/sign/signSetting"
                });
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
        } else {
          self.$message({
            type: "info",
            message: "请输入或者选择位置"
          });
        }
      }
    },
    // 定位
    positionValClick() {
      var self = this;
      self.geocoder.getLocation(self.positionVal, function(status, result) {
        if (status === "complete" && result.info === "OK") {
          self.map.setCenter([
            result.geocodes[0].location.O,
            result.geocodes[0].location.P
          ]);
          self.circle.setCenter([
            result.geocodes[0].location.O,
            result.geocodes[0].location.P
          ]);
        } else {
          //获取经纬度失败
        }
      });
    },
    // 选择范围
    distanceValClick() {
      var self = this;
      if (this.distanceVal == 100) {
        this.zoomVal = 20;
      } else if (this.distanceVal == 500) {
        this.zoomVal = 15;
      } else if (this.distanceVal == 1000) {
        this.zoomVal = 14;
      }
      self.circle.setRadius(self.distanceVal);
      self.map.setZoom(self.zoomVal);
    },
    listFun() {
      var self = this;
      self.distanceVal = self.$route.query.distance;
      if (self.distanceVal == 100) {
        self.zoomVal = 20;
      } else if (self.distanceVal == 500) {
        self.zoomVal = 15;
      } else if (self.distanceVal == 1000) {
        self.zoomVal = 14;
      }
      if (self.$route.query.lat) {
        self.O = self.$route.query.lat * 1;
        self.P = self.$route.query.lng * 1;
      } else {
        self.O = self.$route.query.lat * 1;
        self.P = self.$route.query.lng * 1;
      }
      AMapUI.loadUI(["misc/PositionPicker"], function(PositionPicker) {
        self.map = new AMap.Map("container", {
          zoom: self.zoomVal,
          center: [self.P, self.O]
        });
        var positionPicker = new PositionPicker({
          mode: "dragMap", // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: self.map // 依赖地图对象
        });
        positionPicker.on("success", function(positionResult) {
          self.positionVal = positionResult.address;
          console.log(positionResult.position.P, positionResult.position.O);
          self.circle.setCenter([
            positionResult.position.O,
            positionResult.position.P
          ]);
          self.P = positionResult.position.O;
          self.O = positionResult.position.P;
        });
        positionPicker.start();
        self.map.panBy(0, 1);
        self.circle = new AMap.Circle({
          center: [self.P, self.O],
          radius: self.distanceVal,
          fillOpacity: 0.2,
          strokeWeight: 1,
          fillColor: "#4390E1",
          strokeColor: "#4390E1"
        });
        self.circle.setMap(self.map);
        self.map.plugin(["AMap.Geocoder"], function() {
          self.map.addControl(new AMap.Geocoder());
        });
        self.geocoder = new AMap.Geocoder({});
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
  watch: {}
};
</script>
<style scoped>
.contirm {
  width: 800px;
  height: 400px;
  border: 1px solid #ccc;
  margin-left: 44px;
  margin-top: 15px;
}
.positionsignSettingAddRight {
  height: 34px;
  width: 100px;
  background-color: #38adff;
  cursor: pointer;
  border-radius: 5px;
  line-height: 34px;
  text-align: center;
  color: #fff;
}
.signSettingAddRight {
  margin-left: 15px;
  margin-right: 15px;
}
.signSettingAddLeft {
  margin-left: 44px;
}
.signSettingAdd small {
  font-size: 12px;
  color: #333;
  margin-left: 5px;
}
.signSettingAdd input {
  width: 350px;
  height: 32px;
  padding-left: 7px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.signSettingAdd select {
  width: 250px;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.signSettingAdd {
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
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

.signSettingBut > div {
  height: 34px;
  width: 100px;
  background-color: #38adff;
  cursor: pointer;
  border-radius: 5px;
  line-height: 34px;
  text-align: center;
  color: #fff;
  margin-left: 44px;
}
.signSettingBut > div:nth-child(2) {
  background-color: #ccc;
}
.signSettingBut {
  width: 100%;
  height: 35px;
  margin-bottom: 50px;
  margin-top: 30px !important;
  display: flex;
}

.signSetting {
  width: 100%;
  min-height: 500px;
}
</style>