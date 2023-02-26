import { IForm } from '@/base-ui/form'
import { ICommonObj } from '@/global/type'
export const getSearchFormConfig: (options: ICommonObj) => IForm = (
  options = {}
) => ({
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
      field: 'location',
      type: 'select',
      label: '位置',
      placeholder: '请选择位置',
      options: [
        {
          value: '北苑',
          label: '北苑'
        },
        {
          value: '南苑',
          label: '南苑'
        }
      ]
    }
  ]
})
