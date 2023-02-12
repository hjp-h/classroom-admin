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
      pageName="comment"
      moduleName="comment"
      @addClick="handleAddClick"
    >
      <template #operate="{ row }">
        <el-button
          v-if="authority.update"
          icon="el-icon-edit"
          size="small"
          type="warning"
          @click="handleEditClick(row)"
          >回复</el-button
        >
        <el-button
          v-if="authority.delete"
          icon="el-icon-delete"
          size="small"
          type="danger"
          @click="handleDel(row)"
          >删除</el-button
        >
      </template>
    </PageTable>
    <PageModal
      ref="modalRef"
      pageName="comment"
      moduleName="comment"
      :dialogConfig="curDialogConfig"
      :modalFormDetail="modalFormDetail"
    >
    </PageModal>
  </div>
</template>

<script lang="ts">
// vue api相关
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
// 配置相关
import { searchFormConfig } from './config/search-config'
import { tableConfig } from './config/table-config'
import { getDialogConfig } from './config/dialog-config'
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
    const curDialogConfig = ref({ ...getDialogConfig() })

    // 这部分是页面里面的逻辑 不要在hook中写死
    const editCallback = (): void => {
      curDialogConfig.value = getDialogConfig(true)
      curDialogConfig.value.title = '评论回复'
      curDialogConfig.value.formConfig.formItems.push({
        field: 'reply',
        type: 'textarea',
        otherOptions: {
          rows: 2
        },
        label: '回复内容',
        placeholder: '请输入回复'
      })
    }
    const addCallback = (): void => {
      curDialogConfig.value = getDialogConfig()
      curDialogConfig.value.title = '新建评论'
    }
    const [modalRef, modalFormDetail, handleAddClick, handleEditClick] =
      usePageModal(addCallback, editCallback)
    // 权限
    const authority = usePermission('system', 'comment')
    // 删除逻辑
    // 删除页面的数据
    const store = useStore()
    const handleDel = (data: any) => {
      store.dispatch(`comment/delDataListAction`, {
        pageName: 'comment',
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
      handleEditClick,
      modalFormDetail,
      handleDel,
      authority
    }
  }
})
</script>

<style lang="less" scoped></style>
