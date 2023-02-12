import { IForm } from '@/base-ui/form'
interface IDialogConfig {
  title: string
  formConfig: IForm
}
export const dialogConfig: IDialogConfig = {
  title: '新建用户',
  formConfig: {
    itemStyle: {
      padding: '0px 10px'
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
        field: 'password',
        type: 'password',
        label: '密码',
        isHidden: false,
        placeholder: '请输入密码'
      },
      {
        field: 'cellphone',
        type: 'input',
        label: '电话号码',
        placeholder: '请输入电话号码'
      },
      {
        field: 'departmentId',
        type: 'select',
        label: '部门',
        placeholder: '请选择部门',
        options: []
      },
      {
        field: 'roleId',
        type: 'select',
        label: '角色',
        placeholder: '请选择角色',
        options: []
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
      }
    ],
    colLayout: {
      sm: 24
    }
  }
}
