import { IForm } from '@/base-ui/form'
interface IDialogConfig {
  title: string
  formConfig: IForm
}
export const dialogConfig: IDialogConfig = {
  title: '意见回复',
  formConfig: {
    itemStyle: {
      padding: '0px 10px'
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
        type: 'textarea',
        label: '反馈内容',
        placeholder: '请输入标题'
      },
      {
        field: 'reply',
        type: 'textarea',
        otherOptions: {
          rows: 3
        },
        label: '回复内容',
        placeholder: '请输入回复内容'
      }
    ],
    colLayout: {
      sm: 24
    }
  }
}
