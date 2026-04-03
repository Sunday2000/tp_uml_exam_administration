import mock from './mock'

import './auth'
import './datatable'
import './global-search'
import './invoice'
import './order'
import './product'
import './users'

mock.onAny().passThrough()
