export const tableConfig = {
  propList: [
    { prop: 'name', label: '用户名' },
    { prop: 'realname', label: '姓名' },
    { prop: 'cellphone', label: '手机号码' },
    { prop: 'enable', label: '状态' },
    { prop: 'department', label: '部门' },
    { prop: 'roleName', label: '角色' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200'
    },
    {
      prop: 'operate',
      label: '操作',
      minWidth: '250px',
      fixed: 'right',
      align: 'center'
    }
  ],
  title: '用户列表',
  isShowIndexColum: true,
  isShowSelectionColumn: true
}
