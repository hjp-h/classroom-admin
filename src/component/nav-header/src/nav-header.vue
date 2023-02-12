<template>
  <div class="nav-header">
    <div class="operate-container">
      <div class="fold-container" @click="foldClick">
        <el-icon v-if="!isCollapse" :size="24"><fold /></el-icon>
        <el-icon v-else :size="24"><expand /></el-icon>
      </div>
      <JPBreadCrumb :breadCrumbItemList="breadCrumbItemList" />
    </div>

    <div class="info-container">
      <el-avatar
        size="small"
        :src="require('../../../assets/img/avatar.jpeg')"
      ></el-avatar>
      <el-dropdown style="margin-left: 5px; cursor: pointer">
        <span class="el-dropdown-link"> HJPCoder </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>设置中心</el-dropdown-item>
            <el-dropdown-item divided @click="handleExit"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
// vue api相关
import { defineComponent, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store/index'
// icon图表
import { Fold, Expand } from '@element-plus/icons'
// 组件相关
import JPBreadCrumb from '@/base-ui/breadCrumb'
// 工具类
import { mapRouteToBreadcrumb } from '@/utils/menuMap'
import localCache from '@/utils/localCache'
export default defineComponent({
  components: {
    Fold,
    Expand,
    JPBreadCrumb
  },
  setup(props, { emit }) {
    // 菜单折叠功能
    const isFold = ref(false)
    const foldClick = (): void => {
      isFold.value = !isFold.value
      emit('handleFoldClick', isFold.value)
    }
    // 当前面包屑的值
    const breadCrumbItemList = computed(() => {
      const curPath = useRoute().path
      const userMenu = useStore().state.login.userMenu
      return mapRouteToBreadcrumb(curPath, userMenu)
    })

    // 退出登陆
    const router = useRouter()
    const handleExit = () => {
      localCache.removeItem('token')
      router.push('/main')
    }
    return {
      foldClick,
      breadCrumbItemList,
      handleExit
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
.nav-header {
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .operate-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .fold-container {
      width: 30px;
    }
  }

  .info-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
