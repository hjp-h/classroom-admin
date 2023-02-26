<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="getSearchFormConfig(optionsMap)"
      @handleReset="handleReset"
      @handleSearch="handleSearch"
    ></PageSearch>
    <PageTable
      ref="tableRef"
      :authority="authority"
      :tableConfig="tableConfig"
      pageName="maintenance"
      moduleName="maintenance"
      @addClick="handleAddClick"
    >
      <template #type="{ row }">
        {{ formatType(row.type ?? '') }}
      </template>
      <template #approve="{ row }">
        {{ formatApprove(row.approve ?? '') }}
      </template>
      <template #status="{ row }">
        {{ formatStatus(row.status ?? '') }}
      </template>
      <template #degree="{ row }">
        {{ formatDegree(row.degree ?? '') }}
      </template>
      <template #isUrgent="{ row }">
        {{ formatUrgent(row.isUrgent ?? '') }}
      </template>
      <template #img="{ row }">
        <el-image
          style="width: 80px; height: 80px"
          :src="row.img"
          :preview-src-list="[row.img]"
        >
        </el-image>
      </template>
      <template #operate="{ row }">
        <el-button
          icon="el-icon-edit"
          size="small"
          type="primary"
          v-if="row.status === 1"
          @click="handleCheckClick(row)"
          >确认完成</el-button
        >
        <el-button
          v-if="row.approve === 0 && authority.update"
          icon="el-icon-edit"
          size="small"
          type="warning"
          @click="handleEditClick(row)"
          >审批</el-button
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
      pageName="maintenance"
      moduleName="maintenance"
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
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
// 配置相关
import { getSearchFormConfig } from './config/search-config'
import { tableConfig } from './config/table-config'
import { getDialogConfig } from './config/dialog-config'
import {
  maintainTypeList,
  statusList,
  degreeList,
  approveList,
  urgentList
} from './config/common.config'
// 页面组件相关
import PageSearch from '@/component/page-search'
import PageTable from '@/component/page-table'
import PageModal from '@/component/page-modal'
// hook
import usePermission from '@/hooks/usePermission'
import usePageSearch from '@/hooks/usePageSearch'
import usePageModal from '@/hooks/usePageModal'
// service 获取用户列表
import { getPageList } from '../../../../service/main/system/system'
import { getClassroomListReq } from '@/service/main/classroom'
import { ICommonObj } from '@/global/type'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageTable,
    PageModal
  },
  setup() {
    // 获取下拉选项
    const optionsMap = ref<ICommonObj>({})
    const getClassroomList = async () => {
      const { data } = await getClassroomListReq({})
      return data
    }

    onMounted(async () => {
      const classroomList = await getClassroomList()
      optionsMap.value = { ...optionsMap.value, classroomList }
    })

    const [tableRef, handleReset, handleSearch] = usePageSearch()
    // 因为要修改dialogConfig的配置项 所以得让它变成响应式的
    const curDialogConfig = ref({ ...getDialogConfig(false, optionsMap.value) })

    // 获取维修工列表
    let processorList: any[] = []
    const getUserList = async () => {
      const { code, data } = await getPageList('/users/role/3', {})
      if (code === 200) {
        processorList = (data as any[]).map((item) => ({
          value: item.id,
          label: item.name
        }))
        console.log('processorList', processorList)
      }
    }
    getUserList()
    // 这部分是页面里面的逻辑 不要在hook中写死
    const isEdit = ref(false)
    const editCallback = (): void => {
      isEdit.value = true
      isCheck.value = false
      curDialogConfig.value = getDialogConfig(true, optionsMap.value)
      curDialogConfig.value.title = '维修单审批'
      const processorItem: any = (
        curDialogConfig.value.formConfig.formItems as []
      ).find((item: any) => item.field === 'processor')
      processorItem.options = processorList
    }
    const addCallback = (): void => {
      isEdit.value = false
      curDialogConfig.value = getDialogConfig(false, optionsMap.value)
      curDialogConfig.value.title = '新建维修单'
    }
    const isCheck = ref(false)
    const checkCallback = (): void => {
      isEdit.value = false
      isCheck.value = true
      curDialogConfig.value = getDialogConfig(true, optionsMap.value)
      curDialogConfig.value.title = '完工确认'
      const processorItem: any = (
        curDialogConfig.value.formConfig.formItems as []
      ).find((item: any) => item.field === 'processor')
      processorItem.options = processorList
    }
    const [
      modalRef,
      modalFormDetail,
      handleAddClick,
      handleEditClick,
      handleCheckClick
    ] = usePageModal(addCallback, editCallback, checkCallback)
    // 权限
    const authority = usePermission('system', 'maintenance')
    console.log('authority', authority)
    // 格式化type
    const formatType = (val: number): string => {
      return maintainTypeList.find((item) => item.value === val)?.label ?? ''
    }
    const formatStatus = (val: number): string => {
      return statusList.find((item) => item.value === val)?.label ?? ''
    }
    const formatDegree = (val: number): string => {
      return degreeList.find((item) => item.value === val)?.label ?? ''
    }
    const formatApprove = (val: number): string => {
      return approveList.find((item) => item.value === val)?.label ?? ''
    }
    const formatUrgent = (val: number): string => {
      return urgentList.find((item) => item.value === val)?.label ?? ''
    }

    // 删除逻辑
    // 删除页面的数据
    const store = useStore()
    const handleDel = (data: any) => {
      store.dispatch(`maintenance/delDataListAction`, {
        pageName: 'maintenance',
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
    const approveCallback = (approve: number, status = 0) => {
      const modalRef1 = modalRef as any
      const modalFormDetail1 = modalFormDetail as any
      if (modalRef1.value) {
        modalRef1.value.dialogVisible = false
      }
      if (isEdit.value || isCheck.value) {
        const processor = modalRef1?.value?.formData?.processor
        store.dispatch(`maintenance/editDataListAction`, {
          pageName: 'maintenance',
          id: modalFormDetail1?.value?.id,
          query: {
            processor:
              typeof processor === 'number'
                ? processor
                : processorList.find((item) => item.label === processor)?.value,
            approve,
            status
          }
        })
      } else {
        store.dispatch(`maintenance/addDataListAction`, {
          pageName: 'maintenance',
          query: { ...modalRef1?.value?.formData }
        })
      }
    }
    const handleRefuse = () => {
      approveCallback(2)
    }

    // 审批同意逻辑
    const handleConfirm = () => {
      isCheck.value ? approveCallback(1, 2) : approveCallback(1, 1)
    }

    return {
      getSearchFormConfig,
      tableConfig,
      handleReset,
      handleSearch,
      tableRef,
      curDialogConfig,
      modalRef,
      handleAddClick,
      handleEditClick,
      modalFormDetail,
      formatType,
      formatStatus,
      formatDegree,
      formatApprove,
      formatUrgent,
      handleDel,
      handleRefuse,
      handleConfirm,
      handleClose,
      isEdit,
      authority,
      handleCheckClick,
      optionsMap
    }
  }
})
</script>

<style lang="less" scoped></style>
