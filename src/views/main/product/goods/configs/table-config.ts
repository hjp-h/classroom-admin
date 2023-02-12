export const tableConfig = {
  propList: [
    { prop: 'name', label: '商品名名称', minWidth: '100' },
    { prop: 'imgUrl', label: '图片', minWidth: '100' },
    { prop: 'inventoryCount', label: '库存', minWidth: '100' },
    { prop: 'oldPrice', label: '原价', minWidth: '100' },
    { prop: 'newPrice', label: '现价', minWidth: '100' },
    { prop: 'status', label: '商品状态', minWidth: '80' },
    { prop: 'address', label: '产地', minWidth: '100' },
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
      minWidth: '180'
      // fixed: 'right'
    }
  ],
  title: '商品列表',
  isShowIndexColum: true,
  isShowSelectionColumn: true
}
