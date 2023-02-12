<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @handleReset="handleReset"
      @handleSearch="handleSearch"
    ></PageSearch>
    <PageTable
      ref="tableRef"
      :tableConfig="tableConfig"
      :authority="authority"
      pageName="department"
      moduleName="system"
      @addClick="handleAddClick"
      @editClick="hanldeEditClick"
    >
      <template #enable="{ row }">
        <el-button
          size="mini"
          plain
          :type="row.enable === 0 ? 'error' : 'success'"
          >{{ row.enable === 0 ? '禁用' : '启用' }}</el-button
        >
      </template>
    </PageTable>
    <PageModal
      ref="modalRef"
      pageName="department"
      moduleName="system"
      :dialogConfig="curDialogConfig"
      :modalFormDetail="modalFormDetail"
    ></PageModal>
  </div>
</template>

<script lang="ts">
// vue api相关
import { defineComponent, ref, watch } from 'vue'
// 配置相关
import { searchFormConfig } from './config/search-config'
import { tableConfig } from './config/table-config'
import { dialogConfig } from './config/dialog-config'
// 页面组件相关
import PageSearch from '@/component/page-search'
import PageTable from '@/component/page-table'
import PageModal from '@/component/page-modal'
// hook
import usePermission from '@/hooks/usePermission'
import usePageSearch from '@/hooks/usePageSearch'
import usePageModal from '@/hooks/usePageModal'
// vuex相关
import { useStore } from '@/store'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageTable,
    PageModal
  },
  setup() {
    const [tableRef, handleReset, handleSearch] = usePageSearch()
    const store = useStore()
    // 因为要修改dialogConfig的配置项 所以得让它变成响应式的
    const curDialogConfig = ref({ ...dialogConfig })

    watch(
      () => store.state.allDepartment,
      () => {
        // 如果这部分逻辑不写在watch里面 会出现选项其实有值 但是数据不显示的情况
        // 原因是store里请求数据是异步的 数据慢于视图的渲染
        // 而computed可以根据store.state的依赖来更新数据

        const parentIdItem = curDialogConfig.value.formConfig.formItems.find(
          (item) => item.field === 'parentId'
        )
        parentIdItem!.options = store.state.allDepartment.map((item) => {
          return { label: item.name, value: item.id }
        })
      },
      { deep: true, immediate: true }
    )
    // 这部分是页面里面的逻辑 不要在hook中写死
    const editCallback = () => {
      curDialogConfig.value.title = '编辑部门'
    }
    const [modalRef, modalFormDetail, handleAddClick, hanldeEditClick] =
      usePageModal(undefined, editCallback)
    const authority = usePermission('system', 'department')
    console.log('authority', authority)
    return {
      searchFormConfig,
      tableConfig,
      handleReset,
      handleSearch,
      tableRef,
      curDialogConfig,
      modalRef,
      handleAddClick,
      hanldeEditClick,
      modalFormDetail,
      authority
    }
  }
})
</script>

<style lang="less" scoped></style>
