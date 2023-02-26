<template>
  <div class="dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="dialogConfig.title"
      :width="width"
      center
    >
      <JPForm
        ref="formRef"
        v-bind="dialogConfig.formConfig"
        v-model:formData="formData"
      >
      </JPForm>
      <slot></slot>
      <slot name="tip"></slot>
      <template #footer>
        <slot name="footer">
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handelConfirm">确认</el-button>
          </span>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
// vue api相关
import { defineComponent, ref, PropType, watch, computed } from 'vue'
// vuex相关
import { useStore } from '@/store'
// 页面组件相关
import JPForm from '@/base-ui/form'
// 类型相关
import { IForm } from '@/base-ui/form'
import { ICommonObj } from '@/global/type'
interface IDialogConfig {
  title: string
  formConfig: IForm
}
export default defineComponent({
  components: {
    JPForm
  },
  props: {
    dialogConfig: {
      type: Object as PropType<IDialogConfig>,
      required: true
    },
    modalFormDetail: {
      type: Object as PropType<ICommonObj>,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    // store模块中的名称
    moduleName: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '30%'
    }
  },
  setup(props) {
    //弹窗相关
    const formRef = ref<InstanceType<typeof JPForm>>()
    const dialogVisible = ref(false)
    const formData: ICommonObj = ref({})
    props.dialogConfig.formConfig.formItems.forEach((item) => {
      formData.value[item.field] = item?.default ?? ''
    })
    // 给表单赋值
    watch(
      () => props.modalFormDetail,
      (val: any) => {
        props.dialogConfig.formConfig.formItems.forEach((item) => {
          formData.value[item.field] = val[item.field] ?? item?.default ?? ''
        })
        if (formRef.value) {
          formRef.value.curFormData = formData.value
        }
      },
      {
        deep: true
      }
    )

    // 确认按钮的点击
    const store = useStore()
    const isEdit = computed(() => !!Object.keys(props.modalFormDetail).length)
    const handelConfirm = () => {
      dialogVisible.value = false
      // 如果是编辑
      console.log('isEdit.value', isEdit.value)
      if (isEdit.value) {
        store.dispatch(`${props?.moduleName}/editDataListAction`, {
          pageName: props.pageName,
          // 当时起错名了 后期修改 就叫id
          userId: (props.modalFormDetail as any)?.id,
          query: { ...formData.value, ...props.otherInfo }
        })
      } else {
        store.dispatch(`${props?.moduleName}/addDataListAction`, {
          pageName: props.pageName,
          query: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      dialogVisible,
      formData,
      formRef,
      handelConfirm
    }
  }
})
</script>

<style lang="less" scoped></style>
