export const tableConfig = {
  propList: [
    {
      prop: 'id',
      label: '订单号',
      fixed: 'left',
      minWidth: '100'
    },
    {
      prop: 'type',
      label: '维修类型',
      minWidth: '200'
    },
    { prop: 'desc', label: '描述', minWidth: '100' },
    { prop: 'phone', label: '联系电话', minWidth: '100' },
    { prop: 'status', label: '维修状态', minWidth: '100' },
    { prop: 'approve', label: '审批状态', minWidth: '100' },
    { prop: 'degree', label: '紧急程度', minWidth: '100' },
    { prop: 'classroom', label: '课室', minWidth: '100' },
    { prop: 'expectedTime', label: '期待时间', minWidth: '100' },
    { prop: 'applicant', label: '申请人', minWidth: '100' },
    { prop: 'processor', label: '维修人', minWidth: '100' },
    { prop: 'isUrgent', label: '是否催促', minWidth: '100' },
    { prop: 'img', label: '图片描述', minWidth: '200' },
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
      minWidth: '300px',
      fixed: 'right',
      align: 'center'
    }
  ],
  title: '维修列表',
  isShowIndexColum: true,
  isShowSelectionColumn: true
}
