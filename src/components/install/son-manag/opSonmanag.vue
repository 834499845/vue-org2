// 子管理员操作
<template>
  <div class="sonmanag">
    <div class="install-title">
      <div>
        <div @click="cancelClick">
          <img src="/static/img/1@3x.png" alt="">
        </div>
        <div>
          新增子管理员
        </div>
      </div>
    </div>
    <div class="install-main">
      <div class="sonmanag-main">
        <div class="sonmanag-namelist">
          <div class="sonm-list-left">
            <small>*</small> 成员：
          </div>
          <div>
            <div @click="namelistClick">
              {{namelistVal}}
            </div>
          </div>
        </div>
        <div class="sonmanag-scopeList">
          <div class="sonm-list-left">
            <small>*</small> 管理范围：
          </div>
          <div class="sonm-scopeList-right">
            <div class="scopeList-select" v-for="(item,index) in scopeLists" :key="index" @click="scopeListsCLick(index)">
              <div class="scl-s-left">
                <div v-show="isSelectOnly == index"></div>
              </div>
              <div>
                {{item.name}}
              </div>
            </div>
            <div class="scopeList-input" v-show="isSelectShow">
              <div @click="scopeListInputClick">
                {{scopeListInputVal}}
              </div>
            </div>
          </div>
        </div>
        <div class="sonmanag-jurisdiction">
          <div class="sonm-list-left">
            <small>*</small> 分配权限：
          </div>
          <div class="sonm-jurisdiction-right">
            <div class="jurisdiction-r-title">
              <div>
                （将会在以上通讯录范围内配置权限）
              </div>
              <div class="jd-r-t-right">
                <div>
                  <img v-if="jurisdictionAllShow" src="/static/img/on@2x.png" alt="">
                  <img v-else src="/static/img/out@2x.png" alt="">
                </div>
                <div>
                  全部权限
                </div>
              </div>
            </div>
            <div class="jurisdiction-r-list">
              <ul>
                <li class="jurisdictionListLi" :key="index" v-for="(item,index) in jurLists">
                  <div class="jurisdictionListLi-left">
                    <img :src="item.img" alt=""> &nbsp;&nbsp; {{item.name}}
                  </div>
                  <div class="jurisdictionListLi-right">
                    <div>
                      <img v-if="item.show" src="/static/img/on@2x.png" alt="">
                      <img v-else src="/static/img/out@2x.png" alt="">
                    </div>
                    <div>
                      全部权限
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="sonmanag-but">
          <div class="sonm-list-left">
          </div>
          <div @click="addClick">
            保存
          </div>
        </div>
      </div>
    </div>
    <!-- 新增人员弹出框 -->
    <div class="updatePwd" v-show="updatePopShow">
      <transition name="slide-fade">
        <div class="updatePwd-content" v-show="updatePopShow">
          <div class="up-content-title">
            <div>
              选择人员
            </div>
            <div @click="cancelClick">
              X
            </div>
          </div>
          <div class="up-content-main">
            <div class="transfer-left">
              <div class="transfer-title">
                选择：
              </div>
              <div class="transfer-main transfer-mainLeft">
                <div class="transfer-ml-search">
                  <div>
                    <div>
                      <img src="/static/img/搜索.png" alt="">
                    </div>
                    <div>
                      <input type="text" placeholder="搜索" v-model="leftSearchVal">
                    </div>
                    <div v-show="searchValClearShow">
                      <img src="/static/img/清空.png" alt="">
                    </div>
                  </div>
                </div>
                <div class="transfer-ml-bread">
                  <div class="transfer-ml-breadMain">
                    <ul>
                      <li v-show="breadListsOvShow" class="breadMainLiBack">
                        <div @click="breadListsSelectOneClick">
                          «
                        </div>
                      </li>
                      <li :class="{breadMainLi:true,breadMainSeleteLi:isBreadMainSeleteLi == index}" :key="index" v-for="(item,index) in breadLists" ::key="index">
                        <div @click="breadListsClick(index)">{{item.name}}</div>
                        <div v-show="isBreadMainSeleteLi != index">></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="transfer-ml-selectAll">
                  <div class="transfer-ml-selectAllMain" @click="leftSelectAllClick">
                    <div>
                      <img v-if="transferselectAllShow" src="/static/img/on@2x.png" alt="">
                      <img v-else src="/static/img/out@2x.png" alt="">
                    </div>
                    <div>
                      全选
                    </div>
                  </div>
                </div>
                <div class="transfer-ml-list">
                  <ul>
                    <li class="transferMlListLi" :key="index" v-for="(item,index) in transferPLLists" ::key="index">
                      <div class="transferMlListLiLeft">
                        <div class="trMlLiLiLeSlect">
                          <div v-show="item.type == 2" @click="transferPLListsSelectClick(index)">
                            <img v-if="item.show" src="/static/img/on@2x.png" alt="">
                            <img v-else src="/static/img/out@2x.png" alt="">
                          </div>
                          <div v-show="item.type == 1">
                            <img src="/static/img/部门单位.png" alt="">
                          </div>
                        </div>
                        <div v-show="item.type == 2" class="trMlLiLiLeSlectType">
                          <img src="/static/img/1@3x.png" alt="">
                          <div>{{item.name}}-人员</div>
                        </div>
                        <div v-show="item.type == 1" class="trMlLiLiLeSlectType">
                          <!-- <img src="/static/img/5@3x.png" alt=""> -->
                          <div>{{item.name}}-部门</div>
                        </div>
                      </div>
                      <div v-show="item.type == 1" class="transferMlListLiRight">
                        <img @click="leftNextClick(index)" v-show="item.children" src="/static/img/下一级.png" alt="">
                        <img v-show="!item.children" src="/static/img/下一级灰.png" alt="">
                        <div @click="leftNextClick(index)">下级</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="transfer-right">
              <div class="transfer-title">
                已选：
              </div>
              <div class="transfer-main transfer-mainRight">
                <ul>
                  <li class="transferPRLi" :key="index" v-for="(item,index) in transferPRLists" ::key="index">
                    <div>
                      <img :src="item.img" alt="">
                      <div>{{item.name}}</div>
                    </div>
                    <div @click="righttransferPRListsClick(index)">
                      <img src="/static/img/清空.png" alt="">
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="up-content-but">
            <div></div>
            <div @click="affirmClick">
              保存
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
  data() {
    return {
      leftSearchVal: "", // 搜索
      searchValClearShow: false, // 搜索清空搜索清空
      breadListsOvShow: false, // 导航超过三个显示
      updatePopShow: false, // 人员选择列表
      transferPRLists: [], //选中人员列表
      isBreadMainSeleteBackShow: false, // 返回顶部
      transferselectAllShow: false, // 全选
      isBreadMainSeleteLi: 0, // 选中导航
      breadLists: [{ name: "通讯录" }], // 人员面包屑
      breadCopyLists: [{ name: "通讯录" }], // 人员面包屑监视数组
      transferPLLists: [
        {
          name: "测试1",
          img: "/static/img/1@3x.png",
          type: 1,
          show: false,
          children: [
            {
              name: "测试1-1",
              img: "/static/img/1@3x.png",
              type: 2,
              show: false
            },
            {
              name: "测试1-2",
              img: "/static/img/1@3x.png",
              type: 2,
              show: false
            },
            {
              name: "测试1-3",
              img: "/static/img/1@3x.png",
              type: 1,
              show: false,
              children: [
                {
                  name: "测试1-1-1",
                  img: "/static/img/1@3x.png",
                  type: 2,
                  show: false
                },
                {
                  name: "测试1-1-2",
                  img: "/static/img/1@3x.png",
                  type: 2,
                  show: false
                },
                {
                  name: "测试1-1-3",
                  img: "/static/img/1@3x.png",
                  type: 1,
                  show: false,
                  children: [
                    {
                      name: "测试1-1-3-1",
                      img: "/static/img/1@3x.png",
                      type: 2,
                      show: false
                    },
                    {
                      name: "测试1-1-3-2",
                      img: "/static/img/1@3x.png",
                      type: 2,
                      show: false
                    },
                    {
                      name: "测试1-1-3-3",
                      img: "/static/img/1@3x.png",
                      type: 1,
                      show: false,
                      children: [
                        {
                          name: "测试1-1-3-3-1",
                          img: "/static/img/1@3x.png",
                          type: 2,
                          show: false
                        },
                        {
                          name: "测试1-1-3-3-2",
                          img: "/static/img/1@3x.png",
                          type: 2,
                          show: false
                        },
                        {
                          name: "测试1-1-3-3-3",
                          img: "/static/img/1@3x.png",
                          type: 1,
                          show: false
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        { name: "测试2", img: "/static/img/1@3x.png", type: 1, show: false },
        { name: "测试3", img: "/static/img/1@3x.png", type: 1, show: false },
        { name: "测试4", img: "/static/img/1@3x.png", type: 1, show: false },
        { name: "1", img: "/static/img/1@3x.png", type: 2, show: false },
        { name: "2", img: "/static/img/1@3x.png", type: 2, show: false },
        { name: "3", img: "/static/img/1@3x.png", type: 2, show: false }
      ], // 成员未选中列表
      namelistVal: "请选择成员", // 选择人员对应数据
      scopeListInputVal: "请选择部门", // 选择部门对应数据
      jurisdictionAllShow: false, // 全部权限
      isSelectShow: false, // 控制特定部门选择
      isSelectOnly: 0, // 部门单选
      scopeLists: [
        {
          name: "全公司"
        },
        {
          name: "所在部门以及下级部门"
        },
        {
          name: "特定部门"
        }
      ], // 列表
      jurLists: [
        {
          name: "全公司",
          img: "/static/img/1@3x.png",
          show: false
        },
        {
          name: "全公司",
          img: "/static/img/1@3x.png",
          show: false
        }
      ] // 权限列表
    };
  },
  filters: {},
  created: function() {},
  watch: {
    leftSearchVal(val) {
      var self = this;
      if (val.length > 0) {
        self.searchValClearShow = true;
      } else {
        self.searchValClearShow = false;
      }
    }
  },
  methods: {
    // 选择成员
    namelistClick() {
      var self = this;
      this.updatePopShow = true;
    },
    // 人员确认
    affirmClick() {
      var self = this;
      this.updatePopShow = false;
    },
    // 人员取消
    cancelClick() {
      var self = this;
      this.updatePopShow = false;
    },
    // 左边点击返回第一层
    breadListsSelectOneClick() {},
    // 左边点击导航
    breadListsClick(index) {
      var self = this;
      var indeName = self.breadLists[index].name;
      if (self.breadCopyLists.length > 3) {
        self.breadLists = [];
        var selectIndex = 0;
        self.breadCopyLists.forEach(function(ele, ind) {
          if (ele.name == indeName) {
            selectIndex = ind;
            self.breadLists.unshift({
              name: self.breadCopyLists[ind].name
            });
            self.breadLists.unshift({
              name: self.breadCopyLists[ind - 1].name
            });
            self.breadLists.unshift({
              name: self.breadCopyLists[ind - 2].name
            });
          }
        });
        self.breadCopyLists.splice(selectIndex + 1, self.breadCopyLists.length);
        self.breadListsOvShow = true;
      } else {
        self.breadLists = [];
        self.breadCopyLists.splice(index + 1, self.breadCopyLists.length);
        self.breadCopyLists.forEach(function(ele, ind) {
          self.breadLists.push({
            name: ele.name
          });
        });
        self.breadListsOvShow = false;
      }
      self.isBreadMainSeleteLi = self.breadLists.length - 1;
      self.transferPLLists = [
        {
          name: "测试1-1",
          img: "/static/img/1@3x.png",
          type: 2,
          show: false
        },
        {
          name: "测试1-2",
          img: "/static/img/1@3x.png",
          type: 2,
          show: false
        },
        {
          name: "测试1-3",
          img: "/static/img/1@3x.png",
          type: 1,
          show: false
        }
      ];
      var leftPArr = [];
      var leftPSlectArr = [];
      self.transferPLLists.forEach(function(elel, indl) {
        if (elel.type == 2) {
          leftPArr.push(elel);
        }
        self.transferPRLists.forEach(function(eler, indr) {
          if (eler.name == elel.name) {
            leftPSlectArr.push(eler);
            self.transferPLLists[indl].show = true;
          }
        });
      });
      if (leftPSlectArr.length == leftPArr.length) {
        self.transferselectAllShow = true;
      } else {
        self.transferselectAllShow = false;
      }
    },
    // 左边下一级
    leftNextClick(index) {
      var self = this;
      if (self.transferPLLists[index].children) {
        self.breadCopyLists.push({
          name: self.transferPLLists[index].name
        });
        if (self.breadCopyLists.length < 4) {
          self.breadListsOvShow = false;
          self.breadLists.push({
            name: self.transferPLLists[index].name
          });
        } else {
          self.breadListsOvShow = true;
          self.breadLists.shift();
          self.breadLists.push({
            name: self.transferPLLists[index].name
          });
        }
        self.transferselectAllShow = false;
        self.isBreadMainSeleteLi = self.breadLists.length - 1;
        var leftNextArr = [];
        self.transferPLLists[index].children.forEach(function(ele, ind) {
          leftNextArr.push(ele);
        });
        self.transferPLLists = [];
        self.transferPLLists = leftNextArr;
      } else {
        console.log("没有下一级");
      }
    },
    // 左边全选
    leftSelectAllClick() {
      var self = this;
      var leftPArr = [];
      var leftPSlectArr = [];
      self.transferselectAllShow = !self.transferselectAllShow;
      self.transferPLLists.forEach(function(elel, indl) {
        if (elel.type == 2) {
          elel.show = self.transferselectAllShow;
          leftPArr.push(elel);
        }
        self.transferPRLists.forEach(function(eler, indr) {
          if (elel.name == eler.name) {
            eler.show = self.transferselectAllShow;
          }
        });
        if (elel.show == true) {
          self.transferPRLists.push(elel);
          leftPSlectArr.push(elel);
        }
      });
      if (leftPSlectArr.length == leftPArr.length) {
        self.transferselectAllShow = true;
      } else {
        self.transferselectAllShow = false;
      }
      // 获取右边所有当前列表中包含的参数
      var indexArr = [];
      self.transferPRLists.forEach(function(ele, ind) {
        if (ele.show == false) {
          indexArr.push({ name: ele.name });
        }
      });
      // 数组去重
      var hash = {};
      self.transferPRLists = self.transferPRLists.reduce(function(item, next) {
        hash[next.name] ? "" : (hash[next.name] = true && item.push(next));
        return item;
      }, []);
      // 数组求差集
      var isNaN = Number.isNaN;
      self.transferPRLists = self.transferPRLists.reduce(function(previous, i) {
        var found = indexArr.findIndex(function(j) {
          return j.name === i.name || (isNaN(i.name) && isNaN(j.name));
        });
        return found < 0 && previous.push(i), previous;
      }, []);
    },
    // 左边点击选中
    transferPLListsSelectClick(index) {
      var self = this;
      if (self.transferPLLists[index].type == 2) {
        var leftPArr = [];
        var leftPSlectArr = [];
        self.transferPLLists[index].show = !self.transferPLLists[index].show;
        self.transferPRLists.forEach(function(ele, ind) {
          if (ele.name == self.transferPLLists[index].name) {
            self.transferPRLists[ind].show = false;
            self.transferPRLists.splice(ind, 1);
          }
        });
        self.transferPLLists.forEach(function(ele, ind) {
          if (ele.show == true) {
            self.transferPRLists.push(ele);
            leftPSlectArr.push(ele);
          }
          if (ele.type == 2) {
            leftPArr.push(ele);
          }
        });
        var hash = {};
        self.transferPRLists = self.transferPRLists.reduce(function(
          item,
          next
        ) {
          hash[next.name] ? "" : (hash[next.name] = true && item.push(next));
          return item;
        },
        []);
        if (leftPSlectArr.length == leftPArr.length) {
          self.transferselectAllShow = true;
        } else {
          self.transferselectAllShow = false;
        }
      } else {
        self.$message({
          type: "info",
          message: "请选择人员，你现在选择的是部门!"
        });
      }
    },
    // 右边选中删除
    righttransferPRListsClick(index) {
      var self = this;
      var leftPArr = [];
      var leftPSlectArr = [];
      self.transferPRLists[index].show = !self.transferPRLists[index].show;
      self.transferPLLists.forEach(function(ele, ind) {
        if (ele.name == self.transferPRLists[index].name) {
          self.transferPLLists[ind].show = false;
        }
      });
      self.transferPRLists.splice(index, 1);
      self.transferPLLists.forEach(function(ele, ind) {
        if (ele.show == true) {
          leftPSlectArr.push(ele);
        }
        if (ele.type == 2) {
          leftPArr.push(ele);
        }
      });
      if (leftPSlectArr.length == leftPArr.length) {
        self.transferselectAllShow = true;
      } else {
        self.transferselectAllShow = false;
      }
    },
    // 选择部门
    scopeListInputClick() {},
    // 部门单选
    scopeListsCLick(index) {
      this.isSelectOnly = index;
      if (this.isSelectOnly == 2) {
        this.isSelectShow = true;
      } else {
        this.isSelectShow = false;
      }
    },
    // 点击新增
    addClick() {},
    // 点击返回
    cancelClick() {
      this.$router.push({
        path: "/install/sonmanag"
      });
    },
    ...mapActions([])
  }
};
</script>
<style scoped>
.transferMlListLiRight {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-right: 11px;
  color: #333;
}

.transferMlListLiRight img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.trMlLiLiLeSlectType img {
  width: 20px;
  height: 20px;
}

.trMlLiLiLeSlectType > div {
  max-width: 200px;
  margin-left: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.trMlLiLiLeSlectType {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-left: 5px;
  color: #333;
}

.trMlLiLiLeSlect {
  height: 20px;
  width: 20px;
}

.trMlLiLiLeSlect > div {
  width: 20px;
  height: 20px;
}

.trMlLiLiLeSlect img {
  width: 20px;
  height: 20px;
}

.transferMlListLiLeft {
  min-width: 10px;
  display: flex;
  align-items: center;
  margin-left: 17px;
}

.transferMlListLi:hover {
  background-color: rgb(231, 234, 239);
}

.transferMlListLi {
  width: 100%;
  height: 35px;
  margin-top: 3px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.transfer-ml-list ul {
  width: 100%;
}

.transfer-ml-list {
  display: flex;
  height: 200px;
  width: 100%;
  margin-top: 5px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.transfer-ml-selectAllMain > div:nth-child(1) {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.transfer-ml-selectAllMain > div:nth-child(2) {
  font-size: 14px;
  margin-left: 7px;
  cursor: pointer;
}

.transfer-ml-selectAllMain > div img {
  width: 20px;
  height: 20px;
}

.transfer-ml-selectAllMain {
  width: 90%;
  display: flex;
  height: 20px;
  overflow: hidden;
  align-items: center;
}

.transfer-ml-selectAll {
  display: flex;
  height: 22px;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  margin-top: 5px;
}

.breadMainLiBack {
  color: #38adff;
  width: 12px;
  height: 20px;
  cursor: pointer;
  margin-right: 5px;
}

.breadMainLi {
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.breadMainLi > div:nth-child(1) {
  color: #38adff;
  font-size: 14px;
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}

.breadMainLi > div:nth-child(2) {
  font-size: 14px;
  color: #ccc;
  margin-left: 5px;
}

.breadMainSeleteLi > div:nth-child(1) {
  color: #333 !important;
}

.transfer-ml-breadMain ul {
  display: flex;
  height: 20px;
  width: 100%;
  overflow: hidden;
}

.transfer-ml-breadMain {
  width: 90%;
  display: flex;
  height: 20px;
  overflow: hidden;
}

.transfer-ml-bread {
  min-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
}

.transfer-ml-search > div {
  width: 90%;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  height: 32px;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
}

.transfer-ml-search input {
  font-size: 14px;
  border: 0px solid #ccc;
  min-height: 25px;
  border-radius: 5px;
  height: 32px;
  width: calc(100% - 10px);
  background-color: #fff;
}

.transfer-ml-search > div > div:nth-child(1) {
  width: 32px;
  display: flex;
  align-items: center;
  height: 32px;
  justify-content: center;
}

.transfer-ml-search > div > div:nth-child(2) {
  width: calc(100% - 55px);
}

.transfer-ml-search > div > div:nth-child(1) img {
  width: 15px;
  height: 15px;
}
.transfer-ml-search > div > div:nth-child(3) {
  width: 20px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transfer-ml-search > div > div:nth-child(3) img {
  width: 15px;
  height: 15px;
}
.transfer-ml-search {
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 15px;
}

.transferPRLi {
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  cursor: pointer;
}

.transferPRLi:hover {
  background-color: rgb(231, 234, 239);
}

.transferPRLi > div:nth-child(1) {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  margin-left: 15px;
}

.transferPRLi > div:nth-child(2) {
  font-size: 14px;
  color: #ccc;
  margin-left: 15px;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: center;
  line-height: 18px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transferPRLi > div:nth-child(1) > div {
  max-width: 200px;
  overflow: hidden;
  margin-left: 7px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.transferPRLi > div:nth-child(1) img {
  width: 25px;
  height: 25px;
}

.transfer-mainRight {
  overflow-x: hidden;
  overflow-y: scroll;
}

.transfer-main {
  width: 92%;
  height: 50px;
  font-size: 16px;
  color: #333;
  height: 350px;
  background-color: #f4f6f8;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.transfer-title {
  width: 92%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #333;
}

.transfer-left {
  width: 50%;
  height: 420px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 15px;
}

.transfer-right {
  width: 50%;
  height: 420px;
  padding-left: 15px;
}

.up-content-main {
  height: 430px;
  width: 100%;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-around;
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
  height: 50px;
  width: 100%;
  background-color: #f0f6fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.updatePwd-content {
  width: 90%;
  max-width: 850px;
  min-width: 600px;
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
  opacity: 0;
}

.jurisdictionListLi-left {
  display: flex;
  align-items: center;
  margin-left: 10px;
  height: 50px;
}

.jurisdictionListLi-left img {
  height: 30px;
  width: 30px;
  border-radius: 4px;
}

.jurisdictionListLi-right > div:nth-child(1) {
  width: 20px;
  height: 20px;
  margin-right: 7px;
  cursor: pointer;
}

.jurisdictionListLi-right > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.jurisdictionListLi-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
}

.jurisdictionListLi:nth-child(1) {
  border: 0;
}

.jurisdictionListLi {
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.jurisdiction-r-list ul {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;
}

.jurisdiction-r-list {
  width: 100%;
  min-height: 50px;
  margin-top: 20px;
}

.jd-r-t-right {
  display: flex;
  align-items: center;
  height: 25px;
  color: #38adff;
  margin-right: 14px;
}

.jd-r-t-right > div:nth-child(1) {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.jd-r-t-right > div:nth-child(1) img {
  width: 20px;
  height: 20px;
}

.jurisdiction-r-title {
  display: flex;
  justify-content: space-between;
  height: 25px;
  align-items: center;
  color: #777;
}

.sonm-jurisdiction-right {
  min-height: 100px;
  width: 570px;
  margin-left: 30px;
  overflow: hidden;
}

.sonmanag-jurisdiction {
  display: flex;
  min-height: 100px;
  margin-top: 20px;
}

.sonmanag-jurisdiction .sonm-list-left {
  width: 150px;
  min-height: 100%;
}

.scl-s-left > div {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #38adff;
}

.scl-s-left {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.scopeList-input {
  width: 100%;
  min-height: 35px;
}

.scopeList-input div {
  border: 1px solid #ccc;
  min-height: 25px;
  border-radius: 5px;
  padding-left: 10px;
  cursor: pointer;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  width: 350px;
}

.scopeList-select > div:nth-child(2) {
  margin-left: 10px;
}

.scopeList-select {
  display: flex;
  align-items: center;
  height: 23px;
  width: 100%;
  margin-bottom: 10px;
}

.sonm-scopeList-right {
  min-height: 100px;
  width: 500px;
  margin-left: 30px;
}

.sonmanag-scopeList {
  display: flex;
  min-height: 100px;
  margin-top: 20px;
}

.sonmanag-scopeList .sonm-list-left {
  width: 150px;
  min-height: 100px;
}

.sonmanag-namelist > div:nth-child(2) {
  margin-left: 30px;
}

.sonmanag-namelist > div:nth-child(2) div {
  border: 1px solid #ccc;
  min-height: 25px;
  border-radius: 5px;
  padding-left: 10px;
  cursor: pointer;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  width: 350px;
}

.sonmanag-but > div:nth-child(2) {
  margin-left: 30px;
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

.sonmanag-but {
  margin-top: 25px;
  display: flex;
  height: 35px;
  align-items: center;
}

.sonmanag-namelist {
  display: flex;
  min-height: 35px;
  /* align-items: center; */
}

.sonm-list-left small {
  color: red;
}

.sonm-list-left {
  width: 150px;
  text-align: right;
  color: #333;
  font-size: 14px;
}

.sonmanag-main {
  width: 91%;
  min-height: 80px;
  margin-bottom: 40px;
}

.install-main {
  min-height: 80px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.install-title {
  height: 80px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.install-title > div {
  width: 91%;
  background-color: rgba(56, 173, 255, 0.2);
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.install-title > div > div:nth-child(1) {
  width: 20px;
  height: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;
}

.install-title > div > div:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.install-title > div > div:nth-child(2) {
  margin-left: 10px;
  color: #000;
}

.sonmanag {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  min-height: 400px;
}
</style>