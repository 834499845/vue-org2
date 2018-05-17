<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="set" v-on:mouseup="moveend" v-on:mousemove="move">
        <div class="wf-mainTop">
            <div>返回</div>
            <div>审批表单设计</div>
            <div></div>
        </div>
        <div class="wf-main">
            <!-- <headeractions></headeractions> -->
            <mainleft></mainleft>   <!--左边 -->
            <formcanvas></formcanvas>   <!--中间 -->
            <setting></setting> <!--左边 -->
            <div class="saveBut" @click="save()">保存</div>
        </div>
        <dragging></dragging>
    </div>
</template>
<script>
import { mapActions } from "vuex";
// import Headeractions from './headActions'
import mainleft from "./mainLeft";
import formcanvas from "./formcanvas";
import setting from "./setting";
import dragging from "./dragging";
export default {
  name: "set",
  components: {
    // Headeractions,
    mainleft,
    formcanvas,
    setting,
    dragging
  },
  data: function() {
    return {
      isstart: false,
      componentView: {},
      saveComponent: [],
      childrenArr: []
    };
  },
  methods: {
    //鼠标移动时
    move: function(e) {
      if (this.isstart) {
        document.querySelector("html").classList.add("wf-cursor-move");
        let obj = {
          componentName: this.componentView.componentName,
          clientX: e.clientX,
          clientY: e.clientY
        };
        drag.$emit("moveInCanvas", obj);
        drag.$emit("move", e);
      }
    },
    //鼠标松开时
    moveend: function(e) {
      if (this.isstart) {
        let obj = {
          componentView: this.componentView
        };
        drag.$emit("moveend", obj);
        this.isstart = false;
      }
    },
    //保存
    save() {
      drag.$emit("save");
      let self = this;
      if (sessionStorage.getItem("approvalTitle") == "") {
        this.$message({
          type: "info",
          message: "请填写审批名称！"
        });
        return;
      }
      if (JSON.parse(sessionStorage.getItem("newsss")) == null) {
        let component = JSON.parse(sessionStorage.getItem("obj"));
        let modelName = component.modelName;
        let introduce = component.introduce;
        let items = component.items;
        if (items == "") {
          this.$message({
            type: "info",
            message: "请创建您的表单！"
          });
          return;
        }
        for (let i = 0; i < items.length; i++) {
          if (items[i].componentName == "textareafield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 1,
              label: items[i].defaultLable,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint
            });
          } else if (items[i].componentName == "numberfield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            if (items[i].defaultSync == true) {
              items[i].defaultSync = 1;
            } else {
              items[i].defaultSync = 0;
            }
            self.saveComponent.push({
              type: 2,
              label: items[i].defaultLable,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint,
              judge: items[i].defaultSync
            });
          } else if (items[i].componentName == "ddselectfield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            if (items[i].defaultSync == true) {
              items[i].defaultSync = 1;
            } else {
              items[i].defaultSync = 0;
            }
            let optionString = items[i].defaultOptions;
            let stringArr = [];
            for (let j = 0; j < optionString.length; j++) {
              stringArr.push(optionString[j].text);
            }
            let stringsa = stringArr.toString(",");
            self.saveComponent.push({
              type: 3,
              label: items[i].defaultLable,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint,
              option: stringsa,
              judge: items[i].defaultSync
            });
          } else if (items[i].componentName == "dddatefield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 4,
              label: items[i].defaultLable,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint,
              format: items[i].defaultFormat
            });
          } else if (items[i].componentName == "dddaterangefield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 5,
              label: "日期区间",
              option: items[i].defaultLable + "," + items[i].defaultLable2,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint,
              format: items[i].defaultFormat
            });
          } else if (items[i].componentName == "textfield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 6,
              label: items[i].defaultLable,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint
            });
          } else if (items[i].componentName == "textnote") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 8,
              label: items[i].defaultLable,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint
              // 链接：items[i].defaultHref,
            });
          } else if (items[i].componentName == "moneyfield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 9,
              label: items[i].defaultLable,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint
            });
          } else if (items[i].componentName == "ddattachment") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 11,
              label: items[i].defaultLable,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint
            });
          } else if (items[i].componentName == "ddphotofield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 12,
              label: items[i].defaultLable,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint
            });
          } else if (items[i].componentName == "tablefield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            if (items[i].components.length > 0) {
              let chilComponents = items[i].components;
              for (let m = 0; m < chilComponents.length; m++) {
                if (chilComponents[m].componentName == "textareafield") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 1,
                    label: chilComponents[m].defaultLable,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint
                  });
                } else if (chilComponents[m].componentName == "numberfield") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  if (chilComponents[m].defaultSync == true) {
                    chilComponents[m].defaultSync = 1;
                  } else {
                    chilComponents[m].defaultSync = 0;
                  }
                  self.childrenArr.push({
                    type: 2,
                    label: chilComponents[m].defaultLable,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint
                    // judge:chilComponents[m].defaultSync
                  });
                } else if (chilComponents[m].componentName == "ddselectfield") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  if (chilComponents[m].defaultSync == true) {
                    chilComponents[m].defaultSync = 1;
                  } else {
                    chilComponents[m].defaultSync = 0;
                  }
                  let optionString = chilComponents[m].defaultOptions;
                  let stringArr = [];
                  for (let j = 0; j < optionString.length; j++) {
                    stringArr.push(optionString[j].text);
                  }
                  let stringsa = stringArr.toString(",");
                  self.childrenArr.push({
                    type: 3,
                    label: chilComponents[m].defaultLable,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint,
                    option: stringsa
                    // judge:chilComponents[m].defaultSync
                  });
                } else if (chilComponents[m].componentName == "dddatefield") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 4,
                    label: chilComponents[m].defaultLable,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint,
                    format: chilComponents[m].defaultFormat
                  });
                } else if (
                  chilComponents[m].componentName == "dddaterangefield"
                ) {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 5,
                    label: "日期区间",
                    option:
                      chilComponents[m].defaultLable +
                      "," +
                      chilComponents[m].defaultLable2,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint,
                    format: chilComponents[m].defaultFormat
                  });
                } else if (chilComponents[m].componentName == "textfield") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 6,
                    label: chilComponents[m].defaultLable,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint
                  });
                } else if (chilComponents[m].componentName == "textnote") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 8,
                    label: chilComponents[m].defaultLable,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint
                    // 链接：items[i].defaultHref,
                  });
                } else if (chilComponents[m].componentName == "moneyfield") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 9,
                    label: chilComponents[m].defaultLable,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint
                  });
                } else if (chilComponents[m].componentName == "ddattachment") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 11,
                    label: chilComponents[m].defaultLable,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint
                  });
                } else if (chilComponents[m].componentName == "ddphotofield") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 12,
                    label: chilComponents[m].defaultLable,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint
                  });
                }
                self.saveComponent.push({
                  type: 7,
                  child: self.childrenArr,
                  label: items[i].defaultLable,
                  display: items[i].defaultPrint,
                  help: items[i].defaultAction
                });
              }
            } else {
              self.$message("请添加控件到明细中!");
              return;
            }
          }
        }

        let jsonObj = {
          modelId: component.modelId,
          modelName: modelName,
          introduce: introduce,
          items: self.saveComponent
        };
        self
          .getapprovalModelSave({
            oid: sessionStorage.getItem("orgId"),
            uid: sessionStorage.getItem("userId"),
            json: JSON.stringify(jsonObj)
          })
          .then(data => {
            if (data.code == "000000") {
              this.$message({
                type: "success",
                message: "已成功保存,请重新设置审批流程！"
              });
              sessionStorage.removeItem("approvalTitle");
              sessionStorage.removeItem("obj");
              sessionStorage.removeItem("newsss");
              sessionStorage.removeItem("formMenu");
              sessionStorage.removeItem("modelId");
              sessionStorage.removeItem("modelName");
              this.$router.push({
                path: "/home/approve/approveManage"
              });
              drag.$off("save");
            } else {
              this.$message({
                type: "info",
                message: data.msg
              });
              sessionStorage.removeItem("approvalTitle");
              sessionStorage.removeItem("obj");
              sessionStorage.removeItem("newsss");
              sessionStorage.removeItem("formMenu");
              sessionStorage.removeItem("modelId");
              sessionStorage.removeItem("modelName");
            }
          })
          .catch(msg => {
            if (JSON.parse(msg.bodyText).code == "188888") {
              this.$message({
                type: "info",
                message: JSON.parse(msg.bodyText).msg
              });
              this.$router.push({
                path: "/login"
              });
            } else {
              this.$message({
                type: "info",
                message: data.msg
              });
            }
          });
      } else {
        //***************************///////////
        let component = JSON.parse(sessionStorage.getItem("newsss"));
        let modelName = component.modelName;
        let introduce = component.introduce;
        let items = component.items;
        self.saveComponent = [];
        if (items == "") {
          this.$message({
            type: "info",
            message: "请创建您的表单！"
          });
          return;
        }
        for (let i = 0; i < items.length; i++) {
          if (items[i].componentName == "textareafield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 1,
              idx: items[i].idx,
              label: items[i].defaultLable,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint
            });
          } else if (items[i].componentName == "numberfield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            if (items[i].defaultSync == true) {
              items[i].defaultSync = 1;
            } else {
              items[i].defaultSync = 0;
            }
            self.saveComponent.push({
              type: 2,
              idx: items[i].idx,
              label: items[i].defaultLable,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint,
              judge: items[i].defaultSync
            });
          } else if (items[i].componentName == "ddselectfield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            if (items[i].defaultSync == true) {
              items[i].defaultSync = 1;
            } else {
              items[i].defaultSync = 0;
            }
            let optionString = items[i].defaultOptions;
            let stringArr = [];
            for (let j = 0; j < optionString.length; j++) {
              stringArr.push(optionString[j].text);
            }
            let stringsa = stringArr.toString(",");
            self.saveComponent.push({
              type: 3,
              idx: items[i].idx,
              label: items[i].defaultLable,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint,
              option: stringsa,
              judge: items[i].defaultSync
            });
          } else if (items[i].componentName == "dddatefield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 4,
              idx: items[i].idx,
              label: items[i].defaultLable,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint,
              format: items[i].defaultFormat
            });
          } else if (items[i].componentName == "dddaterangefield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 5,
              idx: items[i].idx,
              label: "日期区间",
              option: items[i].defaultLable + "," + items[i].defaultLable2,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint,
              format: items[i].defaultFormat
            });
          } else if (items[i].componentName == "textfield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 6,
              idx: items[i].idx,
              label: items[i].defaultLable,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint
            });
          } else if (items[i].componentName == "textnote") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 8,
              idx: items[i].idx,
              label: items[i].defaultLable,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint
              // 链接：items[i].defaultHref,
            });
          } else if (items[i].componentName == "moneyfield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 9,
              idx: items[i].idx,
              label: items[i].defaultLable,
              help: items[i].defaultProps,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint
            });
          } else if (items[i].componentName == "ddattachment") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 11,
              idx: items[i].idx,
              label: items[i].defaultLable,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint
            });
          } else if (items[i].componentName == "ddphotofield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            self.saveComponent.push({
              type: 12,
              idx: items[i].idx,
              label: items[i].defaultLable,
              required: items[i].defaultImportant,
              display: items[i].defaultPrint
            });
          } else if (items[i].componentName == "tablefield") {
            if (items[i].defaultImportant == true) {
              items[i].defaultImportant = 1;
            } else {
              items[i].defaultImportant = 0;
            }
            if (items[i].defaultPrint == true) {
              items[i].defaultPrint = 1;
            } else {
              items[i].defaultPrint = 0;
            }
            if (items[i].components.length > 0) {
              let chilComponents = items[i].components;
              for (let m = 0; m < chilComponents.length; m++) {
                if (chilComponents[m].componentName == "textareafield") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 1,
                    idx: chilComponents[m].idx,
                    label: chilComponents[m].defaultLable,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint
                  });
                } else if (chilComponents[m].componentName == "numberfield") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  if (chilComponents[m].defaultSync == true) {
                    chilComponents[m].defaultSync = 1;
                  } else {
                    chilComponents[m].defaultSync = 0;
                  }
                  self.childrenArr.push({
                    type: 2,
                    idx: chilComponents[m].idx,
                    label: chilComponents[m].defaultLable,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint
                    // judge:chilComponents[m].defaultSync
                  });
                } else if (chilComponents[m].componentName == "ddselectfield") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  if (chilComponents[m].defaultSync == true) {
                    chilComponents[m].defaultSync = 1;
                  } else {
                    chilComponents[m].defaultSync = 0;
                  }
                  let optionString = chilComponents[m].defaultOptions;
                  let stringArr = [];
                  for (let j = 0; j < optionString.length; j++) {
                    stringArr.push(optionString[j].text);
                  }
                  let stringsa = stringArr.toString(",");
                  self.childrenArr.push({
                    type: 3,
                    idx: chilComponents[m].idx,
                    label: chilComponents[m].defaultLable,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint,
                    option: stringsa
                    // judge:chilComponents[m].defaultSync
                  });
                } else if (chilComponents[m].componentName == "dddatefield") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 4,
                    idx: chilComponents[m].idx,
                    label: chilComponents[m].defaultLable,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint,
                    format: chilComponents[m].defaultFormat
                  });
                } else if (
                  chilComponents[m].componentName == "dddaterangefield"
                ) {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 5,
                    idx: chilComponents[m].idx,
                    label: "日期区间",
                    option:
                      chilComponents[m].defaultLable +
                      "," +
                      chilComponents[m].defaultLable2,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint,
                    format: chilComponents[m].defaultFormat
                  });
                } else if (chilComponents[m].componentName == "textfield") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 6,
                    idx: chilComponents[m].idx,
                    label: chilComponents[m].defaultLable,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint
                  });
                } else if (chilComponents[m].componentName == "textnote") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 8,
                    idx: chilComponents[m].idx,
                    label: chilComponents[m].defaultLable,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint
                    // 链接：items[i].defaultHref,
                  });
                } else if (chilComponents[m].componentName == "moneyfield") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 9,
                    idx: chilComponents[m].idx,
                    label: chilComponents[m].defaultLable,
                    help: chilComponents[m].defaultProps,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint
                  });
                } else if (chilComponents[m].componentName == "ddattachment") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 11,
                    idx: chilComponents[m].idx,
                    label: chilComponents[m].defaultLable,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint
                  });
                } else if (chilComponents[m].componentName == "ddphotofield") {
                  if (chilComponents[m].defaultImportant == true) {
                    chilComponents[m].defaultImportant = 1;
                  } else {
                    chilComponents[m].defaultImportant = 0;
                  }
                  if (chilComponents[m].defaultPrint == true) {
                    chilComponents[m].defaultPrint = 1;
                  } else {
                    chilComponents[m].defaultPrint = 0;
                  }
                  self.childrenArr.push({
                    type: 12,
                    idx: chilComponents[m].idx,
                    label: chilComponents[m].defaultLable,
                    required: chilComponents[m].defaultImportant,
                    display: chilComponents[m].defaultPrint
                  });
                }
                self.saveComponent.push({
                  type: 7,
                  idx: chilComponents[m].idx,
                  child: self.childrenArr,
                  label: items[i].defaultLable,
                  display: items[i].defaultPrint
                });
              }
            } else {
              self.$message("请添加控件到明细中!");
              return;
            }
          }
        }

        let jsonObj = [];
        jsonObj = {
          modelId: "",
          modelName: modelName,
          introduce: introduce,
          items: self.saveComponent
        };
        self
          .getapprovalModelSave({
            oid: sessionStorage.getItem("orgId"),
            uid: sessionStorage.getItem("userId"),
            json: JSON.stringify(jsonObj)
          })
          .then(data => {
            if (data.code == "000000") {
              this.$message({
                type: "success",
                message: "已成功保存,请重新设置审批流程！"
              });
              sessionStorage.removeItem("approvalTitle");
              sessionStorage.removeItem("obj");
              sessionStorage.removeItem("newsss");
              sessionStorage.removeItem("formMenu");
              sessionStorage.removeItem("modelId");
              sessionStorage.removeItem("modelName");
              drag.$off("save");
              this.$router.push({
                path: "/home/approve/approveManage"
              });
            } else {
              this.$message({
                type: "info",
                message: data.msg
              });
              sessionStorage.removeItem("approvalTitle");
              sessionStorage.removeItem("obj");
              sessionStorage.removeItem("newsss");
              sessionStorage.removeItem("formMenu");
              sessionStorage.removeItem("modelId");
              sessionStorage.removeItem("modelName");
            }
          })
          .catch(msg => {
            if (JSON.parse(msg.bodyText).code == "188888") {
              this.$message({
                type: "info",
                message: JSON.parse(msg.bodyText).msg
              });
              this.$router.push({
                path: "/login"
              });
            } else {
              this.$message({
                type: "info",
                message: data.msg
              });
            }
          });
      }
      // drag.$off('save')
    },
    ...mapActions(["getapprovalModelSave"])
  },
  created: function() {
    let self = this;
    //监视鼠标按下事件
    drag.$on("movestart", function(obj) {
      self.isstart = true;
      self.componentView = obj.componentView;
    });
  },
  mounted: function() {}
};
</script>
<style scoped>

.set {
  min-height: 800px;
}
@import "../../../../assets/css/design.css";
</style>