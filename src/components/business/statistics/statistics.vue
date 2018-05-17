// 员工数据
<template>
    <div class="statistics">
      <div class="install-title">
          <div>
            员工数据
          </div>
      </div>
      <div class="install-main">
        <div class="statistics-top">
          <div class="statisticsData statisticsData-one">
            <div class="statisticsData-top">
              当前企业人数
            </div>
            <div class="statisticsData-one-bot">
              3
            </div>
          </div>
          <div class="statisticsData statisticsData-two">
            <div class="statisticsData-top">
              员工激活情况
            </div>
            <div class="ssd-t-list">
              <div class="ssd-t-l-li">
                <div>
                  已激活
                </div>
                <div class="li-grop">
                  1
                </div>
              </div>
              <div class="ssd-t-l-li">
                <div>
                  未激活
                </div>
                <div class="li-red">
                  2
                </div>
              </div>
            </div>
            <div class="ssd-t-but">
              查看未激活人员
            </div>
          </div>
          <div class="statisticsData statisticsData-thr">
            <div class="statisticsData-top">
              员工离职情况
            </div>
            <div class="ssd-t-list">
              <div class="ssd-t-l-li">
                <div>
                  目前累计离职人数
                </div>
                <div class="li-red">
                  2
                </div>
              </div>
            </div>
            <div class="ssd-t-but">
              查看离职人员
            </div>
          </div>
        </div>
        <div class="statistics-bottom">
          <div class="ss-b-title">
            企业每日分析 <small>(截止昨日)</small>
          </div>
          <div class="ss-b-number">
            伯通使用人数
          </div>
          <div id="map" class="ss-b-map">

          </div>
        </div>
      </div>
    </div>
</template>
<script>
let echarts = require("echarts");
import { mapActions } from "vuex";
export default {
  data() {
    return {
      echartNums: [120, 132, 101, 134, 90, 230, 210], //图标对应数据
      echartDate: [
        "2017-06-06",
        "2017-06-07",
        "2017-06-08",
        "2017-06-09",
        "2017-06-10",
        "2017-06-11",
        "2017-06-12"
      ] // 图标对应日期
    };
  },
  filters: {},
  created: function() {},
  watch: {},
  methods: {
    ...mapActions([])
  },
  mounted() {
    var self = this;
    var map = echarts.init(document.getElementById("map"));
    map.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      grid: {
        left: "3%",
        right: "5%",
        bottom: "3%",
        top: "2%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: self.echartDate
        }
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            lineStyle: {
              width: 1,
              color: "#979797",
              type: "dotted"
            }
          }
        }
      ],
      series: [
        {
          symbolSize: 10,
          type: "line",
          smooth: true,
          stack: "总量",
          itemStyle: {
            normal: {
              color: "#38adff",
              lineStyle: {
                width: 4,
                color: "#38adff"
              }
            }
          },
          data: self.echartNums
        }
      ]
    });
  }
};
</script>
<style scoped>
.ss-b-map {
  height: 280px;
  width: 690px;
  margin-top: 30px;
}
.ss-b-number {
  height: 43px;
  width: 95%;
  font-size: 12px;
  line-height: 43px;
  color: #000;
  text-align: center;
  margin-top: 35px;
}
.ss-b-title {
  height: 43px;
  width: 95%;
  font-size: 18px;
  border-bottom: 1px solid #ccc;
  line-height: 43px;
  color: #333;
}
.ss-b-title small {
  font-size: 18px;
  color: #777;
}
.statistics-bottom {
  height: 500px;
  width: 100%;
  margin-top: 35px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
}
.li-grop {
  color: #3c763d;
}
.li-red {
  color: #a94442;
}
.ssd-t-l-li {
  height: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  overflow: hidden;
  justify-content: space-around;
}
.ssd-t-but {
  height: 33px;
  width: 120px;
  border-radius: 5px;
  background-color: #38adff;
  font-size: 14px;
  color: #fff;
  line-height: 33px;
  text-align: center;
  cursor: pointer;
  margin-top: 25px;
}
.ssd-t-list {
  height: 75px;
  width: 100%;
  margin-top: 20px;
  overflow: hidden;
}
.statisticsData-one-bot {
  height: 180px;
  line-height: 180px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: #000;
}
.statisticsData-top {
  width: 100%;
  height: 40px;
  background-color: #fbfbfb;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #dfdfdf;
}
.statistics-top {
  width: 95%;
  display: flex;
  height: 220px;
  margin-top: 30px;
}
.statisticsData-one {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.statisticsData-two,
.statisticsData-thr {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}
.statisticsData {
  width: 240px;
  height: 220px;
  border-radius: 5px;
  border: 1px solid #dfdfdf;
  margin-right: 30px;
}

.install-main {
  min-height: 70px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.install-title {
  height: 45px;
  margin-top: 20px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.install-title > div {
  width: 95%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
}

.statistics {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  min-height: 700px;
}
</style>