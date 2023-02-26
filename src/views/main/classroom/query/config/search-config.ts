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
    },
    {
      field: 'emptyTime',
      type: 'datetimerange',
      label: '空闲时间段',
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
    }
  ]
})
