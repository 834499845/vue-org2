<!--审批列表-->
<template>
  <div class="addInformation">
    <div class="opNoticeTop">
      <div>
        <div class="opNoticeTop-left">{{titleVal}}</div>
        <div class="opNoticeTop-right">
          <div @click="addListClick">新建分组</div>
          <div @click="addSortClick">分组排序</div>
          <div @click="addApproveClick">新增审批</div>
        </div>
      </div>
    </div>
    <div class="opNoticeMain" v-show="sortListShow">
      <ul class="approveUL">
        <li class="approveLi" v-for="(itemOne,index) in dataLists" :key="index">
          <div class="approveLiOne">
            <div class="approveLiOneLeft">
              {{itemOne.categroyName}}
              <small>（{{itemOne.modelCount}}）</small>
            </div>
            <div class="approveLiOneRight">
              <div class="approveLiOneRightUpdate" @mouseenter="moreOver(index)" @mouseleave="moreOut(index)">
                <div class="approveLiOneRightUpdateTop">
                  编辑
                </div>
                <div v-show="isapproveLiOneRightUpdateBotShow == index" class="approveLiOneRightUpdateBot">
                  <div @click="updateCorameCLick(index)">重命名</div>
                  <div @click="deleteCorameCLick(index)">删除该组</div>
                </div>
              </div>
              <div @click="listsortClick(index)">{{itemOne.sortShowName}}</div>
            </div>
          </div>
          <div class="approveLiTwo">
            <ul class="approveLiTwoUl">
              <draggable v-model="itemOne.modelVOList" @start="drag=true" @end="drag=false" :options="{disabled:itemOne.sortShow}">
                <li class="approveLiTwoUlLi" v-for="(itemTwo,indexTwo) in itemOne.modelVOList" :key="indexTwo">
                  <div class="approveLiTwoUlLiOne">
                    <div class="approveLiTwoUlLiOneLeftSort" v-if="!itemOne.sortShow">
                      <img src="/static/img/1@3x.png" alt="">
                    </div>
                    <div class="approveLiTwoUlLiOneLeft">
                      <img :src="itemTwo.logo" alt="">
                    </div>
                    <div class="approveLiTwoUlLiOneRight">
                      <div>{{itemTwo.modelName}}</div>
                      <div>{{itemTwo.introduce | strFun}}</div>
                      <div>{{itemTwo.updateTime | timeFun}}更新</div>
                    </div>
                  </div>
                  <div class="approveLiTwoUlLiTwo">
                    <div class="approveLiTwoUlLiTwoTop">
                      可见范围
                    </div>
                    <div class="approveLiTwoUlLiTwoBot">
                      <div>
                        {{itemTwo.visibleRange}}
                      </div>
                      <div>
                        修改
                      </div>
                    </div>
                  </div>
                  <div class="approveLiTwoUlLiThr">
                    <div>编辑表单</div>
                    <div class="approveLiTwoUlLiThrTwo">审批流程
                      <small></small>
                      <!-- （审批人:已设置） -->
                    </div>
                    <div @click="disabledListCLick(index,indexTwo)">{{itemTwo.isDisabled | isDisabledFun}}</div>
                    <div @click="moveClick(index,indexTwo)">移动到</div>
                  </div>
                </li>
              </draggable>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="opNoticeMain" v-show="!sortListShow">
      <div class="opNoticeMainSort">
        <div></div>
        <div>
          <div @click="confirmSortClick">
            保存
          </div>
          <div @click="cancelSortClick">
            取消
          </div>
        </div>
      </div>
      <ul class="approveUL">
        <draggable v-model="dataLists" @start="drag=true" @end="drag=false">
          <li class="approveLi" v-for="(itemOne,index) in dataLists" :key="index">
            <div class="approveLiSortOne">
              <div class="approveLiOneSortRight">
                <img src="/static/img/1@3x.png" alt="">
              </div>
              <div class="approveLiOneLeft">
                {{itemOne.categroyName}}
                <small>（{{itemOne.modelCount}}）</small>
              </div>
            </div>
          </li>
        </draggable>
      </ul>
    </div>
    <!-- 移动到 -->
    <div class="updatePwd" v-show="updatePwdShow">
      <transition name="slide-fade">
        <div class="updatePwd-content" v-show="updatePwdShow">
          <div class="up-content-title">
            <div>
              将"{{moveTitle}}"移动到
            </div>
            <div @click="cancelClick">
              X
            </div>
          </div>
          <div class="up-content-main">
            <ul>
              <li @click="moveListClick(index)" :class="{'moveLi':true,'moveSelectLi':ismoveSelectLi == index}" v-for="(item,index) in moveLists"
                :key="index">
                <div>
                  {{item.categroyName}}
                </div>
                <div v-show="item.moveShow">
                  当前分组
                </div>
              </li>
            </ul>
          </div>
          <div class="up-content-but">
            <div>
              <!-- 新建分组 -->
            </div>
            <div class="up-content-butRight">
              <div @click="affirmClick">
                保存
              </div>
              <div @click="cancelClick">
                取消
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- 新增分组 -->
    <div class="updaterename" v-show="updaterename">
      <transition name="slide-fade">
        <div class="updaterename-content" v-show="updaterename">
          <div class="rename-content-title">
            <div>
              新增分组
            </div>
            <div @click="cancelrenameClick">
              X
            </div>
          </div>
          <div class="rename-content-main">
            <input type="text" placeholder="请输入分组名称.." v-model="renameVal">
          </div>
          <div class="rename-content-but">
            <div>
              <!-- 新建分组 -->
            </div>
            <div class="rename-content-butRight">
              <div @click="affirmrenameClick">
                保存
              </div>
              <div @click="cancelrenameClick">
                取消
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- 删除分组 -->
    <v-del :deleteBoxShow="deleteBoxShow" :delTostVal="delTostVal" @canfirm="affirmdeleteBoxClick" @cancel="canceldeleteBoxClick"></v-del>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import draggable from "vuedraggable";
import del from "../../cModel/del.vue";
export default {
  components: {
    draggable,
    "v-del": del
  },
  data() {
    return {
      affirmdeleteBoxClickTrue: false, // 删除确认防重复
      confirmSortClickTrue: false, // 分组排序防重复
      affirmrenameClickTrue: false, // 新增编辑分组防重复
      affirmClickTrue: false, // 删除确认防重复
      disabledListCLickTrue: false, // 启用禁用防重复
      listsortClickTrue: false, // 模板排序防重复
      delTostVal: "", // 删除规范提示
      deleteBoxShow: false, // 删除分组
      deleteBoxShowIndex: 0, // 删除index
      isapproveLiOneRightUpdateBotShow: 999999999999999999, // 编辑显示
      sortListShow: true, // 分组排序操作
      renameVal: "", // 分组名称
      updaterename: false, // 新增分组
      updaterenameIndex: 1, // 新增还是修改分组
      ismoveSelectLi: 99999, // 选中移动位置
      moveTitle: "", // 移动到title
      moveId: "", // 移动到id
      updatePwdShow: false, // 移动到状态
      listsortClickName: "排序", // 排序操作名称
      titleVal: "审批管理",
      dataLists: [], // 列表
      moveLists: [] // 移动到列表
    };
  },
  created: function() {
    this.listFun();
  },
  mounted() {
    this.listFun();
  },
  methods: {
    // 更多
    moreOver(index) {
      this.isapproveLiOneRightUpdateBotShow = index;
    },
    moreOut(index) {
      this.isapproveLiOneRightUpdateBotShow = 999999999999999999;
    },
    // 分组排序确定
    confirmSortClick() {
      var self = this;
      if (self.confirmSortClickTrue == false) {
        self.confirmSortClickTrue = true;
        var sorts = [];
        self.dataLists.forEach(function(ele, ind) {
          sorts.push({
            categoryId: ele.categoryId,
            sort: ind + 1
          });
        });
        self
          .getapprovalcategorysort({
            companyId: sessionStorage.getItem("oidItem"),
            sortArray: JSON.stringify(sorts)
          })
          .then(data => {
            self.confirmSortClickTrue = false;
            if (data.statusCode == 200) {
              self.listFun();
              self.sortListShow = true;
              self.$message({
                type: "success",
                message: "排序成功"
              });
            } else {
              self.$message({
                type: "info",
                message: data.statusMessage
              });
            }
          })
          .catch(msg => {
            self.confirmSortClickTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 分组排序取消
    cancelSortClick() {
      this.sortListShow = true;
    },
    // 删除分组名称确认
    affirmdeleteBoxClick() {
      var self = this;
      this.deleteBoxShow = false;
      if (self.affirmdeleteBoxClickTrue == false) {
        self.affirmdeleteBoxClickTrue = true;
        self
          .getapprovalcategorydelete({
            companyId: sessionStorage.getItem("oidItem"),
            categoryId: self.dataLists[self.deleteBoxShowIndex].categoryId
          })
          .then(data => {
            self.affirmdeleteBoxClickTrue = false;
            if (data.statusCode == 200) {
              self.listFun();
              self.$message({
                type: "success",
                message: "删除成功"
              });
            } else {
              self.$message({
                type: "info",
                message: data.statusMessage
              });
            }
          })
          .catch(msg => {
            self.affirmdeleteBoxClickTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 删除分组名称取消
    canceldeleteBoxClick() {
      var self = this;
      this.deleteBoxShow = false;
    },
    // 删除分组名称
    deleteCorameCLick(index) {
      this.deleteBoxShow = true;
      this.deleteBoxShowIndex = index;
      this.delTostVal = "删除后，组内审批单不会被删除将会进入到“其他”分组";
    },
    // 编辑分组名称
    updateCorameCLick(index) {
      var self = this;
      self.updaterename = true;
      self.updaterenameIndex = index;
      self.renameVal = self.dataLists[index].categroyName;
    },
    // 新增分组取消
    cancelrenameClick() {
      this.updaterename = false;
    },
    // 新建分组
    addListClick() {
      this.updaterename = true;
      this.updaterenameIndex = 999999999;
    },
    // 新增分组确认
    affirmrenameClick() {
      var self = this;
      if (self.renameVal.length == 0) {
        self.$message({
          type: "info",
          message: "请输入分组名称"
        });
      } else {
        var resomeobj = {
          companyId: sessionStorage.getItem("oidItem"),
          categoryName: self.renameVal
        };
        if (self.updaterenameIndex != 999999999) {
          resomeobj["categoryId"] =
            self.dataLists[self.updaterenameIndex].categoryId;
        }
        if (self.affirmrenameClickTrue == false) {
          self.affirmrenameClickTrue = true;
          self
            .getapprovalcategorycreateorrename(resomeobj)
            .then(data => {
              self.renameVal = "";
              self.affirmrenameClickTrue = false;
              if (data.statusCode == 200) {
                self.listFun();
                self.$message({
                  type: "success",
                  message: "新建成功"
                });
                self.updaterename = false;
              } else {
                self.$message({
                  type: "info",
                  message: data.statusMessage
                });
              }
            })
            .catch(msg => {
              self.affirmrenameClickTrue = false;
              self.renameVal = "";
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      }
    },
    // 移动到选择
    moveListClick(index) {
      this.ismoveSelectLi = index;
    },
    // 移动到取消
    cancelClick() {
      this.updatePwdShow = false;
    },
    // 移动到操作
    affirmClick() {
      var self = this;
      if (self.ismoveSelectLi == 99999) {
        self.$message({
          type: "info",
          message: "请选择分组"
        });
      } else {
        if (self.affirmClickTrue == false) {
          self.affirmClickTrue = true;
          self
            .getapprovalmodelmoveto({
              categoryId: self.dataLists[self.ismoveSelectLi].categoryId,
              modelId: self.moveId
            })
            .then(data => {
              self.affirmClickTrue = false;
              if (data.statusCode == 200) {
                self.listFun();
                self.$message({
                  type: "success",
                  message: "移动成功"
                });
                self.updatePwdShow = false;
              } else {
                self.$message({
                  type: "info",
                  message: data.statusMessage
                });
              }
            })
            .catch(msg => {
              self.affirmClickTrue = false;
              self.$message({
                type: "info",
                message: "服务器异常"
              });
            });
        }
      }
    },
    // 移动到
    moveClick(indexOne, indexTwo) {
      var self = this;
      self.ismoveSelectLi = 99999;
      this.updatePwdShow = true;
      self.moveTitle = self.dataLists[indexOne].modelVOList[indexTwo].modelName;
      self.moveId = self.dataLists[indexOne].modelVOList[indexTwo].modelId;
      self.moveLists.forEach(function(ele) {
        ele.moveShow = false;
      });
      self.moveLists[indexOne].moveShow = true;
    },
    // 启用和停用操作
    disabledListCLick(indexOne, indexTwo) {
      var self = this;
      var isDisabledNum = 0;
      if (self.dataLists[indexOne].modelVOList[indexTwo].isDisabled == 1) {
        isDisabledNum = 0;
      } else {
        isDisabledNum = 1;
      }
      if (self.disabledListCLickTrue == false) {
        self.disabledListCLickTrue = true;
        self
          .getapprovalmodelisdisabled({
            modelId: self.dataLists[indexOne].modelVOList[indexTwo].modelId,
            isDisabled: isDisabledNum
          })
          .then(data => {
            self.disabledListCLickTrue = false;
            if (data.statusCode == 200) {
              self.listFun();
              self.$message({
                type: "success",
                message: "操作成功"
              });
            } else {
              self.$message({
                type: "info",
                message: data.statusMessage
              });
            }
          })
          .catch(msg => {
            self.disabledListCLickTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    // 模板排序
    listsortClick(index) {
      var self = this;
      if (self.dataLists[index].modelVOList) {
        if (self.dataLists[index].sortShow == false) {
          var sorts = [];
          self.dataLists[index].modelVOList.forEach(function(ele, ind) {
            sorts.push({
              modelId: ele.modelId,
              sort: ind + 1
            });
          });
          if (self.listsortClickTrue == false) {
            self.listsortClickTrue = true;
            self
              .getapprovalmodelsort({
                categoryId: self.dataLists[index].categoryId,
                sortArray: JSON.stringify(sorts)
              })
              .then(data => {
                self.listsortClickTrue = false;
                if (data.statusCode == 200) {
                  self.listFun();
                  self.dataLists[index].sortShow = true;
                  self.dataLists[index].sortShowName = "排序";
                  self.$message({
                    type: "success",
                    message: "排序成功"
                  });
                } else {
                  self.$message({
                    type: "info",
                    message: data.statusMessage
                  });
                }
              })
              .catch(msg => {
                self.listsortClickTrue = false;
                self.$message({
                  type: "info",
                  message: "服务器异常"
                });
              });
          }
        } else {
          self.dataLists[index].sortShow = false;
          self.dataLists[index].sortShowName = "完成";
        }
      }
    },
    // 分组排序
    addSortClick() {
      this.sortListShow = !this.sortListShow;
    },
    // 新增审批
    addApproveClick() {
      this.$router.push({
        path: "/home/formDesign"
      });
    },
    // 初始数据
    listFun() {
      var self = this;
      self
        .getapprovalmodellist({ companyId: sessionStorage.getItem("oidItem") })
        .then(data => {
          if (data.statusCode == 200) {
            self.dataLists = [];
            data.data.forEach(function(ele, ind) {
              self.dataLists.push({
                categoryId: ele.categoryId,
                categroyName: ele.categroyName,
                sort: ele.sort,
                updateTime: ele.updateTime,
                modelVOList: ele.modelVOList,
                modelCount: ele.modelCount,
                sortShow: true,
                sortShowName: "排序"
              });
              self.moveLists.push({
                categoryId: ele.categoryId,
                categroyName: ele.categroyName,
                sort: ele.sort,
                updateTime: ele.updateTime,
                modelVOList: ele.modelVOList,
                modelCount: ele.modelCount,
                moveShow: false
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
      "getapprovalmodellist",
      "getapprovalmodelsort",
      "getapprovalmodelisdisabled",
      "getapprovalmodelmoveto",
      "getapprovalcategorycreateorrename",
      "getapprovalcategorysort",
      "getapprovalcategorydelete"
    ])
  },
  filters: {
    isDisabledFun(val) {
      if (val == 1) {
        return "启用";
      } else {
        return "停用";
      }
    },
    strFun(val) {
      if (val) {
        return val;
      } else {
        return "无";
      }
    },
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
        return y + "-" + m + "-" + d + " " + h + ":" + f + ":" + m;
      } else {
        return "暂无";
      }
    }
  },
  watch: {
    dataLists: {
      handler(val) {},
      deep: true
    }
  }
};
</script>
<style scoped>
.approveLiTwoUlLiThr {
  display: flex;
  align-items: center;
  min-width: 340px;
}

.approveLiTwoUlLiThr > div {
  margin-left: 8px;
  cursor: pointer;
  user-select: none;
  color: #38adff;
}

.approveLiTwoUlLiThrTwo small {
  color: #999;
}

.approveLiTwoUlLiTwoTop {
  height: 30px;
  width: 80%;
  margin-left: 15px;
  line-height: 30px;
  margin-top: 15px;
}

.approveLiTwoUlLiTwoBot > div:nth-child(1) {
  color: #999;
  margin-left: 15px;
}

.approveLiTwoUlLiTwoBot > div:nth-child(2) {
  color: #38adff;
  margin-left: 10px;
}

.approveLiTwoUlLiTwoBot {
  display: flex;
  height: 30px;
}

.approveLiTwoUlLiTwo {
  border-right: 1px solid #ccc;
  height: 90px;
  width: 250px;
}

.approveLiTwoUlLiOneLeftSort {
  width: 30px;
  height: 30px;
  margin-left: 15px;
}

.approveLiTwoUlLiOneLeftSort img {
  width: 100%;
  height: 100%;
}

.approveLiTwoUlLiOneLeft {
  height: 50px;
  width: 50px;
  margin-left: 10px;
  overflow: hidden;
}

.approveLiTwoUlLiOneRight > div:nth-child(1) {
  font-size: 14px;
  color: #000;
  height: 14px;
  line-height: 14px;
  margin-top: 5px;
  overflow: hidden;
}

.approveLiTwoUlLiOneRight > div:nth-child(2) {
  overflow: hidden;
  width: 150px;
  height: 20px;
  font-size: 13px;
  color: #999;
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.approveLiTwoUlLiOneRight > div:nth-child(3) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 160px;
  height: 20px;
  font-size: 13px;
  color: #999;
}

.approveLiTwoUlLiOneRight {
  height: 60px;
  margin-left: 15px;
  overflow: hidden;
  width: 160px;
}

.approveLiTwoUlLiOneLeft img {
  width: 100%;
  height: 100%;
}

.approveLiTwoUlLiOne {
  width: 300px;
  display: flex;
  align-items: center;
  border-right: 1px solid #ccc;
}

.approveLiTwoUl {
  width: 100%;
}

.approveLiTwoUlLi:nth-last-child(1) {
  border: 0;
}

.approveLiTwoUlLi {
  display: flex;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  height: 90px;
}

.approveLiOneLeft small {
  font-size: 14px;
  color: #999;
}

.approveLiOneLeft {
  padding-left: 12px;
  line-height: 40px;
  height: 40px;
}

.approveLiOneRight > div:nth-child(2) {
  margin-left: 5px;
  margin-right: 10px;
  cursor: pointer;
  user-select: none;
  line-height: 40px;
  height: 40px;
}

.approveLiOneRightUpdateTop {
  width: 100px;
  text-align: right;
  height: 40px;
  line-height: 40px;
}

.approveLiOneRightUpdateTop:hover {
  color: rgba(225, 120, 0, 1);
}

.approveLiOneRightUpdateBot {
  height: 80px;
  position: absolute;
  top: 40px;
  width: 100px;
  left: 40px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 10000000;
  overflow: hidden;
}

.approveLiOneRightUpdateBot > div:hover {
  background-color: rgb(233, 245, 255);
}

.approveLiOneRightUpdateBot > div:nth-child(1) {
  border-bottom: 1px solid #ccc;
}

.approveLiOneRightUpdateBot > div {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.approveLiOneRightUpdate {
  width: 100px;
  height: 120px;
  position: relative;
  margin-left: 5px;
  margin-right: 10px;
}

.approveLiOneSortRight {
  width: 25px;
  height: 25px;
  margin-left: 15px;
}

.approveLiOneSortRight img {
  width: 100%;
  height: 100%;
}

.approveLiOneRight {
  display: flex;
  color: #38adff;
  font-size: 14px;
}

.approveLiSortOne {
  width: 100%;
  height: 40px;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.approveLiOne {
  width: 100%;
  height: 40px;
  background-color: #f8f8f8;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  cursor: pointer;
}

.approveLi {
  min-height: 50px;
  width: 100%;
}

.approveUL {
  width: 100%;
}

.opNoticeMainSort {
  height: 45px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.opNoticeMainSort > div:nth-child(2) {
  display: flex;
}

.opNoticeMainSort > div:nth-child(2) > div:nth-child(2) {
  width: 55px;
  height: 35px;
  border-radius: 4px;
  background-color: #ccc;
  text-align: center;
  line-height: 35px;
  color: #fff;
  margin-right: 25px;
  cursor: pointer;
}

.opNoticeMainSort > div:nth-child(2) > div:nth-child(1) {
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

.opNoticeMain {
  margin-left: 44px;
  width: calc(100% - 88px);
  min-height: 400px;
  margin-top: 15px;
}

.addInformation {
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  min-height: 500px;
  padding-bottom: 20px;
}

.opNoticeTop-right > div {
  width: 85px;
  height: 35px;
  border-radius: 4px;
  background-color: #38adff;
  text-align: center;
  line-height: 35px;
  color: #fff;
  margin-left: 25px;
  cursor: pointer;
}

.opNoticeTop-right {
  display: flex;
}

.opNoticeTop-left {
  color: #303030;
  font-size: 14px;
  padding-top: 24px;
  padding-bottom: 12px;
}

.opNoticeTop > div {
  width: calc(100% - 88px);
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 44px;
}

.opNoticeTop {
  width: 100%;
}

/* 新增分组 */

.rename-content-but {
  height: 60px;
  width: 100%;
  background-color: #f0f6fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e5e5e5;
}

.rename-content-butLeft {
  width: 95px;
  height: 35px;
  border-radius: 4px;
  background-color: #38adff;
  text-align: center;
  line-height: 35px;
  color: #fff;
  margin-right: 25px;
  cursor: pointer;
  margin-left: 25px;
}

.rename-content-butRight {
  display: flex;
}

.rename-content-butRight > div:nth-child(2) {
  width: 55px;
  height: 35px;
  border-radius: 4px;
  background-color: #ccc;
  text-align: center;
  line-height: 35px;
  color: #fff;
  margin-right: 25px;
  cursor: pointer;
}

.rename-content-butRight > div:nth-child(1) {
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

.rename-content-main input {
  width: 450px;
  height: 35px;
  border: 1px solid #ccc;
  padding-left: 7px;
  line-height: 35px;
  border-radius: 4px;
}

.rename-content-main {
  height: 140px;
  width: 100%;
  border-top: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rename-content-title > div:nth-child(1) {
  margin-left: 15px;
}

.rename-content-title > div:nth-child(2) {
  margin-right: 15px;
  font-size: 16px;
  color: #ccc;
  cursor: pointer;
}

.rename-content-title {
  height: 52px;
  width: 100%;
  background-color: #f0f6fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.updaterename-content {
  width: 600px;
  height: 250px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 70px;
}

.updaterename {
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

/* 新增分组 */

/* 移动到 */

.moveSelectLi {
  background-color: rgb(235, 247, 255) !important;
}

.moveLi > div:nth-child(1) {
  color: #333;
  margin-left: 15px;
}

.moveLi > div:nth-child(2) {
  color: #ccc;
  margin-right: 15px;
}

.moveLi:hover {
  background-color: rgb(248, 251, 251);
}

.moveLi {
  height: 45px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
}

/* 移动到 */

.up-content-but {
  height: 60px;
  width: 100%;
  background-color: #f0f6fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e5e5e5;
}

.up-content-butLeft {
  width: 95px;
  height: 35px;
  border-radius: 4px;
  background-color: #38adff;
  text-align: center;
  line-height: 35px;
  color: #fff;
  margin-right: 25px;
  cursor: pointer;
  margin-left: 25px;
}

.up-content-butRight {
  display: flex;
}

.up-content-butRight > div:nth-child(2) {
  width: 55px;
  height: 35px;
  border-radius: 4px;
  background-color: #ccc;
  text-align: center;
  line-height: 35px;
  color: #fff;
  margin-right: 25px;
  cursor: pointer;
}

.up-content-butRight > div:nth-child(1) {
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

.up-content-main {
  height: 340px;
  width: 100%;
  border-top: 1px solid #e5e5e5;
  overflow-y: scroll;
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
  height: 450px;
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

/* 移动到 */

.slide-fade-enter-active {
  transition: all 0.7s ease;
}

.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(-30px);
  opacity: 0;
}
</style>