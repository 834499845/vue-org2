<template>
  <div>
    <div class="deleteBox" v-show="deleteBoxShow">
      <transition name="slide-fade">
        <div class="deleteBox-content" v-show="deleteBoxShow">
          <div class="deleteBox-content-title">
            <div>
              删除分组
            </div>
            <div @click="canceldeleteBoxClick">
              X
            </div>
          </div>
          <div class="deleteBox-content-main">
            <div>
              {{delTostVal}}
            </div>
          </div>
          <div class="deleteBox-content-but">
            <div>
            </div>
            <div class="deleteBox-content-butRight">
              <div @click="affirmdeleteBoxClick">
                确定
              </div>
              <div @click="canceldeleteBoxClick">
                取消
              </div>
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
  props: ["deleteBoxShow", "delTostVal"],
  data() {
    return {
      deleteBoxTrue: false
    };
  },
  created: function() {},
  mounted: function() {},
  watch: {
    deleteBoxShow(val) {
      this.deleteBoxTrue = val;
    }
  },
  methods: {
    // 确认
    affirmdeleteBoxClick() {
      this.$emit("canfirm", "1");
    },
    // 取消
    canceldeleteBoxClick() {
      this.$emit("cancel", "2");
    },
    ...mapActions([""])
  }
};
</script>
<style scoped>
/* 删除分组 */

.deleteBox-content-but {
  height: 60px;
  width: 100%;
  background-color: #f0f6fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e5e5e5;
}

.deleteBox-content-butLeft {
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

.deleteBox-content-butRight {
  display: flex;
}

.deleteBox-content-butRight > div:nth-child(2) {
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

.deleteBox-content-butRight > div:nth-child(1) {
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
.deleteBox-content-main > div {
  width: 80%;
  font-size: 15px;
}
.deleteBox-content-main {
  height: 240px;
  width: 100%;
  border-top: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deleteBox-content-title > div:nth-child(1) {
  margin-left: 15px;
}

.deleteBox-content-title > div:nth-child(2) {
  margin-right: 15px;
  font-size: 16px;
  color: #ccc;
  cursor: pointer;
}

.deleteBox-content-title {
  height: 52px;
  width: 100%;
  background-color: #f0f6fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.deleteBox-content {
  width: 450px;
  height: 350px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 70px;
}

.deleteBox {
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

/* 删除分组 */
</style>