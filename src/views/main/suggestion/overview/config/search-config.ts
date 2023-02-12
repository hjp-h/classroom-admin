import { IForm } from '@/base-ui/form'
export const searchFormConfig: IForm = {
  itemStyle: {
    padding: '10px 20px'
  },
  formItems: [
    {
      field: 'user',
      type: 'input',
      label: '反馈人',
      placeholder: '请输入反馈人'
    },
    {
      field: 'content',
      type: 'input',
      label: '反馈内容',
      placeholder: '请输入反馈内容'
    },
    {
      field: 'reply',
      type: 'input',
      label: '回复内容',
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
