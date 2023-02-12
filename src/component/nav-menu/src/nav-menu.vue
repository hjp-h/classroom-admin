<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/nav_logo.svg" alt="logo" />
      <span v-show="!isCollapse" class="title">校园课室管理智慧平台</span>
    </div>
    <el-menu
      active-text-color="#1296db"
      background-color="#001529"
      class="el-menu-vertical"
      :default-active="activeMenuId"
      :collapse="isCollapse"
      text-color="#fff"
    >
      <template v-for="item in userMenu">
        <!-- 一级菜单 -->
        <el-menu-item
          v-if="item.type === 2"
          :index="item.id + ''"
          :key="item.id"
          @click="handleMenuClick(item)"
        >
          <i v-if="item.icon" :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </el-menu-item>
        <!-- 二级菜单 -->
        <template v-else-if="item.type === 1">
          <el-submenu :index="item.id + ''" :key="item.id">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的subitem -->
            <div v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleMenuClick(subItem)"
              >
                <i v-if="subItem.icon" :class="subItem.icon"></i>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </div>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router'
import { mapRouteToUserMenu } from '@/utils/menuMap'
export default defineComponent({
  setup() {
    const store = useStore()
    const userMenu = computed(() => store.state.login.userMenu)
    const router = useRouter()
    const handleMenuClick = function (menuItem: any) {
      router.push({ path: menuItem.url ?? '/not-found' })
    }
    // 当前路径活跃的菜单id
    const activeMenuId = ref('')
    // 解决当前路径刷新时 右侧菜单不匹配的问题
    const route = useRoute().path
    activeMenuId.value = mapRouteToUserMenu(route, userMenu.value).id + ''
    console.log(route, activeMenuId.value)
    return {
      userMenu,
      handleMenuClick,
      activeMenuId
    }
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 9px 8px 9px;
    justify-content: flex-start;
    align-items: center;
    img {
      height: 100%;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu-vertical {
    width: 100%;
  }
  .el-menu {
    border-right: none;
  }
}
</style>
