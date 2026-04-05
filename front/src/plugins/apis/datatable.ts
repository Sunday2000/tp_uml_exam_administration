import mock from './mock'

const database = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
    iron: '1',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0,
    carbs: 94,
    protein: 0,
    iron: '0',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26,
    carbs: 65,
    protein: 7,
    iron: '6',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16,
    carbs: 23,
    protein: 6,
    iron: '7',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16,
    carbs: 49,
    protein: 3.9,
    iron: '16',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3,
    iron: '1',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25,
    carbs: 51,
    protein: 4.9,
    iron: '22',
  },
]

mock.onGet('/datatable/server').reply(config => {
  const { page = 1, itemsPerPage = 10, sortBy = [] } = config.params

  const start = (page - 1) * itemsPerPage

  const end = start + itemsPerPage
  const items = database.slice()
  if (sortBy.length) {
    const sortKey = sortBy[0].key
    const sortOrder = sortBy[0].order

    items.sort((a, b) => {
      // @ts-expect-error sortKey
      const aValue = a[sortKey]

      // @ts-expect-error sortKey
      const bValue = b[sortKey]

      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
    })
  }
  const paginated = items.slice(start, end)

  return [200, { items: paginated, total: items.length }]
})
