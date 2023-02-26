// type
import { IForm } from '@/base-ui/form'
interface IDialogConfig {
  title: string
  formConfig: IForm
}
export const getDialogConfig = (readonly = false): IDialogConfig => ({
  title: '新建课室',
  formConfig: {
    itemStyle: {
      padding: '0px 10px'
    },
    formItems: [
      {
        field: 'name',
        type: 'input',
        otherOptions: {
          rows: 2
        },
        label: '课室名称',
        placeholder: '请输入课室名称',
        readonly
      },
      {
        field: 'location',
        type: 'select',
        label: '位置',
        placeholder: '请填写课室位置',
        options: [
          {
            value: '北苑',
            label: '北苑'
          },
          {
            value: '南苑',
            label: '南苑'
          }
        ],
        readonly
      }
    ],
    colLayout: {
      sm: 24
    }
  }
})
