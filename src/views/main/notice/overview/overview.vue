<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @handleReset="handleReset"
      @handleSearch="handleSearch"
    ></PageSearch>
    <PageTable
      ref="tableRef"
      :authority="authority"
      :tableConfig="tableConfig"
      pageName="notice"
      moduleName="notice"
      @addClick="handleAddClick"
      @editClick="hanldeEditClick"
      @checkClick="handleCheckClick"
    >
    </PageTable>
    <PageModal
      ref="modalRef"
      pageName="notice"
      moduleName="notice"
      :dialogConfig="curDialogConfig"
      :modalFormDetail="modalFormDetail"
    ></PageModal>
  </div>
</template>

<script lang="ts">
// vue api相关
import { defineComponent, ref } from 'vue'
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
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageTable,
    PageModal
  },
  setup() {
    const [tableRef, handleReset, handleSearch] = usePageSearch()
    // 因为要修改dialogConfig的配置项 所以得让它变成响应式的
    const curDialogConfig = ref({ ...dialogConfig })
    // 这部分是页面里面的逻辑 不要在hook中写死
    const editCallback = (): void => {
      curDialogConfig.value.title = '编辑公告'
      curDialogConfig.value.formConfig.formItems =
        curDialogConfig.value?.formConfig?.formItems?.map((item) => ({
          ...item,
          readonly: false
        }))
    }
    const checkCallback = (): void => {
      curDialogConfig.value.title = '公告详情'
      curDialogConfig.value.formConfig.formItems =
        curDialogConfig.value?.formConfig?.formItems?.map((item) => ({
          ...item,
          readonly: true
        }))
    }
    const [
      modalRef,
      modalFormDetail,
      handleAddClick,
      hanldeEditClick,
      handleCheckClick
    ] = usePageModal(null, editCallback, checkCallback)
    // 权限
    const authority = usePermission('system', 'notice')
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
      authority,
      handleCheckClick
    }
  }
})
</script>

<style lang="less" scoped></style>
