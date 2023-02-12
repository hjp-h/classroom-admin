import { IForm } from '@/base-ui/form'
export const searchFormConfig: IForm = {
  itemStyle: {
    padding: '10px 20px'
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '菜单名称',
      placeholder: '请输入菜单名称'
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间'
    },
    {
      field: 'updateAt',
      type: 'datepicker',
      label: '更新时间'
    }
  ]
}
