<!--培训资料-->
<template>
  <div class="addInformation">
    <router-view keep-alive></router-view>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      titleVal: "培训资料"
    };
  },
  filters: {},
  created: function() {},
  mounted() {},
  methods: {
    ...mapActions(["uploadFile", "getapinoticeinsertnoticepage"])
  },
  watch: {}
};
</script>
<style scoped>
.addInformation {
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
  min-height: 400px;
  border: 1px solid red;
}
</style>