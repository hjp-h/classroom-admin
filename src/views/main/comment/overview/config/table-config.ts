export const tableConfig = {
  propList: [
    {
      prop: 'id',
      label: '评论id',
      minWidth: '100',
      fixed: 'left'
    },
    {
      prop: 'content',
      label: '评论内容',
      minWidth: '200'
    },
    {
      prop: 'applyId',
      label: '订单id',
      minWidth: '100'
    },
    {
      prop: 'user',
      label: '评论人',
      minWidth: '200'
    },
    {
      prop: 'commentId',
      label: '回复评论id',
      minWidth: '200'
    },
    {
      prop: 'star',
      label: '评分',
      minWidth: '100'
    },
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
      minWidth: '200px',
      fixed: 'right',
      align: 'center'
    }
  ],
  title: '评论列表',
  isShowIndexColum: true,
  isShowSelectionColumn: true
}
