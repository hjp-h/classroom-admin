<template>
  <div class="hy-table">
    <!-- 头部选项 标题➕操作项 -->
    <div class="header">
      <slot name="header">
        <h3>{{ title }}</h3>
        <div class="header-operate">
          <el-button type="primary">新增</el-button>
          <el-button icon="el-icon-refresh"></el-button>
        </div>
      </slot>
    </div>
    <el-table
      :data="dataList"
      :border="true"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <!-- 选择列 -->
      <el-table-column
        v-if="isShowSelectionColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <!-- 索引列 -->
      <el-table-column
        v-if="isShowIndexColumn"
        type="index"
        align="center"
        label="序号"
        width="80"
      >
      </el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column align="center" v-bind="item" show-overflow-tooltip>
          <!-- default为默认的插槽名字 然后在其里面再定义一层插槽
               外界使用的时候就可以根据列名对应的插槽实现自定义的效果 -->
          <template #default="{ row }">
            <slot :name="(item as any).prop" :row="row">
              {{ row[(item as any).prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 底部插槽 主要是分页 -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :currentPage="pageInfo.currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataListTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  emits: ['selectionChange', 'update:pageInfo'],
  setup(props, { emit }) {
    const handleSelectionChange = (val: any) => {
      emit('selectionChange', val)
    }
    const handleSizeChange = (size: number) => {
      emit('update:pageInfo', { ...props.pageInfo, pageSize: size })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:pageInfo', { ...props.pageInfo, currentPage })
    }
    return {
      handleSelectionChange,
      currentPage4: ref(4),
      handleSizeChange,
      handleCurrentChange
    }
  },
  props: {
    dataList: {
      type: Array,
      required: true
    },
    pageInfo: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    dataListTotal: {
      type: Number,
      default: 10
    },
    propList: {
      type: Array,
      required: true
    },
    isShowSelectionColumn: {
      type: Boolean,
      default: false
    },
    isShowIndexColumn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style lang="less" scoped>
.hy-table {
  background-color: white;
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
  }
  .footer {
    display: flex;
    flex-direction: row-reverse;
    padding-top: 20px;
  }
}
</style>
