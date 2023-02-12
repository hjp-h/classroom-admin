export const tableConfig = {
  propList: [
    { prop: 'name', label: '角色名', minWidth: '100' },
    { prop: 'intro', label: '权限介绍', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250'
    },
    {
      prop: 'operate',
      label: '操作',
      minWidth: '150px'
    }
  ],
  title: '角色列表',
  isShowIndexColum: true,
  isShowSelectionColumn: true
}
