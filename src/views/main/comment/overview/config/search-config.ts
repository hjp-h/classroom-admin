import { IForm } from '@/base-ui/form'
export const searchFormConfig: IForm = {
  itemStyle: {
    padding: '10px 20px'
  },
  formItems: [
    {
      field: 'content',
      type: 'textarea',
      otherOptions: {
        rows: 2
      },
      label: '评价内容',
      placeholder: '请输入评价'
    },
    {
      field: 'applyId',
      type: 'input',
      label: '订单id',
      placeholder: '请输入订单id'
    },
    {
      field: 'star',
      type: 'input',
      label: '评分',
      placeholder: '5分满分'
    },
    {
      field: 'createAt',
      type: 'date',
      label: '创建时间',
      otherOptions: {
        format: 'YYYY/MM/DD',
        valueFormat: 'YYYY-MM-DD'
      }
    }
  ]
}
