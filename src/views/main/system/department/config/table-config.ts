export const tableConfig = {
  propList: [
    { prop: 'name', label: '部门名称', minWidth: '120' },
    { prop: 'leader', label: '部门领导', minWidth: '120' },
    { prop: 'parentName', label: '上级部门', minWidth: '120' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'create'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'update'
    },
    { prop: 'operate', label: '操作', minWidth: '200', slotName: 'handler' }
  ],
  title: '用户列表',
  isShowIndexColum: true,
  isShowSelectionColumn: true
}
