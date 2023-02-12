// configs
import { degreeList, urgentList } from './common.config'
// type
import { IForm } from '@/base-ui/form'
interface IDialogConfig {
  title: string
  formConfig: IForm
}
export const getDialogConfig = (readonly = false): IDialogConfig => ({
  title: '新建物资申请单',
  formConfig: {
    itemStyle: {
      padding: '0px 10px'
    },
    formItems: [
      ...(readonly
        ? [
            {
              field: 'id',
              type: 'input',
              label: '申请单号',
              placeholder: '申请单号',
              readonly
            }
          ]
        : []),
      {
        field: 'name',
        type: 'input',
        otherOptions: {
          rows: 2
        },
        label: '课室名称',
        placeholder: '请输入课室名称',
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
        field: 'phone',
        type: 'input',
        label: '联系电话',
        placeholder: '请填写联系电话',
        readonly
      },
      ...((readonly
        ? [
            {
              field: 'useTime',
              type: 'input',
              label: '使用时间段',
              placeholder: '请填写使用时间段',
              readonly
            }
          ]
        : [
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
                'value-format': 'YYYY-MM-DD HH:mm',
                'disabled-date': (time: Date): boolean => {
                  return time < new Date()
                }
              },
              readonly
            }
          ]) as any),
      {
        field: 'degree',
        type: 'select',
        label: '紧急程度',
        placeholder: '请选择紧急程度',
        options: degreeList,
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
        field: 'applyReason',
        type: 'textarea',
        label: '申请理由',
        placeholder: '请填写申请理由',
        readonly
      }
    ],
    colLayout: {
      sm: 24
    }
  }
})
