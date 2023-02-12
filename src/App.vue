<template>
  <div id="app">
    <ElConfigProvider :locale="zhCn">
      <router-view />
    </ElConfigProvider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 国际化1
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// test
export default defineComponent({
  components: {
    ElConfigProvider
  },
  name: 'App',
  setup() {
    return {
      zhCn
    }
  },
  props: {
    name: {
      type: String
    }
  }
})
</script>

<style lang="less">
.app {
  width: 100%;
  height: 100%;
}
</style>
