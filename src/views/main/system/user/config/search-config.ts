import { IForm } from '@/base-ui/form'
export const searchFormConfig: IForm = {
  itemStyle: {
    padding: '10px 20px'
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '姓名',
      placeholder: '请输入姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'enable',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        {
          label: '禁用',
          value: 0
        },
        {
          label: '启用',
          value: 1
        }
      ]
    },
    // {
    //   field: 'date',
    //   type: 'datepicker',
    //   label: '日期',
    //   otherOptions: {
    //     type: 'daterange',
    //     startPlaceholder: '开始时间',
    //     endPlaceholder: '结束时间',
    //     format: 'YYYY/MM/DD',
    //     valueFormat: 'YYYY-MM-DD'
    //   }
    // }
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        format: 'YYYY/MM/DD',
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      field: 'updateAt',
      type: 'datepicker',
      label: '更新时间',
      otherOptions: {
        format: 'YYYY/MM/DD',
        valueFormat: 'YYYY-MM-DD'
      }
    }
  ]
}
