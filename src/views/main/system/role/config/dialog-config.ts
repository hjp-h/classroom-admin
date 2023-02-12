import { IForm } from '@/base-ui/form'
interface IDialogConfig {
  title: string
  formConfig: IForm
}
export const dialogConfig: IDialogConfig = {
  title: '新建角色',
  formConfig: {
    itemStyle: {
      padding: '0px 10px'
    },
    formItems: [
      {
        field: 'name',
        type: 'input',
        label: '角色名',
        placeholder: '请输入角色名'
      },
      {
        field: 'intro',
        type: 'input',
        label: '角色介绍',
        placeholder: '请输入角色介绍'
      }
    ],
    colLayout: {
      sm: 24
    }
  }
}
