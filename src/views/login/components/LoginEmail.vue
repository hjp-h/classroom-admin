<template>
  <div class="login-email">
    <el-form
      :rules="rules"
      ref="loginForm"
      :model="emailAccount"
      class="login-form"
      label-position="left"
    >
      <el-form-item prop="email">
        <span class="svg-container">
          <el-icon><message /></el-icon>
        </span>
        <el-input
          ref="email"
          placeholder="请输入邮箱"
          v-model="emailAccount.email"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
          :input-style="inputStyle"
        />
      </el-form-item>
      <el-form-item prop="verifyCode">
        <span class="svg-container">
          <el-icon><lock /></el-icon>
        </span>
        <el-input
          ref="verifyCode"
          placeholder="请输入验证码"
          v-model="emailAccount.verifyCode"
          name="verifyCode"
          tabindex="2"
          auto-complete="on"
          :input-style="inputStyle"
        />
        <el-button class="verify-btn" type="primary">发送验证码</el-button>
      </el-form-item>
      <el-button class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Lock, Message } from '@element-plus/icons'
import { emailRules } from '../config'
export default defineComponent({
  name: '',
  components: {
    Lock,
    Message
  },
  setup() {
    const emailAccount = reactive({
      email: '',
      verifyCode: ''
    })
    const rules = emailRules
    return {
      inputStyle: {
        backgroundColor: 'transparent',
        paddingTop: '3px',
        border: 'none',
        color: '#eee'
      },
      emailAccount,
      rules
    }
  }
})
</script>
<style lang="less" scoped>
@bg: #283443;
@light_gray: #fff;
@cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-email .el-input input {
    color: @cursor;
  }
}

/* reset element-ui css */
.login-email {
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
  }
}
/*自定义样式 */
.login-email {
  .svg-container {
    padding: 8px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 20px;
    display: inline-block;
  }
  .verify-btn {
    position: absolute;
    width: 100px;
    padding: 5px;
    top: 6px;
    right: 10px;
  }
  .login-btn {
    width: 100%;
    margin-bottom: 30px;
    font-size: 18px;
  }
}
</style>
