export const tableConfig = {
  propList: [
    { prop: 'user', label: '反馈人', minWidth: '100' },
    { prop: 'content', label: '反馈内容', minWidth: '100' },
    { prop: 'reply', label: '回复内容', minWidth: '100' },
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
  title: '反馈列表',
  isShowIndexColum: true,
  isShowSelectionColumn: true
}
