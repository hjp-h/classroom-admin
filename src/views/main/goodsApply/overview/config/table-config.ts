export const tableConfig = {
  propList: [
    {
      prop: 'name',
      label: '物资名称',
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
      prop: 'maintenanceId',
      label: '订单号',
      minWidth: '200'
    },
    {
      prop: 'applyReason',
      label: '申请理由',
      minWidth: '200'
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
  title: '物资申请列表',
  isShowIndexColum: true,
  isShowSelectionColumn: true
}
