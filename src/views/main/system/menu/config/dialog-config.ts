import { IForm } from '@/base-ui/form'
interface IDialogConfig {
  title: string
  formConfig: IForm
}
export const dialogConfig: IDialogConfig = {
  title: '新建菜单',
  formConfig: {
    itemStyle: {
      padding: '0px 10px'
    },
    formItems: [
      {
        field: 'name',
        type: 'input',
        label: '菜单名',
        placeholder: '请输入角色名'
      },
      {
        field: 'parentId',
        type: 'select',
        label: '父级菜单',
        placeholder: '请选择父级菜单',
        options: [
          {
            value: '1',
            label: '系统管理'
          }
        ]
      },
      {
        field: 'icon',
        type: 'input',
        label: '图标',
        placeholder: '请输入图标字符串，例如el-icon-setting'
      },
      {
        field: 'type',
        type: 'input',
        label: '菜单级别',
        placeholder: '请输入菜单级别，例如1,2,3'
      },
      {
        field: 'url',
        type: 'input',
        label: '菜单地址',
        placeholder: '请输入菜单地址'
      },
      {
        field: 'permission',
        type: 'input',
        label: '菜单权限',
        placeholder: '请输入菜单权限'
      }
    ],
    colLayout: {
      sm: 24
    }
  }
}
