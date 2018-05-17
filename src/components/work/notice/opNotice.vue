<!--发公告-->
<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="opNotice">
    <div class="opNoticeTop">
      <div>发公告</div>
    </div>
    <div class="opNoticeMain">
      <div class="item">
        <div>发送范围
          <span>*</span>：</div>
        <div>
          <input readonly="readonly" type="text" v-model="userInfoVal" @click="setReceiverClick" :class="{redBorder:isRedReceiveVal,grayBorder:isGrayReceiveVal}"
            placeholder="选择部门、人员">
          <div id="inputTips" :class="{redTest:isRedReceiveVal,grayTest:isGrayReceiveVal}">请选择接收人员</div>
        </div>
      </div>
      <div class="item">
        <div>标题
          <span>*</span>：</div>
        <div>
          <input type="text" v-model="titleVal" :class="{redBorder:isRedTitleVal,grayBorder:isGrayTitleVal}" placeholder="最多35个汉字">
          <div id="inputTips" :class="{redTest:isRedTitleVal,grayTest:isGrayTitleVal}">请输入标题(不能含特殊字符)</div>
        </div>
      </div>
      <div class="item">
        <div>作者
          <span>&nbsp;&nbsp;</span>：</div>
        <div>
          <input type="text" v-model="authorVal" :class="{redBorder:isRedAuthorVal,grayBorder:isGrayAuthorVal}" placeholder="作者">
          <div id="inputTips" :class="{redTest:isRedAuthorVal,grayTest:isGrayAuthorVal}">请输入作者(不能含特殊字符)</div>
        </div>
      </div>
      <div class="item">
        <div>正文
          <span>*</span>：</div>
        <div class="editorBox">
          <div id="editor" tabindex="-1" v-html="inputContentHtml" style="height: 280px;">

          </div>
          <div id="editorTips" :class="{redTest:isRedContentHtmlVal,grayTest:isGrayContentHtmlVal}">正文(不能含特殊字符)</div>
        </div>
      </div>
      <div class="item">
        <div>封面图片
          <span>*</span>：</div>
        <div>
          <img :src="coverImg" alt="">
          <input id="logofile" type="file" style="display: none;" accept="image/jpeg,image/jpg,image/png,image/bmp,image/gif" @change="onFileChange">
          <span id="coverImgTips" :class="{redTest:isRedcoverImgVal,grayTest:isGraycoverImgVal}">图片尺寸为750*300像素,文件类型.jpg,.jpeg,.bmp,.gif,.png,大小不超过5M</span>
          <br>
          <input type="button" value="上传" @click="upload">
        </div>
      </div>
      <div class="button">
        <div @click="sendClick">发送</div>
        <div @click="previewClick">预览</div>
      </div>
    </div>
    <!-- 弹出框选择部门人员组件 -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
import WangEditor from "wangeditor";
const crypto = require("crypto");
export default {
  data() {
    return {
      userInfoVal: "", // 发送范围
      isRedReceiveVal: false,
      isGrayReceiveVal: true,

      isRedContentHtmlVal: "", // 正文
      isGrayContentHtmlVal: "", // 正文

      titleVal: "", // 标题
      isRedTitleVal: false,
      isGrayTitleVal: true,

      authorVal: "", // 作者
      isRedAuthorVal: false,
      isGrayAuthorVal: true,

      editorData: null, //编辑器对象
      inputContentHtml: "", //渲染编辑器html
      contentVal: "", //编辑器html字符串
      inputText: "", //编辑器文本字符串

      isRedcoverImgVal: false,
      isGraycoverImgVal: true,
      coverImg: "/static/img/123.png",

      sendClickTrue: false
    };
  },
  filters: {},
  created: function() {},
  mounted() {
    this.createEditorFun();
  },
  methods: {
    // 发送
    sendClick() {
      var self = this;
      var obj = {
        issueUserId: "1",
        img: self.coverImg,
        name: "阿发",
        title: self.titleVal,
        phone: "13636898665",
        content: self.contentVal,
        cover: self.coverImg,
        userInfo:
          "[{id:'1',img:'http://img.zcool.cn/community/03879005798abdc0000018c1b07f124.jpg',name:'fafa',phone:'13666998989'}]",
        secrecyState: "1",
        dangState: "1"
      };
      if (self.authorVal) {
        obj["author"] = self.authorVal;
      } else {
        obj["author"] = "企业名称";
      }
      var vFunTrue = self.vFun();
      if (vFunTrue == true) {
        if (self.sendClickTrue == false) {
          self.sendClickTrue = true;
          self
            .getapinoticeinsertnoticepage(JSON.stringify(obj))
            .then(data => {
              self.sendClickTrue = false;
              if (data.statusCode == 200) {
                self.contentVal = "";
                self.titleVal = "";
                self.coverImg = "/static/img/123.png";
                self.authorVal = "";
                self.userInfoVal = "";
                self.editor.$txt.html("");
                self.$message({
                  type: "success",
                  message: "发布成功"
                });
              } else {
                self.$message({
                  type: "info",
                  message: data.message
                });
              }
            })
            .catch(msg => {
              self.sendClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      }
    },
    // 验证
    vFun() {
      var self = this;
      // 发送范围验证
      self.userInfoVal = "312312";
      if (self.userInfoVal) {
        if (self.userInfoVal.length > 0) {
          this.isRedReceiveVal = false;
          this.isGrayReceiveVal = true;
        } else {
          this.isRedReceiveVal = true;
          this.isGrayReceiveVal = false;
        }
      } else {
        this.isRedReceiveVal = true;
        this.isGrayReceiveVal = false;
      }

      // 作者验证
      var strReg = new RegExp(/^[\u4e00-\u9fa5]{1,10}$/);
      if (self.authorVal) {
        if (strReg.test(self.authorVal) == false) {
          this.isRedAuthorVal = true;
          this.isGrayAuthorVal = false;
        } else {
          this.isRedAuthorVal = false;
          this.isGrayAuthorVal = true;
        }
      } else {
        this.isRedAuthorVal = false;
        this.isGrayAuthorVal = true;
      }
      // 标题验证
      var strReg = new RegExp(/^[\u4e00-\u9fa5]{1,10}$/);
      if (strReg.test(self.titleVal) == false) {
        this.isRedTitleVal = true;
        this.isGrayTitleVal = false;
      } else {
        this.isRedTitleVal = false;
        this.isGrayTitleVal = true;
      }
      // 正文验证
      if (self.contentVal) {
        if (self.contentVal.length > 0 && self.contentVal.length < 2000) {
          this.isRedContentHtmlVal = false;
          this.isGrayContentHtmlVal = true;
        } else {
          this.isRedContentHtmlVal = true;
          this.isGrayContentHtmlVal = false;
        }
      } else {
        this.isRedContentHtmlVal = true;
        this.isGrayContentHtmlVal = false;
      }
      // 封面图片验证
      if (self.coverImg != "/static/img/123.png") {
        if (self.coverImg.indexOf("http") > -1) {
          this.isRedcoverImgVal = false;
          this.isGraycoverImgVal = true;
        } else {
          this.isRedcoverImgVal = true;
          this.isGraycoverImgVal = false;
        }
      } else {
        this.isRedcoverImgVal = true;
        this.isGraycoverImgVal = false;
      }
      var returnTrue = false;
      if (
        this.isRedcoverImgVal == false &&
        this.isRedContentHtmlVal == false &&
        this.isRedTitleVal == false &&
        this.isRedAuthorVal == false &&
        this.isRedReceiveVal == false
      ) {
        returnTrue = true;
      } else {
        returnTrue = false;
      }
      return returnTrue;
    },
    // 设置接收人
    setReceiverClick() {
      this.selectPopupShow = true;
    },
    // 关闭弹框
    cancelClick() {
      this.selectPopupShow = false;
    },
    // 编辑器
    createEditorFun() {
      const self = this;
      self.editor = new WangEditor("editor");
      self.editorData = self.editor;
      self.editor.config.menus = [
        "lineheight",
        "indent",
        "eraser",
        "forecolor",
        "bgcolor",
        "quote",
        "fontfamily",
        "fontsize",
        "head",
        "unorderlist",
        "orderlist",
        "alignleft",
        "aligncenter",
        "alignright",
        "link",
        "unlink",
        "img",
        "undo",
        "redo"
        // "fullscreen"
      ];
      self.editor.config.menuFixed = false;
      // 上传图片（举例）
      self.editor.config.uploadImgUrl = "/V1.0.0/api/file/uploadWebEditor";
      self.editor.config.uploadParams = {
        appName: "news",
        appId: "news"
      };
      // 设置 headers（举例）
      self.editor.config.uploadHeaders = {
        Accept: "*"
      };
      // 隐藏掉插入网络图片功能。该配置，只有在你正确配置了图片上传功能之后才可用。
      //  editor.config.hideLinkImg = true;
      self.editor.onchange = function() {
        self.contentVal = self.editor.$txt.html();
        self.inputText = self.editor.$txt.text();
        var videos = self.editor.$txt.find("iframe");
        // this.videoLength = videos.length
        if (videos.length > 3) {
          self.videoLength = false;
        } else if (videos.length <= 3) {
          self.videoLength = true;
        }
      };
      self.editor.create();
    },
    // 选择上传图片
    onFileChange(e) {
      var self = this;
      var files = e.target.files || e.dataTransfer.files;
      var fileData = files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        var image = new Image();
        image.onload = function() {
          if (image.width !== 750 || image.height !== 300) {
            self.isRedcoverImgVal = true;
            self.isGraycoverImgVal = false;
          } else if (fileData.size > 5242880) {
            self.isRedcoverImgVal = true;
            self.isGraycoverImgVal = false;
          } else {
            self.isRedcoverImgVal = false;
            self.isGraycoverImgVal = true;
            self.uploadImage(files[0]);
          }
        };
        image.src = data;
      };
      reader.readAsDataURL(fileData);
    },
    // 上传图片
    uploadImage(file) {
      var self = this;
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("appKey", 111111);
      formdata.append("ext", file.name.split(".")[1]);
      formdata.append("fileSize", file.size);
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 16; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      var shaCode = crypto.createHash("md5");
      var md5Str = shaCode
        .update(text, "utf-8")
        .digest("hex")
        .toUpperCase();
      formdata.append("md5", md5Str);
      self
        .getfileuploadPic(formdata)
        .then(data => {
          if (data.statusCode == 200) {
            self.$message({
              message: "上传图片成功",
              type: "success"
            });
            self.coverImg = data.data.url;
            document.getElementById("logofile").value = "";
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
    upload: function() {
      document.getElementById("logofile").click();
    },
    // 预览
    previewClick() {},
    ...mapActions(["getfileuploadPic", "getapinoticeinsertnoticepage"])
  },
  watch: {
    authorVal(val) {
      if (val) {
        var strReg = new RegExp(/^[\u4e00-\u9fa5]{1,10}$/);
        if (strReg.test(val) == false) {
          this.isRedAuthorVal = true;
          this.isGrayAuthorVal = false;
        } else {
          this.isRedAuthorVal = false;
          this.isGrayAuthorVal = true;
        }
      } else {
        this.isRedAuthorVal = false;
        this.isGrayAuthorVal = true;
      }
    },
    titleVal(val) {
      if (val) {
        var strReg = new RegExp(/^[\u4e00-\u9fa5]{1,10}$/);
        if (strReg.test(val) == false) {
          this.isRedTitleVal = true;
          this.isGrayTitleVal = false;
        } else {
          this.isRedTitleVal = false;
          this.isGrayTitleVal = true;
        }
      } else {
        this.isRedTitleVal = false;
        this.isGrayTitleVal = true;
      }
    }
  }
};
</script>
<style scoped>
.opNotice {
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  min-height: 500px;
  padding-bottom: 20px;
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

.opNoticeMain {
  margin-left: 44px;
  width: calc(100% - 88px);
}

.opNoticeMain .item span {
  color: rgb(180, 16, 16);
}

.opNoticeMain .item input {
  width: 240px;
  height: 34px;
  border-radius: 4px;
  padding-left: 20px;
}

.opNoticeMain .item > div:nth-child(1) {
  margin-right: 10px;
}

.opNoticeMain .item:nth-child(2) > div:nth-child(1) {
  margin-left: 28px;
}

.opNoticeMain .item:nth-child(3) > div:nth-child(1) {
  margin-left: 28px;
}

.opNoticeMain .item:nth-child(4) > div:nth-child(1) {
  margin-left: 28px;
}

.opNoticeMain .item:nth-child(4),
.opNoticeMain .item:nth-child(5) {
  align-items: flex-start;
}

.opNoticeMain .item:nth-child(5) {
  margin-top: 24px;
  position: relative;
}

.opNoticeMain .item:nth-child(5) img {
  width: 80px;
  height: 80px;
  border: 1px solid #d9d9d9;
}

.opNoticeMain .item:nth-child(5) input {
  width: 80px;
  height: 30px;
  line-height: 30px;
  background: #38adff;
  font-size: 14px;
  color: #fff;
  position: absolute;
  left: 183px;
  text-align: center;
  padding: 0;
  bottom: 40px;
  cursor: pointer;
}

#coverImgTips {
  /* color: #8f8e94; */
  padding-bottom: 10px !important;
}

.button {
  display: flex;
  justify-content: center;
  margin: 30px auto;
}

.button > div {
  width: 70px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 4px;
  color: #fff;
  margin-right: 50px;
  cursor: pointer;
}

.button > div:nth-child(1) {
  background: #38adff;
}

.button > div:nth-child(2) {
  background: #8e8f94;
}

/* 编译器 */

.editorBox {
  width: 80%;
}

.opNoticeMain .item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 24px;
}

#inputTips {
  display: inline;
  margin-left: 20px;
}

#editorTips {
  margin-top: 10px;
}

/* ***************************************************** */

.centerLeftBotOneI {
  width: 310px;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  color: #000;
}

.selectPopup-but {
  height: 60px;
  width: 100%;
  background-color: #f0f6fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e5e5e5;
}

.selectPopup-but > div:nth-child(2) {
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

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}

.redBorder {
  border: 1px solid #38adff !important;
}

.grayBorder {
  border: 1px solid #d9d9d9 !important;
}

.redTest {
  color: #38adff !important;
}

.grayTest {
  color: #8e8f94 !important;
}

input::-webkit-input-placeholder {
  color: #8e8f94;
  font-size: 13px;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #8e8f94;
  font-size: 13px;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #8e8f94;
  font-size: 13px;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #8e8f94;
  font-size: 13px;
}
</style>