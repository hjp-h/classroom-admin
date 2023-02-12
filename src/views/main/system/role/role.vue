<template>
  <div class="role">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <PageTable
      pageName="role"
      moduleName="system"
      :authority="authority"
      :tableConfig="tableConfig"
      @addClick="handleAddClick"
      @editClick="hanldeEditClick"
    ></PageTable>
    <PageModal
      ref="modalRef"
      pageName="role"
      moduleName="system"
      :otherInfo="otherInfo"
      :dialogConfig="curDialogConfig"
      :modalFormDetail="modalFormDetail"
    >
      <el-tree
        ref="elTreeRef"
        :data="menuData"
        show-checkbox
        node-key="id"
        @check="handleCheckChange"
        :props="{
          children: 'children',
          label: 'name'
        }"
      />
    </PageModal>
  </div>
</template>

<script lang="ts">
// vue api相关
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
// 页面组件相关
import PageSearch from '@/component/page-search'
import PageTable from '@/component/page-table'
import PageModal from '@/component/page-modal'
import { ElTree } from 'element-plus'
// hook
// import usePageSearch from '@/hooks/usePageSearch'
import usePageModal from '@/hooks/usePageModal'
import usePermission from '@/hooks/usePermission'
// 配置项相关
import { searchFormConfig } from './config/search-config'
import { tableConfig } from './config/table-config'
import { dialogConfig } from './config/dialog-config'

import { mapMenuToIds } from '@/utils/menuMap'
export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageTable,
    PageModal
  },
  setup() {
    // 菜单分配相关
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const curDialogConfig = ref({ ...dialogConfig })
    const store = useStore()
    const otherInfo = ref({})
    const menuData = computed(() => store.state.allMenu)
    const handleCheckChange = (data1: any, data2: any) => {
      const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    // 编辑的回调函数
    const editCallback = (data: any): void => {
      const leftKeys: number[] = mapMenuToIds(data.menuList)
      curDialogConfig.value.title = '编辑角色'
      console.log('leftKeys', leftKeys)
      // elTreeRef还没那么快有值 因为编辑先点 页面后出
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leftKeys, false)
      })
    }

    // 页面hook
    const [modalRef, modalFormDetail, handleAddClick, hanldeEditClick] =
      usePageModal(undefined, editCallback)
    const authority = usePermission('system', 'role')
    return {
      searchFormConfig,
      tableConfig,
      curDialogConfig,
      modalRef,
      modalFormDetail,
      handleAddClick,
      hanldeEditClick,
      elTreeRef,
      menuData,
      handleCheckChange,
      otherInfo,
      authority
    }
  }
})
</script>

<style scoped></style>
