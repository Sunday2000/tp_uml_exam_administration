export default [
  {
    name: 'Dashboard',
    icon: 'mdi-view-dashboard-outline',
    children: [
      { name: 'eCommerce', icon: 'mdi-cart-outline', to: { name: 'dashboard-ecommerce' } },
      { name: 'CRM', icon: 'mdi-cart-outline', to: { name: 'dashboard-crm' } },
    ],
  },
  {
    name: 'Apps',
    icon: 'mdi-apps',
    children: [
      {
        name: 'Products',
        icon: 'mdi-cube-outline',
        children: [
          { name: 'List', icon: 'mdi-circle', to: { name: 'ecommerce-products-list' } },
          { name: 'Overview', icon: 'mdi-circle', to: { name: 'ecommerce-products-overview' } },
          { name: 'Edit', icon: 'mdi-circle', to: { name: 'ecommerce-products-edit' } },
          { name: 'Add', icon: 'mdi-circle', to: { name: 'ecommerce-products-add' } },
        ],
      },
      {
        name: 'Order',
        icon: 'mdi-cart-outline',
        children: [
          { name: 'List', icon: 'mdi-circle', to: { name: 'ecommerce-order-list' } },
          { name: 'Overview', icon: 'mdi-circle', to: { name: 'ecommerce-order-overview' } },
        ],
      },
      {
        name: 'Calendar',
        icon: 'mdi-calendar',
        to: { name: 'apps-calendar' },
      },
      {
        name: 'Invoice',
        icon: 'mdi-file-document-outline',
        children: [
          {
            name: 'List',
            icon: 'mdi-circle',
            to: { name: 'apps-invoice-list' },
          },
          {
            name: 'Details',
            icon: 'mdi-circle',
            to: { name: 'apps-invoice-details', params: { id: 'INV0002' } },
          },
          {
            name: 'Edit',
            icon: 'mdi-circle',
            to: { name: 'apps-invoice-edit', params: { id: 'INV0002' } },
          },
          {
            name: 'Add',
            icon: 'mdi-circle',
            to: { name: 'apps-invoice-add' },
          },
        ],
      },
      {
        name: 'User',
        icon: 'mdi-account-outline',
        children: [
          { name: 'List', icon: 'mdi-circle', to: { name: 'apps-user-list' } },
          { name: 'Profile', icon: 'mdi-circle', to: { name: 'apps-user-profile', params: { tab: 'profile' } } },
        ],
      },
    ],
  },
  {
    name: 'Pages',
    icon: 'mdi-package-variant-closed',
    children: [
      {
        name: 'Search',
        icon: 'mdi-magnify',
        to: { name: 'pages-search' },
      },
      {
        name: 'Pricing',
        icon: 'mdi-currency-usd',
        to: { name: 'pages-pricing' },
      },
      {
        name: 'FAQs',
        icon: 'mdi-help-circle-outline',
        to: { name: 'pages-faq' },
      },
      {
        name: 'Crypto',
        icon: 'mdi-currency-btc',
        to: { name: 'pages-crypto' },
      },
      {
        name: 'Card Examples',
        icon: 'mdi-cards-outline',
        to: { name: 'pages-cards' },
      },
      {
        name: 'Authentications',
        icon: 'mdi-security',
        children: [
          { name: 'Login', icon: 'mdi-circle', to: { name: 'auth-login' }, target: '_blank' },
          { name: 'Login v2', icon: 'mdi-circle', to: { name: 'auth-login-v2' }, target: '_blank' },
          { name: 'Register', icon: 'mdi-circle', to: { name: 'auth-register' }, target: '_blank' },
          { name: 'Register v2', icon: 'mdi-circle', to: { name: 'auth-register-v2' }, target: '_blank' },
          { name: 'Forgot Password', icon: 'mdi-circle', to: { name: 'auth-forgot-password' }, target: '_blank' },
          { name: 'Forgot Password v2', icon: 'mdi-circle', to: { name: 'auth-forgot-password-v2' }, target: '_blank' },
          { name: 'Reset Password', icon: 'mdi-circle', to: { name: 'auth-reset-password' }, target: '_blank' },
          { name: 'Reset Password v2', icon: 'mdi-circle', to: { name: 'auth-reset-password-v2' }, target: '_blank' },
        ],
      },
      {
        name: 'Miscellaneous',
        icon: 'mdi-cog-outline',
        children: [
          { name: 'Not Found', icon: 'mdi-circle', to: { name: 'misc-not-found' }, target: '_blank' },
          { name: 'Coming Soon', icon: 'mdi-circle', to: { name: 'misc-coming-soon' }, target: '_blank' },
          { name: 'Under Maintenance', icon: 'mdi-circle', to: { name: 'misc-under-maintenance' }, target: '_blank' },
          { name: 'Not Authorized', icon: 'mdi-circle', to: { name: 'misc-not-authorized' }, target: '_blank' },
          { name: 'Server Error', icon: 'mdi-circle', to: { name: 'misc-server-error' }, target: '_blank' },
        ],
      },
    ],
  },
  {
    name: 'UI Elements',
    icon: 'mdi-view-grid-outline',
    children: [
      {
        name: 'Typography',
        icon: 'mdi-alpha-t-box-outline',
        to: { name: 'pages-typography' },
      },
      {
        name: 'Form Example',
        icon: 'mdi-clipboard-outline',
        children: [
          { name: 'Advertising', icon: 'mdi-circle', to: { name: 'forms-example-advertising' } },
          { name: 'Checkout', icon: 'mdi-circle', to: { name: 'forms-example-checkout' } },
        ],
      },
      {
        name: 'Extensions',
        icon: 'mdi-puzzle-outline',
        children: [
          { name: 'Quill Editor', icon: 'mdi-circle', to: { name: 'extensions-quill-editor' } },
          { name: 'Toastify', icon: 'mdi-circle', to: { name: 'extensions-toastify' } },
          { name: 'Masonry Wall', icon: 'mdi-circle', to: { name: 'extensions-masonry-wall' } },
          { name: 'Sortable', icon: 'mdi-circle', to: { name: 'extensions-sortable' } },
          { name: 'Drop Zone', icon: 'mdi-circle', to: { name: 'extensions-drop-zone' } },
          { name: 'Date Picker', icon: 'mdi-circle', to: { name: 'extensions-date-picker' } },
          { name: 'Cleave Input', icon: 'mdi-circle', to: { name: 'extensions-cleave-input' } },
          { name: 'Swiper', icon: 'mdi-circle', to: { name: 'extensions-swiper' } },
        ],
      },
      {
        name: 'Components',
        icon: 'mdi-rocket-launch-outline',
        children: [
          { name: 'Alert', icon: 'mdi-circle', to: { name: 'components-alert' } },
          { name: 'Avatar', icon: 'mdi-circle', to: { name: 'components-avatar' } },
          { name: 'Badge', icon: 'mdi-circle', to: { name: 'components-badge' } },
          { name: 'Breadcrumbs', icon: 'mdi-circle', to: { name: 'components-breadcrumbs' } },
          { name: 'Button', icon: 'mdi-circle', to: { name: 'components-button' } },
          { name: 'Chips', icon: 'mdi-circle', to: { name: 'components-chips' } },
          { name: 'Dialog', icon: 'mdi-circle', to: { name: 'components-dialog' } },
          { name: 'Expansion Panels', icon: 'mdi-circle', to: { name: 'components-expansion-panels' } },
          { name: 'List', icon: 'mdi-circle', to: { name: 'components-list' } },
          { name: 'Menu', icon: 'mdi-circle', to: { name: 'components-menu' } },
          { name: 'Progress', icon: 'mdi-circle', to: { name: 'components-progress' } },
          { name: 'Tooltip', icon: 'mdi-circle', to: { name: 'components-tooltips' } },
          { name: 'Tabs', icon: 'mdi-circle', to: { name: 'components-tabs' } },
          { name: 'Pagination', icon: 'mdi-circle', to: { name: 'components-pagination' } },
          { name: 'Ratings', icon: 'mdi-circle', to: { name: 'components-ratings' } },
          { name: 'Snackbars', icon: 'mdi-circle', to: { name: 'components-snackbars' } },
          { name: 'Timeline', icon: 'mdi-circle', to: { name: 'components-timeline' } },
          { name: 'Stepper', icon: 'mdi-circle', to: { name: 'components-stepper' } },
        ],
      },
      {
        name: 'Forms',
        icon: 'mdi-clipboard-outline',
        children: [
          { name: 'Autocomplete', icon: 'mdi-circle', to: { name: 'forms-autocomplete' } },
          { name: 'Checkbox', icon: 'mdi-circle', to: { name: 'forms-checkbox' } },
          { name: 'Combobox', icon: 'mdi-circle', to: { name: 'forms-combobox' } },
          { name: 'File Input', icon: 'mdi-circle', to: { name: 'forms-file-input' } },
          { name: 'Radio', icon: 'mdi-circle', to: { name: 'forms-radio' } },
          { name: 'Range Sliders', icon: 'mdi-circle', to: { name: 'forms-range-sliders' } },
          { name: 'Select', icon: 'mdi-circle', to: { name: 'forms-select' } },
          { name: 'Sliders', icon: 'mdi-circle', to: { name: 'forms-sliders' } },
          { name: 'Switch', icon: 'mdi-circle', to: { name: 'forms-switch' } },
          { name: 'Text Field', icon: 'mdi-circle', to: { name: 'forms-text-field' } },
          { name: 'OTP Input', icon: 'mdi-circle', to: { name: 'forms-otp-input' } },
          { name: 'Textarea', icon: 'mdi-circle', to: { name: 'forms-textarea' } },
        ],
      },
    ],
  },
  {
    name: 'Datatables',
    icon: 'mdi-view-grid-plus-outline',
    children: [
      { name: 'Tables', icon: 'mdi-table', to: { name: 'tables' } },
      { name: 'Datatables', icon: 'mdi-view-grid-plus-outline', to: { name: 'datatables' } },
    ],
  },
  {
    name: 'Charts',
    icon: 'mdi-chart-pie-outline',
    children: [
      { name: 'Apex Chart', icon: 'mdi-chart-bar', to: { name: 'charts-apex-chart' } },
      { name: 'ChartJs', icon: 'mdi-chart-donut', to: { name: 'charts-chart-js' } },
    ],
  },
  { name: 'Documentation', icon: 'mdi-text-box-outline', href: 'https://docs.icreatorstudio.com/  ', target: '_blank' },
]
