import { IForm } from '@/base-ui/form'
import { approveList } from './common.config'
export const searchFormConfig: IForm = {
  itemStyle: {
    padding: '10px 20px'
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      otherOptions: {
        rows: 2
      },
      label: '物资名称',
      placeholder: '请输入物资内容'
    },
    {
      field: 'applicant',
      type: 'input',
      label: '申请人',
      placeholder: '请填写申请人'
    },
    {
      field: 'maintenanceId',
      type: 'input',
      label: '维修单号',
      placeholder: '请填写维修单号'
    },
    {
      field: 'approve',
      type: 'select',
      label: '审批状态',
      placeholder: '请选择审批状态',
      options: approveList
    },
    {
      field: 'createAt',
      type: 'date',
      label: '创建时间',
      otherOptions: {
        format: 'YYYY/MM/DD',
        valueFormat: 'YYYY-MM-DD'
      }
    }
  ]
}
