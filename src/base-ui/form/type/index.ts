type IFormItemType =
  | 'select'
  | 'password'
  | 'input'
  | 'textarea'
  | 'date'
  | 'datetime'
  | 'daterange'
  | 'datetimerange'
export interface IFormItem {
  // 表单类型
  type: IFormItemType
  // 表单的标签
  label: string
  // 表单和fromData对应的字段名
  field: string
  placeholder?: string
  default?: any
  // 针对select
  options?: any[]
  // 表单项是否显示
  isHidden?: boolean
  // 针对其他的属性 后面是有v-bind解构属性即可
  otherOptions?: any
  readonly?: boolean
}
export interface IForm {
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
  formItems: IFormItem[]
}
