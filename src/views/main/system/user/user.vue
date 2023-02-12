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
      pageName="users"
      moduleName="system"
      @addClick="handleAddClick"
      @editClick="hanldeEditClick"
    >
      <template #enable="{ row }">
        <el-button
          size="mini"
          plain
          :type="row.enable == 0 ? 'danger' : 'success'"
          >{{ row.enable == 0 ? '禁用' : '启用' }}</el-button
        >
      </template>
    </PageTable>
    <PageModal
      ref="modalRef"
      pageName="users"
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
      (newVal) => {
        // 如果这部分逻辑不写在watch里面 会出现选项其实有值 但是数据不显示的情况
        // 原因是store里请求数据是异步的 数据慢于视图的渲染
        // 而computed可以根据store.state的依赖来更新数据

        // 给部门和角色表单项添加选项
        console.log('department', newVal)
        const departmentItem = curDialogConfig.value.formConfig.formItems.find(
          (item) => item.field === 'departmentId'
        )
        departmentItem!.options = newVal.map((item) => ({
          label: item.name,
          value: item.id
        }))
        const roleItem = curDialogConfig.value.formConfig.formItems.find(
          (item) => item.field === 'roleId'
        )
        roleItem!.options = store.state.allRole.map((item) => ({
          label: item.name,
          value: item.id
        }))
      },
      { deep: true, immediate: true }
    )

    // 在hook中对某些表单项进行显示与隐藏
    const addCallback = () => {
      const passwordItem = curDialogConfig.value.formConfig.formItems.find(
        (item) => item.type === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      curDialogConfig.value.title = '编辑用户'
      const passwordItem = curDialogConfig.value.formConfig.formItems.find(
        (item) => item.type === 'password'
      )
      passwordItem!.isHidden = true
    }
    // 这部分是页面里面的逻辑 不要在hook中写死
    const [modalRef, modalFormDetail, handleAddClick, hanldeEditClick] =
      usePageModal(addCallback, editCallback)
    const authority = usePermission('system', 'users')

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
