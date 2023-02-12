<template>
  <div class="login-pannel">
    <div class="title-container">
      <h3 class="title">校园课室管理系统</h3>
    </div>
    <el-tabs stretch v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="账号登录" name="first">
        <LoginAccount />
      </el-tab-pane>
      <el-tab-pane label="邮箱登录" name="second">
        <LoginEmail />
      </el-tab-pane>
    </el-tabs>
    <!-- <div class="tips">
      <span style="margin-right: 20px">username: admin</span>
      <span> password: any</span>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginEmail from './LoginEmail.vue'
export default defineComponent({
  name: '',
  components: {
    LoginAccount,
    LoginEmail
  },
  setup() {
    return {
      activeName: 'first'
    }
  }
})
</script>
<style lang="less" scoped>
@bg: #283443;
@light_gray: #fff;
@cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container .el-input input {
    color: @cursor;
  }
}

/* reset element-ui css */
.login-pannel {
  /deep/.el-tabs__item {
    color: #eee;
  }
  /deep/.is-active {
    color: #409eff;
  }
}
/*自定义样式 */
.login-pannel {
  min-height: 50%;
  width: 30%;
  margin-top: 150px;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 65%;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
    .login-btn {
      width: 100%;
      margin-bottom: 30px;
      font-size: 18px;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
