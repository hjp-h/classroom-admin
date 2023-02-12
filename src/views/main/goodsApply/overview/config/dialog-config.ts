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
      {
        field: 'name',
        type: 'input',
        otherOptions: {
          rows: 2
        },
        label: '物资名称',
        placeholder: '请输入物资内容',
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
        field: 'maintenanceId',
        type: 'input',
        label: '维修单号',
        placeholder: '维修单号',
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
