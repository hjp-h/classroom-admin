import { IForm } from '@/base-ui/form'
import { ICommonObj } from '@/global/type'
import {
  degreeList,
  maintainTypeList,
  statusList,
  urgentList,
  approveList
} from './common.config'
export const getSearchFormConfig: (options: ICommonObj) => IForm = (
  options: ICommonObj
) => ({
  itemStyle: {
    padding: '10px 20px'
  },
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '订单号',
      placeholder: '请填写订单号'
    },
    {
      field: 'type',
      type: 'select',
      label: '维修类型',
      placeholder: '请填写维修类型',
      options: maintainTypeList
    },
    {
      field: 'phone',
      type: 'input',
      label: '联系电话',
      placeholder: '请填写联系电话'
    },
    {
      field: 'status',
      type: 'select',
      label: '维修状态',
      placeholder: '请选择维修状态',
      options: statusList
    },
    {
      field: 'status',
      type: 'select',
      label: '紧急程度',
      placeholder: '请选择紧急程度',
      options: degreeList
    },
    {
      field: 'classroomId',
      type: 'select',
      label: '课室',
      placeholder: '请选择课室',
      options: options?.classroomList ?? []
    },
    {
      field: 'expectedTime',
      type: 'date',
      label: '期待维修时间',
      placeholder: '请选择期待时间'
    },
    {
      field: 'applicant',
      type: 'input',
      label: '申请人',
      placeholder: '请填写申请人'
    },
    {
      field: 'processor',
      type: 'input',
      label: '维修人',
      placeholder: '请填写维修人'
    },
    {
      field: 'isUrgent',
      type: 'select',
      label: '是否催促',
      placeholder: '请选择',
      options: urgentList
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
  ],
  colLayout: {
    sm: 6
  }
})
