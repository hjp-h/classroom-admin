import { IForm } from '@/base-ui/form'
export const searchFormConfig: IForm = {
  itemStyle: {
    padding: '10px 20px'
  },
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '公告标题',
      placeholder: '请输入公告标题'
    },
    {
      field: 'content',
      type: 'input',
      label: '公告内容',
      placeholder: '请输入公告内容'
    },
    {
      field: 'createAt',
      type: 'date',
      label: '创建时间',
      otherOptions: {
        format: 'YYYY/MM/DD',
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      field: 'updateAt',
      type: 'date',
      label: '更新时间',
      otherOptions: {
        format: 'YYYY/MM/DD',
        valueFormat: 'YYYY-MM-DD'
      }
    }
  ]
}
