import { IForm } from '@/base-ui/form'
interface IDialogConfig {
  title: string
  formConfig: IForm
}
export const dialogConfig: IDialogConfig = {
  title: '新建部门',
  formConfig: {
    itemStyle: {
      padding: '0px 10px'
    },
    formItems: [
      {
        field: 'name',
        type: 'input',
        label: '部门名称',
        placeholder: '请输入部门名称'
      },
      {
        field: 'parentId',
        type: 'select',
        label: '上级部门',
        placeholder: '请选择上级部门',
        options: []
      },
      {
        field: 'leader',
        type: 'input',
        label: '领导名称',
        placeholder: '请输入领导名称'
      }
    ],
    colLayout: {
      sm: 24
    }
  }
}
