import mock from './mock'
import type { GlobalSearchData } from './types'

const database: GlobalSearchData[] = [
  {
    title: 'eCommerce',
    subtitle: 'Dashboard',
    icon: 'mdi-view-dashboard-outline',
    to: { name: 'dashboard-ecommerce' },
  },
  {
    title: 'CRM',
    subtitle: 'Dashboard',
    icon: 'mdi-view-agenda-outline',
    to: { name: 'dashboard-crm' },
  },
  {
    title: 'Product List',
    subtitle: 'Apps',
    icon: 'mdi-format-list-checkbox',
    to: { name: 'ecommerce-products-list' },
  },
  {
    title: 'Product Overview',
    subtitle: 'Apps',
    icon: 'mdi-text-box-search-outline',
    to: { name: 'ecommerce-products-overview' },
  },
  {
    title: 'Product Edit',
    subtitle: 'Apps',
    icon: 'mdi-file-document-edit-outline',
    to: { name: 'ecommerce-products-edit' },
  },
  {
    title: 'Product Add',
    subtitle: 'Apps',
    icon: 'mdi-file-plus-outline',
    to: { name: 'ecommerce-products-add' },
  },
  {
    title: 'Order List',
    subtitle: 'Apps',
    icon: 'mdi-format-list-checkbox',
    to: { name: 'ecommerce-order-list' },
  },
  {
    title: 'Order Overview',
    subtitle: 'Apps',
    icon: 'mdi-text-box-search-outline',
    to: { name: 'ecommerce-order-overview' },
  },
  {
    title: 'Test-center',
    to: { name: 'apps-test-center' },
    subtitle: 'Apps',
    icon: 'mdi-map-marker-outline',
  },
  {
    title: 'Class',
    to: { name: 'apps-class' },
    subtitle: 'Apps',
    icon: 'mdi-map-marker-outline',
  },
  {
    title: 'Invoice List',
    to: { name: 'apps-invoice-list' },
    subtitle: 'Apps',
    icon: 'mdi-format-list-checkbox',
  },
  {
    title: 'Invoice Details',
    to: { name: 'apps-invoice-details', params: { id: 'INV0002' } },
    subtitle: 'Apps',
    icon: 'mdi-text-box-search-outline',
  },
  {
    title: 'Invoice Edit',
    to: { name: 'apps-invoice-edit', params: { id: 'INV0002' } },
    subtitle: 'Apps',
    icon: 'mdi-file-document-edit-outline',
  },
  {
    title: 'Invoice Add',
    to: { name: 'apps-invoice-add' },
    subtitle: 'Apps',
    icon: 'mdi-file-plus-outline',
  },
  {
    title: 'User List',
    to: { name: 'apps-user-list' },
    subtitle: 'Apps',
    icon: 'mdi-format-list-checkbox',
  },
  {
    title: 'User Profile',
    to: { name: 'apps-user-profile', params: { tab: 'profile' } },
    subtitle: 'Apps',
    icon: 'mdi-account-outline',
  },
  {
    title: 'Search',
    to: { name: 'pages-search' },
    subtitle: 'Pages',
    icon: 'mdi-magnify',
  },
  {
    title: 'Pricing',
    to: { name: 'pages-pricing' },
    subtitle: 'Pages',
    icon: 'mdi-currency-usd',
  },
  {
    title: 'FAQs',
    to: { name: 'pages-faq' },
    subtitle: 'Pages',
    icon: 'mdi-frequently-asked-questions',
  },
  {
    title: 'Crypto',
    to: { name: 'pages-crypto' },
    subtitle: 'Pages',
    icon: 'mdi-bitcoin',
  },
  {
    title: 'Card Example',
    to: { name: 'pages-cards' },
    subtitle: 'Pages',
    icon: 'mdi-cards-outline',
  },
  {
    title: 'Login',
    to: { name: 'auth-login' },
    subtitle: 'Pages',
    icon: 'mdi-login',
  },
  {
    title: 'Login V2',
    to: { name: 'auth-login-v2' },
    subtitle: 'Pages',
    icon: 'mdi-login',
  },
  {
    title: 'Register',
    to: { name: 'auth-register' },
    subtitle: 'Pages',
    icon: 'mdi-account-plus-outline',
  },
  {
    title: 'Register V2',
    to: { name: 'auth-register-v2' },
    subtitle: 'Pages',
    icon: 'mdi-account-plus-outline',
  },
  {
    title: 'Forgot Password',
    to: { name: 'auth-forgot-password' },
    subtitle: 'Pages',
    icon: 'mdi-key-outline',
  },
  {
    title: 'Forgot Password V2',
    to: { name: 'auth-forgot-password-v2' },
    subtitle: 'Pages',
    icon: 'mdi-key-outline',
  },
  {
    title: 'Reset Password',
    to: { name: 'auth-reset-password' },
    subtitle: 'Pages',
    icon: 'mdi-shield-key-outline',
  },
  {
    title: 'Reset Password V2',
    to: { name: 'auth-reset-password-v2' },
    subtitle: 'Pages',
    icon: 'mdi-shield-key-outline',
  },
  {
    title: 'Not Found',
    to: { name: 'misc-not-found' },
    subtitle: 'Pages',
    icon: 'mdi-alert-circle-outline',
  },
  {
    title: 'Coming Soon',
    to: { name: 'misc-coming-soon' },
    subtitle: 'Pages',
    icon: 'mdi-rocket-launch-outline',
  },
  {
    title: 'Under Maintenance',
    to: { name: 'misc-under-maintenance' },
    subtitle: 'Pages',
    icon: 'mdi-wrench-clock-outline',
  },
  {
    title: 'Not Authorized',
    to: { name: 'misc-not-authorized' },
    subtitle: 'Pages',
    icon: 'mdi-shield-alert-outline',
  },
  {
    title: 'Server Error',
    to: { name: 'misc-server-error' },
    subtitle: 'Pages',
    icon: 'mdi-server-off',
  },
  {
    title: 'Quill Editor',
    to: { name: 'extensions-quill-editor' },
    subtitle: 'Extensions',
    icon: 'mdi-feather',
  },
  {
    title: 'Toastify',
    to: { name: 'extensions-toastify' },
    subtitle: 'Extensions',
    icon: 'mdi-alert-box-outline',
  },
  {
    title: 'Masonry Wall',
    to: { name: 'extensions-masonry-wall' },
    subtitle: 'Extensions',
    icon: 'mdi-wall',
  },
  {
    title: 'Sortable',
    to: { name: 'extensions-sortable' },
    subtitle: 'Extensions',
    icon: 'mdi-sort-reverse-variant',
  },
  {
    title: 'Drop Zone',
    to: { name: 'extensions-drop-zone' },
    subtitle: 'Extensions',
    icon: 'mdi-upload-outline',
  },
  {
    title: 'Date Picker',
    to: { name: 'extensions-date-picker' },
    subtitle: 'Extensions',
    icon: 'mdi-calendar-range',
  },
  {
    title: 'Cleave Input',
    to: { name: 'extensions-cleave-input' },
    subtitle: 'Extensions',
    icon: 'mdi-calendar-range',
  },
  {
    title: 'Swiper',
    to: { name: 'extensions-swiper' },
    subtitle: 'Extensions',
    icon: 'mdi-cards-outline',
  },
  {
    title: 'Advertising',
    to: { name: 'forms-example-advertising' },
    subtitle: 'Forms',
    icon: 'mdi-form-select',
  },
  {
    title: 'Checkout',
    to: { name: 'forms-example-checkout' },
    subtitle: 'Forms',
    icon: 'mdi-form-select',
  },
  {
    title: 'Alert',
    to: { name: 'components-alert' },
    subtitle: 'Components',
    icon: 'mdi-alert-outline',
  },
  {
    title: 'Avatar',
    to: { name: 'components-avatar' },
    subtitle: 'Components',
    icon: 'mdi-account-outline',
  },
  {
    title: 'Badge',
    to: { name: 'components-badge' },
    subtitle: 'Components',
    icon: 'mdi-checkbox-blank-badge-outline',
  },
  {
    title: 'Breadcrumbs',
    to: { name: 'components-breadcrumbs' },
    subtitle: 'Components',
    icon: 'mdi-dots-horizontal',
  },
  {
    title: 'Button',
    to: { name: 'components-button' },
    subtitle: 'Components',
    icon: 'mdi-button-cursor',
  },
  {
    title: 'Chips',
    to: { name: 'components-chips' },
    subtitle: 'Components',
    icon: 'mdi-chip',
  },
  {
    title: 'Dialog',
    to: { name: 'components-dialog' },
    subtitle: 'Components',
    icon: 'mdi-message-outline',
  },
  {
    title: 'Expansion Panels',
    to: { name: 'components-expansion-panels' },
    subtitle: 'Components',
    icon: 'mdi-align-vertical-distribute',
  },
  {
    title: 'List',
    to: { name: 'components-list' },
    subtitle: 'Components',
    icon: 'mdi-format-list-bulleted',
  },
  {
    title: 'Menu',
    to: { name: 'components-menu' },
    subtitle: 'Components',
    icon: 'mdi-menu',
  },
  {
    title: 'Progress',
    to: { name: 'components-progress' },
    subtitle: 'Components',
    icon: 'mdi-progress-helper',
  },
  {
    title: 'Tooltip',
    to: { name: 'components-tooltips' },
    subtitle: 'Components',
    icon: 'mdi-tooltip-outline',
  },
  {
    title: 'Tabs',
    to: { name: 'components-tabs' },
    subtitle: 'Components',
    icon: 'mdi-tab',
  },
  {
    title: 'Pagination',
    to: { name: 'components-pagination' },
    subtitle: 'Components',
    icon: 'mdi-dots-horizontal',
  },
  {
    title: 'Ratings',
    to: { name: 'components-ratings' },
    subtitle: 'Components',
    icon: 'mdi-star-outline',
  },
  {
    title: 'Snackbars',
    to: { name: 'components-snackbars' },
    subtitle: 'Components',
    icon: 'mdi-tray',
  },
  {
    title: 'Timeline',
    to: { name: 'components-timeline' },
    subtitle: 'Components',
    icon: 'mdi-timeline-outline',
  },
  {
    title: 'Stepper',
    to: { name: 'components-stepper' },
    subtitle: 'Components',
    icon: 'mdi-timeline-outline',
  },
  {
    title: 'Autocomplete',
    to: { name: 'forms-autocomplete' },
    subtitle: 'Forms',
    icon: 'mdi-refresh-auto',
  },
  {
    title: 'Checkbox',
    to: { name: 'forms-checkbox' },
    subtitle: 'Forms',
    icon: 'mdi-checkbox-outline',
  },
  {
    title: 'Combobox',
    to: { name: 'forms-combobox' },
    subtitle: 'Forms',
    icon: 'mdi-square-outline',
  },
  {
    title: 'File Input',
    to: { name: 'forms-file-input' },
    subtitle: 'Forms',
    icon: 'mdi-upload-outline',
  },
  {
    title: 'Radio',
    to: { name: 'forms-radio' },
    subtitle: 'Forms',
    icon: 'mdi-radiobox-marked',
  },
  {
    title: 'Range Sliders',
    to: { name: 'forms-range-sliders' },
    subtitle: 'Forms',
    icon: 'mdi-arrange-send-to-back',
  },
  {
    title: 'Select',
    to: { name: 'forms-select' },
    subtitle: 'Forms',
    icon: 'mdi-select',
  },
  {
    title: 'Sliders',
    to: { name: 'forms-sliders' },
    subtitle: 'Forms',
    icon: 'mdi-arrange-send-to-back',
  },
  {
    title: 'Switch',
    to: { name: 'forms-switch' },
    subtitle: 'Forms',
    icon: 'mdi-toggle-switch-off-outline',
  },
  {
    title: 'Text Field',
    to: { name: 'forms-text-field' },
    subtitle: 'Forms',
    icon: 'mdi-text-box-outline',
  },
  {
    title: 'Otp Input',
    to: { name: 'forms-otp-input' },
    subtitle: 'Forms',
    icon: 'mdi-two-factor-authentication',
  },
  {
    title: 'Textarea',
    to: { name: 'forms-textarea' },
    subtitle: 'Forms',
    icon: 'mdi-text-box-outline',
  },
  {
    title: 'Typography',
    to: { name: 'pages-typography' },
    subtitle: 'Pages',
    icon: 'mdi-alpha-t-box-outline',
  },
  {
    title: 'Tables',
    to: { name: 'tables' },
    subtitle: 'Tables',
    icon: 'mdi-table',
  },
  {
    title: 'Datatables',
    to: { name: 'datatables' },
    subtitle: 'Tables',
    icon: 'mdi-table-large',
  },
  {
    title: 'Apex Chart',
    to: { name: 'charts-apex-chart' },
    subtitle: 'Charts',
    icon: 'mdi-chart-pie-outline',
  },
  {
    title: 'Chart Js',
    to: { name: 'charts-chart-js' },
    subtitle: 'Charts',
    icon: 'mdi-chart-line',
  },
]

mock.onGet('/global-search').reply(request => {
  const { q = '' } = request.params || { q: '' }
  const queryLower = q.toLowerCase()

  let filterDb = database.filter(item => {
    return item.title.toLowerCase().includes(queryLower)
  })

  // if filter data more that 5
  if (filterDb.length > 5)
    filterDb = filterDb.slice(0, 5)

  return [200, filterDb]
})
