<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="listNotice">
    <div class="main_rightTop">
      <p>历史公告</p>
    </div>
    <div class="main_rightMain">
      <div class="noticNav">
        <span>标题</span>
        <span>状态</span>
      </div>
      <ul>
        <li v-for="(item,index) in dataList" :key="index">
          <p @click="titleClick(index)">{{item.title}}</p>
          <div class="noticLiCenter">
            <div class="biaoti">
              <span class="grayfont">{{item.createTime | timeFun}}</span>
              <span :title="item.author" class="grayfont namespan">{{item.author}}</span>
            </div>
            <div  class="unread grayfont">
              <span v-show='item.notReadNumber != 0'>{{item.readNumber}}人已读</span>
              <span v-show='item.notReadNumber != 0' style="margin-left: 8px;">{{item.notReadNumber}}人未读</span>
              <span v-show="item.notReadNumber == 0">全部人已读</span>
            </div>
          </div>
        </li>
        <!-- 暂无数据 -->
        <div class="noList" v-show="dataList.length == 0">
          <div>
            暂无公告
          </div>
        </div>
      </ul>
      <!-- 底部分页 -->
      <div class="lastLi" v-show="dataList.length > 0">
        <div>
        </div>
        <div>
          <el-pagination @current-change="handleCurrentChange" small layout="prev, pager, next" :total="totalNum">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--公告预览弹出框-->
    <div class="updatePwd" v-show="updatePwdShow">
      <transition name="slide-fade">
        <div class="updatePwd-content" v-show="updatePwdShow">
          <div class="up-content-title">
            <div>
              预览
            </div>
            <div @click="cancelClick">
              X
            </div>
          </div>
          <div class="up-content-main">
            <div>
              <img :src="defaultImg_1" alt="">
            </div>
            <div v-html="content">

            </div>
          </div>
          <div class="up-content-but">
            <div></div>
            <div @click="cancelClick">
              取消
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {
      pageSizeNum: 10,
      currentPage: 1,
      totalNum: 0,
      dataList: [],
      oid: "",
      uid: "",
      updatePwdShow: false, //预览弹框是否显示
      noticeTitle: "", //预览弹框的标题
      author: "", //预览弹框的作者
      defaultImg_1: "/static/img/123.png", //预览弹框的图片
      content: "", //预览弹框的内容
      date: "" //预览弹框的日期
    };
  },
  filters: {
    // 过滤时间
    timeFun: function(val) {
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
        return y + "-" + m + "-" + d + " " + h + ":" + f;
      } else {
        return "暂无";
      }
    }
  },
  created: function() {
    this.getnoticeListFun();
  },
  watch: {},
  methods: {
    // 获取公告列表
    getnoticeListFun() {
      var self = this;
      self
        .getapinoticeselectnoticepage({
          userId: "1",
          pageNo: self.currentPage,
          pageSize: "10"
        })
        .then(data => {
          if (data.statusCode == 200) {
            self.dataList = data.data.page.records;
            self.totalNum = data.data.page.total;
          } else {
            self.$message({
              type: "info",
              message: data.message
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
    // 取消弹框
    cancelClick() {
      this.updatePwdShow = false;
    },
    // 点击公告标题进行预览
    titleClick(index) {
      var self = this;
      self
        .getapinoticeselectnoticedetail({
          id: self.dataList[index].id
        })
        .then(data => {
          if (data.statusCode == 200) {
            self.updatePwdShow = true;
            self.noticeTitle = data.data.title;
            self.author = data.data.author;
            self.date = data.data.createTime;
            self.content = data.data.content;
            if (
              data.data.cover ==
                "https://web.botong.tech/resource/img/notice.png" ||
              data.data.cover == ""
            ) {
              self.defaultImg_1 = "/static/img/123.png";
            } else {
              self.defaultImg_1 = data.data.cover;
            }
          } else {
            self.$message(data.msg);
          }
        })
        .catch(msg => {
          self.$message({
            type: "info",
            message: "服务器异常"
          });
        });
    },
    //分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getnoticeListFun();
    },
    // 置顶
    stick(index) {
      var a = this.dataList[index];
      this.dataList.splice(index, 1);
      this.dataList.unshift(a);
    },
    ...mapActions([
      "getapinoticeselectnoticepage",
      "getapinoticeselectnoticedetail"
    ])
  }
};
</script>
<style scoped>
.noticLiCenter {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin-left: 24px;
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

.up-content-main > div:nth-child(1) {
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 15px;
}

.up-content-main > div:nth-child(2) {
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 15px;
}

.up-content-main > div:nth-child(1) img {
  width: 100%;
}

.up-content-main {
  max-height: 540px;
  min-height: 240px;
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
  min-height: 350px;
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
  opacity: 0;
}

.main_rightTop p {
  color: #303030;
  font-size: 14px;
  padding-top: 24px;
  padding-bottom: 12px;
  margin-left: 44px;
  width: calc(100% - 88px);
  border-bottom: 1px solid #d9d9d9;
}

.main_rightTop {
  width: 100%;
}

.main_rightMain {
  margin-left: 44px;
  width: calc(100% - 88px);
}

.noticNav {
  width: 100%;
  height: 48px;
  line-height: 48px;
  background: #f4f4f6;
  margin-top: 20px;
}

.noticNav span:nth-child(1) {
  float: left;
  margin-left: 24px;
}

.noticNav span:nth-child(2) {
  float: right;
  margin-right: 134px;
}

ul li {
  height: 56px;
  border-bottom: 1px solid #d9d9d9;
}

ul li > p {
  height: 28px;
  line-height: 28px;
  margin-left: 24px;
  cursor: pointer;
}

.biaoti {
  float: left;
}

.biaoti span {
  float: left;
}

.unread {
  margin-right: 110px;
}

.grayfont {
  color: #8f8e94;
}

.borderStyle {
  cursor: pointer;
  font-size: 12px;
  color: #38adff;
  width: 48px;
  display: inline-block;
  border: 1px solid #38adff;
  height: 20px;
  line-height: 20px;
  border-radius: 17px;
  text-align: center;
}

.lastLi {
  height: 60px;
  display: flex;
  justify-content: space-between;
  margin: 35px 0;
}

.noList div {
  color: #ccc;
  text-align: center;
  margin: 50px;
}

/* 公告预览弹框 */

h3 {
  margin: 0;
  font-size: 14px;
}

.Modals {
  background: #fff;
  box-shadow: 0 5px 14px #cccccc;
  width: 640px;
  height: 744px;
}

.modaltitle {
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 16px;
  box-shadow: 0 2px 5px #ccc;
}

.modalcontent {
  padding: 20px 30px 0 30px;
  height: 582px;
  overflow-y: auto;
}

.imgbox {
  width: 100%;
  height: 280px;
}

.imgbox img {
  width: 100%;
  height: 100%;
}

.modalcontent ul li {
  width: 100%;
  border: 1px solid #d9d9d9;
  height: 36px;
  line-height: 36px;
  margin-top: 6px;
  padding-left: 12px;
}

.modalfooter {
  text-align: center;
  margin: 32px;
}

.modalfooter input {
  width: 80px;
  height: 34px;
  line-height: 34px;
  background: #aeaeae;
  font-size: 16px;
  color: #fff;
}

.contentBox {
  margin-top: 24px;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 24px;
  word-break: break-word;
}
.listNotice {
  width: 100%;
  height: 100%;
}
/* ---------------- */

.namespan {
  margin-left: 18px;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>