export const tableConfig = {
  propList: [
    { prop: 'title', label: '公告标题', minWidth: '100' },
    { prop: 'content', label: '公告内容', minWidth: '100' },
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
      minWidth: '150px'
    }
  ],
  title: '公告列表',
  isShowIndexColum: true,
  isShowSelectionColumn: true
}
