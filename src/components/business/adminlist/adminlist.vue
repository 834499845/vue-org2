// 管理员操作记录
<template>
    <div class="adminlist">
      <div class="install-title">
          <div>
            管理员操作记录
          </div>
      </div>
      <div class="install-main">

      </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  filters: {},
  created: function() {},
  watch: {},
  methods: {
    ...mapActions([])
  }
};
</script>
<style scoped>
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
.install-main {
  min-height: 70px;
  width: 100%;
}
.adminlist {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  min-height: 700px;
}
</style>