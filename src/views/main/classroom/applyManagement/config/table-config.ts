export const tableConfig = {
  propList: [
    {
      prop: 'id',
      label: '申请单号',
      minWidth: '200'
    },
    {
      prop: 'name',
      label: '课室名称',
      minWidth: '200'
    },
    {
      prop: 'applicant',
      label: '申请人',
      minWidth: '200'
    },
    {
      prop: 'approve',
      label: '审批状态',
      minWidth: '200'
    },
    {
      prop: 'applyReason',
      label: '申请理由',
      minWidth: '200'
    },
    {
      prop: 'useTime',
      label: '使用时间段',
      minWidth: '200'
    },
    {
      prop: 'degree',
      label: '紧急程度',
      minWidth: '100'
    },
    { prop: 'isUrgent', label: '是否催促', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
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
  title: '课室申请列表',
  isShowIndexColum: true,
  isShowSelectionColumn: true
}
