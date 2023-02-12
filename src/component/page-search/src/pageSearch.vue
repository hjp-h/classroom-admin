<template>
  <div class="pageSearch">
    <!-- v-bind会进行属性的拆分 依次传递进组件 -->
    <!-- 其实是v-bind=“formData @update:formData的简写” formData是起了别名 默认是modelValue-->
    <JPForm ref="formRef" v-bind="searchFormConfig" v-model:formData="formData">
      <template #header>
        <h3>高级检索</h3>
      </template>
      <template #footer>
        <div class="handle-btn">
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </template>
    </JPForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IForm } from '@/base-ui/form/type/index'
import JPForm from '@/base-ui/form/index'
import { ICommonObj } from '@/global/type'
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object as PropType<IForm>,
      required: true
    }
  },
  components: {
    JPForm
  },
  setup(props, { emit }) {
    // 表单数据
    const formRef = ref<any>('')
    const formData: ICommonObj = ref({})
    // 表单数据赋予初值
    props.searchFormConfig.formItems.forEach((item) => {
      formData.value[item.field] = ''
    })
    // 重置按钮
    const handleReset = () => {
      // 重置方式一
      formRef.value.curFormData = {}
      // 重置方式二 单独去设置formData的每一项都为空
      // 重置方式三 将传进去el-cpt的formData的每一项不要进行双向绑定
      emit('handleReset')
    }
    // 搜索按钮
    const handleSearch = () => {
      emit('handleSearch', formData.value)
    }
    return {
      formData,
      formRef,
      handleReset,
      handleSearch
    }
  }
})
</script>

<style lang="less" scoped>
.page-search {
  background-color: #fff;
  .handle-btn {
    width: 10%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
