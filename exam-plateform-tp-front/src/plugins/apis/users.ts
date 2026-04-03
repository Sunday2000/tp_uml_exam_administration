import avatar1 from '@/assets/avatars/avatar-1.png'
import avatar10 from '@/assets/avatars/avatar-10.png'
import avatar11 from '@/assets/avatars/avatar-11.png'
import avatar12 from '@/assets/avatars/avatar-12.png'
import avatar13 from '@/assets/avatars/avatar-13.png'
import avatar14 from '@/assets/avatars/avatar-14.png'
import avatar2 from '@/assets/avatars/avatar-2.png'
import avatar3 from '@/assets/avatars/avatar-3.png'
import avatar4 from '@/assets/avatars/avatar-4.png'
import avatar5 from '@/assets/avatars/avatar-5.png'
import avatar6 from '@/assets/avatars/avatar-6.png'
import avatar7 from '@/assets/avatars/avatar-7.png'
import avatar8 from '@/assets/avatars/avatar-8.png'
import avatar9 from '@/assets/avatars/avatar-9.png'
import mock from './mock'
import type { User } from './types'

const users: User[] = [
  {
    id: 1,
    name: 'Lainey Davidson',
    avatar: avatar1,
    email: 'bkrabbe1d@home.pl',
    company: 'Durgan - Murazik',
    role: 'Project Manager',
    status: 'active',
  },
  {
    id: 2,
    name: 'Sarah Lee',
    avatar: avatar2,
    email: 'sarah.lee@example.com',
    company: 'Lee Enterprises',
    role: 'Sales Representative',
    status: 'inactive',
  },
  {
    id: 3,
    name: 'Tom Smith',
    avatar: avatar3,
    email: 'tom.smith@example.com',
    company: 'Smith & Associates',
    role: 'Software Developer',
    status: 'active',
  },
  {
    id: 4,
    name: 'Alice Johnson',
    avatar: avatar4,
    email: 'alice.johnson@example.com',
    company: 'Johnson Technologies',
    role: 'Marketing Manager',
    status: 'inactive',
  },
  {
    id: 5,
    name: 'Kevin Chen',
    avatar: avatar5,
    email: 'kevin.chen@example.com',
    company: 'Chen Corporation',
    role: 'Human Resources',
    status: 'active',
  },
  {
    id: 6,
    name: 'Emily Wong',
    avatar: avatar6,
    email: 'emily.wong@example.com',
    company: 'Wong Industries',
    role: 'Project Coordinator',
    status: 'inactive',
  },
  {
    id: 7,
    name: 'David Kim',
    avatar: avatar7,
    email: 'david.kim@example.com',
    company: 'Kim Corporation',
    role: 'Sales Manager',
    status: 'active',
  },
  {
    id: 8,
    name: 'Rachel Hernandez',
    avatar: avatar8,
    email: 'rachel.hernandez@example.com',
    company: 'Hernandez Enterprises',
    role: 'Financial Analyst',
    status: 'inactive',
  },
  {
    id: 9,
    name: 'Steven Davis',
    avatar: avatar9,
    email: 'steven.davis@example.com',
    company: 'Davis Enterprises',
    role: 'IT Manager',
    status: 'active',
  },
  {
    id: 10,
    name: 'Karen Lee',
    avatar: avatar10,
    email: 'karen.lee@example.com',
    company: 'Lee Technologies',
    role: 'Marketing Specialist',
    status: 'inactive',
  },
  {
    id: 11,
    name: 'Jason Smith',
    avatar: avatar11,
    email: 'jason.smith@example.com',
    company: 'Smith Industries',
    role: 'Software Engineer',
    status: 'active',
  },
  {
    id: 12,
    name: 'Michelle Rodriguez',
    avatar: avatar12,
    email: 'michelle.rodriguez@example.com',
    company: 'Rodriguez Corporation',
    role: 'HR Manager',
    status: 'inactive',
  },
  {
    id: 13,
    name: 'Andrew Johnson',
    avatar: avatar13,
    email: 'andrew.johnson@example.com',
    company: 'Johnson & Associates',
    role: 'Sales Associate',
    status: 'active',
  },
  {
    id: 14,
    name: 'Samantha Lee',
    avatar: avatar14,
    email: 'samantha.lee@example.com',
    company: 'Lee Technologies',
    role: 'Project Manager',
    status: 'inactive',
  },
]

mock.onGet('/users').reply(() => {
  return [200, users.reverse()]
})

// delete user
mock.onDelete(/\/user\/delete\/\d+/).reply(config => {
  const userId = config.url?.substring(config.url.lastIndexOf('/') + 1)

  const userIndex = users.findIndex(i => i.id === Number(userId))

  users.splice(userIndex, 1)

  return [204]
})

// add new user
mock.onPost('/user/add').reply(request => {
  const user = JSON.parse(request.data).user

  const lastId = users[users.length - 1].id

  user.id = lastId + 1
  users.push(user)

  return [201]
})
