<template>
  <div class="main">
    <el-container class="container">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :isCollapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header>
          <nav-header
            :isCollapse="isCollapse"
            @handleFoldClick="handleFoldClick"
          ></nav-header>
        </el-header>
        <el-main class="page-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/component/nav-menu'
import NavHeader from '@/component/nav-header'
// defineComponent的作用就是在ts上，可以做类型的限制 props写了什么 setup里面就会有提示
export default defineComponent({
  name: 'Home',
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    // 菜单折叠的标识
    const isCollapse = ref(false)
    const handleFoldClick = (isFold: boolean): void => {
      isCollapse.value = isFold
    }
    return {
      isCollapse,
      handleFoldClick
    }
  }
})
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  .container,
  .page {
    height: 100%;
    .page-content {
      height: calc(100% - 48px);
    }
  }
}
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
