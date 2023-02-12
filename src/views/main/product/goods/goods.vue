<template>
  <div class="goods">
    <PageTable :tableConfig="tableConfig" pageName="goods">
      <template #imgUrl="{ row }">
        <el-image
          style="width: 80px; height: 80px"
          :src="row.imgUrl"
          :preview-src-list="[row.imgUrl]"
        >
        </el-image>
      </template>
    </PageTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { tableConfig } from './configs/table-config'
import PageTable from '@/component/page-table'
export default defineComponent({
  name: 'goods',
  components: {
    PageTable
  },
  setup() {
    return {
      tableConfig
    }
  }
})
</script>

<style scoped></style>
