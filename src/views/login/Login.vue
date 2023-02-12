<template>
  <div class="login">
    <LoginPannel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPannel from './components/LoginPannel.vue'
export default defineComponent({
  name: '',
  components: {
    LoginPannel
  },
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  // align-items: center;
  background-color: #2d3a4b;
}
</style>
