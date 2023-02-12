import { App } from 'vue'
// 按需引入
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElRadio,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
  ElTabs,
  ElTabPane,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElIcon,
  ElSelect,
  ElDatePicker,
  ElRow,
  ElCol,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElOption,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree
} from 'element-plus'
// 全部引入
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'

// 一些基础的样式
import 'element-plus/lib/theme-chalk/base.css'
export default function (app: App): void {
  const components = [
    ElButton,
    ElForm,
    ElFormItem,
    ElTabs,
    ElTabPane,
    ElInput,
    ElCheckbox,
    ElRadio,
    ElTable,
    ElAlert,
    ElAside,
    ElAutocomplete,
    ElAvatar,
    ElBacktop,
    ElBadge,
    ElContainer,
    ElHeader,
    ElMain,
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElSubmenu,
    ElIcon,
    ElSelect,
    ElDatePicker,
    ElRow,
    ElOption,
    ElCol,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElTableColumn,
    ElPagination,
    ElImage,
    ElDialog,
    ElTree
  ]
  for (const cpn of components) {
    app.component(cpn.name, cpn)
  }
  // app.use(ElementPlus)
}
