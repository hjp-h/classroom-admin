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
      pageName="goodsApply"
      moduleName="goodsApply"
      @addClick="handleAddClick"
    >
      <template #approve="{ row }">
        {{ formatApprove(row.approve ?? '') }}
      </template>
      <template #operate="{ row }">
        <el-button
          v-if="row.approve === 0 && authority.update"
          icon="el-icon-edit"
          size="small"
          type="warning"
          @click="handleEditClick(row)"
          >审批</el-button
        >
        <el-button
          v-if="authority.delete || row.approve === 0"
          icon="el-icon-delete"
          size="small"
          type="danger"
          @click="handleDel(row)"
          >{{ row.approve === 0 ? '撤回' : '删除' }}</el-button
        >
      </template>
    </PageTable>
    <PageModal
      ref="modalRef"
      pageName="goodsApply"
      moduleName="goodsApply"
      :dialogConfig="curDialogConfig"
      :modalFormDetail="modalFormDetail"
    >
      <template #footer>
        <div v-if="isEdit">
          <el-button type="danger" @click="handleRefuse">拒绝</el-button>
          <el-button type="primary" @click="handleConfirm">同意</el-button>
        </div>
        <div v-else>
          <el-button @click="handleClose">关闭</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </div>
      </template>
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
import { approveList } from './config/common.config'
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
    const isEdit = ref(false)
    const editCallback = (): void => {
      isEdit.value = true
      curDialogConfig.value = getDialogConfig(true)
      curDialogConfig.value.title = '物资申请审批'
    }
    const addCallback = (): void => {
      isEdit.value = false
      curDialogConfig.value = getDialogConfig()
      curDialogConfig.value.title = '新建物资申请单'
      curDialogConfig.value.formConfig.formItems = (
        curDialogConfig.value.formConfig.formItems as []
      ).filter((item: any) => item.field !== 'applicant')
    }
    const [modalRef, modalFormDetail, handleAddClick, handleEditClick] =
      usePageModal(addCallback, editCallback)
    // 权限
    const authority = usePermission('system', 'goodsApply')
    // 格式化type
    const formatApprove = (val: number): string => {
      return approveList.find((item) => item.value === val)?.label ?? ''
    }

    // 删除逻辑
    // 删除页面的数据
    const store = useStore()
    const handleDel = (data: any) => {
      store.dispatch(`goodsApply/delDataListAction`, {
        pageName: 'goodsApply',
        query: {
          id: data.id
        }
      })
    }

    const handleClose = () => {
      const modalRef1 = modalRef as any
      if (modalRef1.value) {
        modalRef1.value.dialogVisible = false
      }
    }

    // 审批逻辑
    const approveCallback = (approve: number) => {
      const modalRef1 = modalRef as any
      const modalFormDetail1 = modalFormDetail as any
      if (modalRef1.value) {
        modalRef1.value.dialogVisible = false
      }
      if (isEdit.value) {
        store.dispatch(`goodsApply/editDataListAction`, {
          pageName: 'goodsApply',
          id: modalFormDetail1?.value?.id,
          query: {
            approve
          }
        })
      } else {
        store.dispatch(`goodsApply/addDataListAction`, {
          pageName: 'goodsApply',
          query: { ...modalRef1?.value?.formData }
        })
      }
    }
    const handleRefuse = () => {
      approveCallback(2)
    }

    // 审批同意逻辑
    const handleConfirm = () => {
      approveCallback(1)
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
      formatApprove,
      handleDel,
      handleRefuse,
      handleConfirm,
      isEdit,
      handleClose,
      authority
    }
  }
})
</script>

<style lang="less" scoped></style>
