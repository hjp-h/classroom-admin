import { IForm } from '@/base-ui/form'
import { approveList, degreeList } from './common.config'
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
      label: '课室名称',
      placeholder: '请输入课室名称，支持模糊查询'
    },
    {
      field: 'applicant',
      type: 'input',
      label: '申请人',
      placeholder: '请填写申请人'
    },
    {
      field: 'applyId',
      type: 'input',
      label: '申请单号',
      placeholder: '请填写申请单号'
    },
    {
      field: 'approve',
      type: 'select',
      label: '审批状态',
      placeholder: '请选择审批状态',
      options: approveList
    },
    {
      field: 'useTime',
      type: 'datetimerange',
      label: '使用时间段',
      // 默认选择最近两小时
      default: [
        new Date(),
        new Date(new Date().setHours(new Date().getHours() + 2))
      ],
      placeholder: '请填写使用时间段',
      otherOptions: {
        format: 'YYYY-MM-DD HH:mm',
        'value-format': 'YYYY-MM-DD HH:mm'
      }
    },
    {
      field: 'degree',
      type: 'select',
      label: '紧急程度',
      placeholder: '请选择紧急程度',
      options: degreeList
    }
  ]
}
