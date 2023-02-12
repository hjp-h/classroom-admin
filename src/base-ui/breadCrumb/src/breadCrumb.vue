<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadCrumbItemList" :key="item.name">
      <el-breadcrumb-item :to="{ path: item.url ?? '' }">{{
        item.name
      }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { breadCrumbItem } from '../type/index'
export default defineComponent({
  props: {
    breadCrumbItemList: {
      type: Array as PropType<breadCrumbItem[]>,
      default: () => []
    }
  }
})
</script>

<style lang="less" scoped></style>
