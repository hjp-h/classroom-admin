import { IForm } from '@/base-ui/form'
interface IDialogConfig {
  title: string
  formConfig: IForm
}
export const dialogConfig: IDialogConfig = {
  title: '新建公告',
  formConfig: {
    itemStyle: {
      padding: '0px 10px'
    },
    formItems: [
      {
        field: 'title',
        type: 'input',
        label: '公告标题',
        placeholder: '请输入标题'
      },
      {
        field: 'content',
        type: 'textarea',
        otherOptions: {
          rows: 3
        },
        label: '公告内容',
        placeholder: '请输入公告内容'
      }
    ],
    colLayout: {
      sm: 24
    }
  }
}
