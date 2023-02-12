<template>
  <div class="login-account">
    <el-form
      :rules="rules"
      ref="formRef"
      :model="account"
      class="login-form"
      label-position="left"
    >
      <el-form-item prop="name">
        <span class="svg-container">
          <el-icon><user-filled /></el-icon>
        </span>
        <el-input
          ref="username"
          placeholder="请输入账号"
          v-model="account.name"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          :input-style="inputStyle"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <el-icon><lock /></el-icon>
        </span>
        <el-input
          ref="password"
          placeholder="请输入密码"
          name="password"
          v-model="account.password"
          tabindex="2"
          auto-complete="on"
          :input-style="inputStyle"
          show-password
        />
      </el-form-item>
      <div class="select-box">
        <el-checkbox v-model="isKeepPassword" label="记住密码"></el-checkbox>
        <el-link type="primary">忘记密码?</el-link>
      </div>
      <el-button class="login-btn" type="primary" @click="handleAccountLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { UserFilled, Lock } from '@element-plus/icons'
import { ElLink, ElForm, ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { accountRules } from '../config'
import localCache from '../../../utils/localCache'
export default defineComponent({
  name: '',
  components: {
    UserFilled,
    Lock,
    ElLink
  },
  setup() {
    const account = reactive({
      name: localCache.getItem('username') ?? '',
      password: localCache.getItem('password') ?? ''
    })
    // 技巧
    /**
     * 通过ref拿到某个元素时 const formRef = ref<InstanceType<typeof form>>(null)
     * 要传入<InstanceType<typeof form>> 进一步做到类型的限制
     * 再去调用里面的方法 formRef.value.loginAction()
     */
    const isKeepPassword = ref(false)
    const rules = accountRules
    const formRef = ref<InstanceType<typeof ElForm>>()
    const store = useStore()
    const handleAccountLogin = () => {
      // 通过表单来验证输入的内容是否合法
      formRef.value?.validate((isValid) => {
        if (isValid) {
          // 1.记住密码
          if (isKeepPassword.value) {
            console.log('password', account.password)
            localCache.setItem('username', account.name)
            localCache.setItem('password', account.password)
          } else {
            localCache.removeItem('username')
            localCache.removeItem('password')
          }
          ElMessage({
            message: '账户登录中...',
            type: 'success'
          })
          console.log('account', account)
          store.dispatch('login/accountLoginAction', { ...account })
        } else {
          ElMessage({
            message: '登录失败！账号或密码不正确！',
            type: 'error'
          })
        }
      })
    }
    return {
      account,
      inputStyle: {
        backgroundColor: 'transparent',
        paddingTop: '3px',
        border: 'none',
        color: '#eee'
      },
      rules,
      isKeepPassword,
      formRef,
      handleAccountLogin
    }
  }
})
</script>
<style lang="less" scoped>
@bg: #283443;
@light_gray: #fff;
@cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-account .el-input input {
    color: @cursor;
  }
}

/* reset element-ui css */
.login-account {
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
.login-account {
  .login-form {
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    .svg-container {
      padding: 8px 5px 6px 15px;
      color: #889aa4;
      vertical-align: middle;
      width: 20px;
      display: inline-block;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #889aa4;
      cursor: pointer;
      user-select: none;
    }
    .select-box {
      display: flex;
      justify-content: space-between;
      margin: 5px 0;
    }
    .login-btn {
      width: 100%;
      margin-bottom: 30px;
      font-size: 18px;
    }
  }
}
</style>
