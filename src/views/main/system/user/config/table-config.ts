export const tableConfig = {
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '姓名', minWidth: '100' },
    { prop: 'cellphone', label: '手机号码', minWidth: '100' },
    { prop: 'enable', label: '状态', minWidth: '100' },
    { prop: 'department', label: '部门', minWidth: '100' },
    { prop: 'roleName', label: '角色', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200'
    },
    {
      prop: 'operate',
      label: '操作',
      minWidth: '150px',
      right: true
    }
  ],
  title: '用户列表',
  isShowIndexColum: true,
  isShowSelectionColumn: true
}
