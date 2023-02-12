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
      pageName="suggestion"
      moduleName="suggestion"
    >
      <template #operate="{ row }">
        <el-button
          icon="el-icon-edit"
          size="small"
          type="warning"
          v-if="authority.update"
          @click="hanldeEditClick(row)"
          >回复</el-button
        >
        <el-button
          icon="el-icon-delete"
          size="small"
          type="danger"
          v-if="authority.delete"
          @click="handleDel(row)"
          >删除</el-button
        > </template
      >>
    </PageTable>
    <PageModal
      ref="modalRef"
      pageName="suggestion"
      moduleName="suggestion"
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
// store
import { useStore } from 'vuex'
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
      curDialogConfig.value.title = '反馈回复'
    }
    const [modalRef, modalFormDetail, handleAddClick, hanldeEditClick] =
      usePageModal(null, editCallback)
    // 权限
    const authority = usePermission('system', 'suggestion')
    console.log('authorityS', authority)
    const store = useStore()
    // 删除页面的数据
    const handleDel = (data: any) => {
      store.dispatch(`suggestion/delDataListAction`, {
        pageName: 'suggestion',
        query: {
          id: data.id
        }
      })
    }
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
      handleDel,
      authority
    }
  }
})
</script>

<style lang="less" scoped></style>
