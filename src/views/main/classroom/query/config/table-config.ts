export const tableConfig = {
  propList: [
    {
      prop: 'id',
      label: '课室号',
      minWidth: '200'
    },
    {
      prop: 'name',
      label: '课室名称',
      minWidth: '200'
    },
    {
      prop: 'location',
      label: '位置',
      minWidth: '200'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200'
    },
    {
      prop: 'createAt',
      label: '更新时间',
      minWidth: '200px'
    },
    {
      prop: 'operate',
      label: '操作',
      minWidth: '200px',
      fixed: 'right',
      align: 'center'
    }
  ],
  title: '课室列表',
  isShowIndexColum: true,
  isShowSelectionColumn: true
}
