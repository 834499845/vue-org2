<template>
    <div class="login" id="loginCLick">
      <div class="loginMain">
        <div class="loginMainOne">
          <div class="loginMainOneTop" v-if="verificationShow">
            账号不能为空
          </div>
          <div class="loginMainOneBot">
            伯通管理端登录
          </div>
        </div>
        <div class="loginMaininputAccout">
            <input type="text" placeholder="账号">
        </div>
        <div class="loginMaininputPwd">
            <input type="text" placeholder="密码">
        </div>
        <!-- <div class="loginMaininputCode">
            <div>
              <input type="text" placeholder="验证码">
            </div>
            <div>
              <img src="" alt="">
            </div>
        </div> -->
        <div class="loginMaininputBut" @click="loginClick">
            登录
        </div>
      </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      verificationShow: false,
      loginClickTrue: false
    };
  },
  filters: {},
  created: function() {
    var self = this;
  },
  watch: {},
  mounted() {
    document.onkeydown = function() {
      console.log("1111");
    };
  },
  methods: {
    // 登录
    loginClick() {
      var self = this;
      if (self.loginClickTrue == false) {
        self.loginClickTrue = true;
        self
          .getapipassportuserloginpwd({})
          .then(data => {
            self.loginClickTrue = false;
            if (data.statusCode == 200) {
            } else {
              self.$message({
                type: "info",
                message: data.message
              });
            }
          })
          .catch(msg => {
            self.loginClickTrue = false;
            self.$message({
              type: "info",
              message: "服务器异常"
            });
          });
      }
    },
    ...mapActions(["getapipassportuserloginpwd"])
  }
};
</script>
<style scoped>
.loginMainOneTop {
  width: 406px;
  height: 48px;
  background: rgba(234, 98, 98, 0.4);
  font-size: 16px;
  color: rgba(234, 98, 98, 1);
  text-align: center;
  line-height: 48px;
  position: absolute;
  top: 0px;
  left: 0;
}
.loginMainOneBot {
  height: 36px;
  font-size: 36px;
  color: rgba(67, 144, 225, 1);
  line-height: 36px;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50px;
  left: 0;
}
.loginMainOne {
  height: 86px;
  position: relative;
  overflow: hidden;
}
.loginMaininputBut {
  width: 358px;
  height: 48px;
  background: rgba(67, 144, 225, 1);
  border-radius: 2px;
  margin: 0 auto;
  font-size: 18px;
  color: rgba(255, 255, 255, 1);
  margin-top: 50px;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
}
.loginMaininputCode > div:nth-child(1) {
  width: 238px;
  height: 48px;
}
.loginMaininputCode > div:nth-child(2) {
  width: 120px;
  height: 48px;
  background: rgba(199, 199, 199, 1);
  cursor: pointer;
}
.loginMaininputCode > div:nth-child(1) input {
  width: 222px;
  height: 48px;
  padding-left: 16px;
  font-size: 16px;
}
.loginMaininputCode {
  display: flex;
  width: 358px;
  height: 48px;
  border-radius: 2px;
  background-color: #fff;
  margin: 0 auto;
  border: 1px solid #e3e3e3;
  margin-top: 40px;
  display: flex;
  align-items: center;
}
.loginMaininputAccout input,
.loginMaininputPwd input {
  height: 32px;
  width: 330px;
  padding-left: 16px;
  font-size: 16px;
  color: rgba(44, 44, 44, 1);
}
.loginMaininputAccout {
  display: flex;
  width: 358px;
  height: 48px;
  border-radius: 2px;
  background-color: #fff;
  margin: 0 auto;
  border: 1px solid #e3e3e3;
  margin-top: 40px;
  display: flex;
  align-items: center;
}
.loginMaininputPwd {
  display: flex;
  width: 358px;
  height: 48px;
  border-radius: 2px;
  background-color: #fff;
  margin: 0 auto;
  border: 1px solid #e3e3e3;
  margin-top: 30px;
  display: flex;
  align-items: center;
}

.loginMain {
  position: absolute;
  top: calc(50% - 260px);
  right: 164px;
  background-color: #fff;
  width: 406px;
  height: 460px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  background-color: #fff;
  border-radius: 2px;
  overflow: hidden;
}
.login {
  width: 100%;
  position: relative;
  min-height: 100vh;
  background: url("/static/img/Grou4.png") no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
</style>