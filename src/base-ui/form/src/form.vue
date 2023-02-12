<template>
  <div class="JPForm">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :disabled="item.readonly"
                  :placeholder="item.placeholder"
                  :showPassword="item.type === 'password'"
                  v-bind="item.otherOptions"
                  v-model="curFormData[item.field]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'textarea'">
                <el-input
                  type="textarea"
                  :disabled="item.readonly"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  v-model="curFormData[item.field]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :disabled="item.readonly"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="curFormData[item.field]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  :disabled="item.readonly"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="curFormData[item.field]"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../type'
export default defineComponent({
  props: {
    formData: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: '10px 40px'
      })
    },
    // 响应式布局
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >=1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  setup(props, { emit }) {
    // v-model用于自定义组件，需要将引用数据复制一份 防止子组件直接修改父亲组件的内容
    const curFormData = ref({ ...props.formData })
    // 监听数据的改变
    watch(
      curFormData,
      (newValue) => {
        // 发射事件去修改父组件的数据
        emit('update:formData', newValue)
      },
      { deep: true }
    )
    return {
      curFormData
    }
  },
  emits: ['update:formData']
})
</script>

<style lang="less" scoped>
.JPForm {
  padding: 20px;
  background-color: #fff;
  .header {
    text-align: left;
  }
  .footer {
    display: flex;
    padding-right: 10px;
    flex-direction: row-reverse;
  }
}
</style>
