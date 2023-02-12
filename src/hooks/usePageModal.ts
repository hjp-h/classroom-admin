import { ref } from 'vue'
import PageModal from '@/component/page-modal'
import { ICommonObj } from '@/global/type'
type CallbackFn = (data?: any) => void
export default function (
  addCallback?: CallbackFn | null,
  editCallback?: CallbackFn | null,
  checkCallback?: CallbackFn | null
) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  // 编辑时表单的数据
  const modalFormDetail = ref<ICommonObj>({})
  // 处理新增的点击
  const handleAddClick = () => {
    modalFormDetail.value = {}
    addCallback?.()
    if (modalRef.value) {
      modalRef.value.dialogVisible = true
    }
  }
  // 处理编辑的点击
  const handleEditClick = (data: any) => {
    modalFormDetail.value = { ...data }
    editCallback?.(data)
    if (modalRef.value) {
      modalRef.value.dialogVisible = true
    }
  }

  const handleCheckClick = (data: any) => {
    modalFormDetail.value = { ...data }
    checkCallback?.(data)
    if (modalRef.value) {
      modalRef.value.dialogVisible = true
    }
  }
  return [
    modalRef,
    modalFormDetail,
    handleAddClick,
    handleEditClick,
    handleCheckClick
  ]
}
