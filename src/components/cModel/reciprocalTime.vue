<template>
     <div>
        <div id='Component-textAuthenticationCode' @click="countDown">{{time | change}}</div>
     </div>
</template>

<script>
let flag = false;
export default {
  data() {
    return {
      time: "获取验证码",
      timeClickTrue: false // 防重复
    };
  },
  props: {
    start: {
      type: Boolean
    }
  },
  watch: {},
  methods: {
    countDown() {
      if (this.timeClickTrue == false) {
        this.timeClickTrue = true;
        this.time = 6;
        let time = setInterval(() => {
          this.time--;
          if (this.time == 0) {
            this.$emit("countDownEnd");
            this.time = "获取验证码";
            flag = true;
            clearInterval(time);
            this.timeClickTrue = false;
          }
        }, 1000);
      } else {
        console.log("请稍等");
      }
    }
  },
  filters: {
    change(value) {
      if (!value) return "";
      if (!isNaN(value)) {
        if (flag == true) {
          return `${value}S后重新发送`;
        }
        return value + "S后重新发送";
      } else {
        return value;
      }
    }
  }
};
</script>
<style>
#Component-textAuthenticationCode {
  width: 100px;
  height: 35px;
  border-radius: 5px;
  font-size: 13px;
  color: #fff;
  background-color: #38adff;
  line-height: 35px;
  text-align: center;
  user-select: none;
  margin-right: 10px;
  overflow: hidden;
  border: 0;
  cursor: pointer;
}
</style>