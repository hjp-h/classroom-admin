// type
import { IForm } from '@/base-ui/form'
interface IDialogConfig {
  title: string
  formConfig: IForm
}
export const getDialogConfig = (readonly = false): IDialogConfig => ({
  title: '新建评论',
  formConfig: {
    itemStyle: {
      padding: '0px 10px'
    },
    formItems: [
      {
        field: 'content',
        type: 'textarea',
        otherOptions: {
          rows: 2
        },
        label: '评价内容',
        placeholder: '请输入评价',
        readonly
      },
      {
        field: 'applyId',
        type: 'input',
        label: '订单id',
        placeholder: '请输入订单id',
        readonly
      },
      {
        field: 'star',
        type: 'input',
        label: '评分',
        placeholder: '5分满分',
        readonly
      }
    ],
    colLayout: {
      sm: 24
    }
  }
})
