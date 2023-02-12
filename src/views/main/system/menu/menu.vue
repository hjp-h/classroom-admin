<template>
  <div class="menu">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @handleReset="handleReset"
      @handleSearch="handleSearch"
    ></PageSearch>
    <PageTable
      pageName="menu"
      moduleName="system"
      :authority="authority"
      :tableConfig="tableConfig"
      @addClick="handleAddClick"
      @editClick="hanldeEditClick"
    ></PageTable>
    <PageModal
      ref="modalRef"
      pageName="menu"
      moduleName="system"
      :dialogConfig="curDialogConfig"
      :modalFormDetail="modalFormDetail"
    >
    </PageModal>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import PageSearch from '@/component/page-search'
import PageTable from '@/component/page-table'
import PageModal from '@/component/page-modal'
import usePageModal from '@/hooks/usePageModal'
import { searchFormConfig } from './config/search-config'
import { tableConfig } from './config/table-config'
import { dialogConfig } from './config/dialog-config'
import usePageSearch from '@/hooks/usePageSearch'
import usePermission from '@/hooks/usePermission'
export default defineComponent({
  components: {
    PageTable,
    PageSearch,
    PageModal
  },
  setup() {
    const [tableRef, handleReset, handleSearch] = usePageSearch()
    const curDialogConfig = ref({ ...dialogConfig })
    const editCallback = () => {
      curDialogConfig.value.title = '编辑菜单'
    }
    const [modalRef, modalFormDetail, handleAddClick, hanldeEditClick] =
      usePageModal(undefined, editCallback)
    const authority = usePermission('system', 'department')
    return {
      tableRef,
      handleReset,
      handleSearch,
      tableConfig,
      searchFormConfig,
      curDialogConfig,
      modalRef,
      modalFormDetail,
      handleAddClick,
      hanldeEditClick,
      authority
    }
  }
})
</script>

<style scoped></style>
