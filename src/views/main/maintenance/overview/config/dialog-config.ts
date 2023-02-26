// type
import { IForm } from '@/base-ui/form'
import { ICommonObj } from '@/global/type'
// config
import { degreeList, maintainTypeList, urgentList } from './common.config'
interface IDialogConfig {
  title: string
  formConfig: IForm
}
export const getDialogConfig = (
  readonly = false,
  options: ICommonObj
): IDialogConfig => ({
  title: '新建维修单',
  formConfig: {
    itemStyle: {
      padding: '0px 10px'
    },
    formItems: [
      {
        field: 'type',
        type: 'select',
        label: '维修类型',
        placeholder: '请填写维修类型',
        options: maintainTypeList,
        readonly
      },
      {
        field: 'desc',
        type: 'textarea',
        otherOptions: {
          rows: 2
        },
        label: '维修描述',
        placeholder: '请输入描述内容',
        readonly
      },
      {
        field: 'phone',
        type: 'input',
        label: '联系电话',
        placeholder: '请填写联系电话',
        readonly
      },
      {
        field: 'degree',
        type: 'select',
        label: '维修状态',
        placeholder: '请选择维修状态',
        options: degreeList,
        readonly
      },
      {
        field: 'classroomId',
        type: 'select',
        label: '课室',
        placeholder: '请选择课室',
        options: options?.classroomList ?? [],
        readonly
      },
      {
        field: 'expectedTime',
        type: 'date',
        label: '期待维修时间',
        placeholder: '请选择期待时间',
        readonly
      },
      {
        field: 'applicant',
        type: 'input',
        label: '申请人',
        placeholder: '请填写申请人',
        readonly
      },
      {
        field: 'isUrgent',
        type: 'select',
        label: '是否催促',
        placeholder: '请选择',
        options: urgentList,
        readonly
      },
      {
        field: 'processor',
        type: 'select',
        label: '维修人',
        placeholder: '请选择维修人'
        // options: []
      }
    ],
    colLayout: {
      sm: 24
    }
  }
})
