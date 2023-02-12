<template>
  <div class="page-table">
    <JPTable
      :dataList="dataList"
      :dataListTotal="dataListTotal"
      v-model:pageInfo="pageInfo"
      v-bind="tableConfig"
    >
      <template #header>
        <h3>{{ tableConfig.title }}</h3>
        <div class="header-operate">
          <el-button
            type="primary"
            v-if="authority.create"
            @click="handleAddClick"
            >新增</el-button
          >
          <el-button icon="el-icon-refresh"></el-button>
        </div>
      </template>
      <template #createAt="{ row }">
        {{ $filter.formatTime(row.createAt) }}
      </template>
      <template #updateAt="{ row }">
        {{ $filter.formatTime(row.updateAt) }}
      </template>
      <template #operate="{ row }">
        <slot name="operate" :row="row">
          <el-button
            v-if="authority.update || userId === row.id"
            icon="el-icon-edit"
            size="small"
            type="warning"
            @click="handleEditClick(row)"
            >编辑</el-button
          >
          <el-button
            v-if="pageName === 'notice'"
            icon="el-icon-search"
            size="small"
            type="primary"
            @click="handleCheckClick(row)"
            >查看</el-button
          >
          <el-button
            v-if="authority.delete"
            icon="el-icon-delete"
            size="small"
            type="danger"
            @click="handleDel(row)"
            >删除</el-button
          >
        </slot>
      </template>

      <!-- 跨组件插槽 -->
      <template
        v-for="item in otherPropList"
        :key="item.prop"
        #[item.prop]="{ row }"
      >
        <slot :name="item.prop" :row="row"></slot>
      </template>
    </JPTable>
  </div>
</template>

<script lang="ts">
// vue api相关
import { defineComponent, computed, watch, ref, PropType } from 'vue'
// vuex
import { useStore } from '@/store'
// 页面组件相关
import JPTable from '@/base-ui/table'
import { ElMessageBox } from 'element-plus'
// 类型相关
import { ICommonObj } from '@/global/type'
import { ITableConfig } from './types'

export default defineComponent({
  // 用当前组件来发送网络请求，类似于中间层 处理相同的逻辑
  components: {
    JPTable
  },
  emits: ['addClick', 'editClick', 'checkClick'],
  setup(props, { emit }) {
    // 请求用户列表的数据
    const store = useStore()
    // 页面的数据
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })

    // 获取页面的数据
    const getDataList = (param?: ICommonObj) => {
      // 请求用户数据的参数
      const query = {
        offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
        size: pageInfo.value.pageSize,
        ...param
      }
      // dispatch 到store 让它发请求去拿到用户列表数据
      store.dispatch(`${props?.moduleName}/getDataListAction`, {
        pageName: props.pageName,
        query
      })
    }
    // 监听pageInfo的改变 来发送请求
    watch(
      () => pageInfo.value,
      () => {
        getDataList()
      },
      { immediate: true, deep: true }
    )
    // 计算属性监听dataList有没有数据
    const dataList = computed(() =>
      store.getters[`${props?.moduleName}/pageDataList`](props.pageName)
    )
    const dataListTotal = computed(() =>
      store.getters[`${props?.moduleName}/pageDataListTotal`](props.pageName)
    )

    // 新增按钮的点击
    const handleAddClick = () => {
      emit('addClick')
    }

    // 编辑按钮的点击
    const handleEditClick = (data: any) => {
      emit('editClick', data)
    }

    // 查看按钮的点击
    const handleCheckClick = (data: any) => {
      emit('checkClick', data)
    }

    // 删除页面的数据
    const handleDel = (data: any) => {
      ElMessageBox.confirm('确定删除么？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        store.dispatch(`${props?.moduleName}/delDataListAction`, {
          pageName: props.pageName,
          query: {
            id: data.id
          }
        })
      })
    }

    // 除了一些公共的字段的插槽写在这个里面 一些页面专有的字段 写在各自的页面 运用跨组件插槽
    const commonPropName = ['createAt', 'updateAt', 'operate']
    const otherPropList = props.tableConfig.propList.filter(
      (item) => !commonPropName.includes(item.prop)
    )

    // 获取用户的id
    // 用户id
    const userId = computed(() => store?.state?.login?.userInfo?.id)
    return {
      dataList,
      getDataList,
      pageInfo,
      dataListTotal,
      otherPropList,
      handleDel,
      handleAddClick,
      handleEditClick,
      userId,
      handleCheckClick
    }
  },
  props: {
    tableConfig: {
      type: Object as PropType<ITableConfig>,
      required: true
    },
    // 页面的名称 根据这个名称呢来请求相应的数据
    pageName: {
      type: String,
      required: true
    },
    // store模块中的名称
    moduleName: {
      type: String,
      required: true
    },
    authority: {
      type: Object,
      default: () => ({
        create: false,
        delete: false,
        query: false,
        update: false
      })
    }
  }
})
</script>

<style lang="less" scoped>
.page-table {
  margin-top: 20px;
}
</style>
