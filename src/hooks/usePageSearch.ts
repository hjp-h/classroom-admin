import { ref } from 'vue'
import PageTable from '@/component/page-table'
import { ICommonObj } from '@/global/type'
export default function () {
  const tableRef = ref<InstanceType<typeof PageTable>>()
  // 重置的按钮
  const handleReset = () => {
    tableRef.value?.getDataList()
  }
  // 搜索的按钮
  const handleSearch = (query: ICommonObj) => {
    tableRef.value?.getDataList(query)
  }
  return [tableRef, handleReset, handleSearch]
}
