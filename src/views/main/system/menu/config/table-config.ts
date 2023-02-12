export const tableConfig = {
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'permission', label: '权限介绍', minWidth: '100' },
    { prop: 'icon', label: '图标', minWidth: '100' },
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
  title: '菜单列表',
  isShowIndexColum: false,
  isShowSelectionColumn: false,
  childrenProps: {
    'row-key': 'id',
    'tree-props': { children: 'children' }
  },
  showFooter: true
}
