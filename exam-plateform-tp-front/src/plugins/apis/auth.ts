import mock from './mock'
import type { AuthUser } from './types'

const database: AuthUser[] = [
  {
    id: 1,
    fullName: 'John Doe',
    username: 'johndoe',
    password: 'admin',
    email: 'admin@admin.com',
    role: 'admin',
  },
  {
    id: 2,
    fullName: 'Jimmy Doe',
    username: 'Jimmy',
    password: 'client',
    email: 'client@demo.com',
    role: 'client',
  },
]

mock.onGet('/login').reply(request => {
  const params = request.params

  const user = database.find((u: AuthUser) => {
    return u.email === params.email && u.password === params.password
  })

  if (user)
    return [200, user]

  return [400, { email: ['Email or Password is Invalid'] }]
})

mock.onPost('/register').reply(request => {
  const { username, email, fullName } = JSON.parse(request.data)

  const emailExist = database.some((u: AuthUser) => {
    return u.email === email
  })

  const usernameExist = database.some((u: AuthUser) => {
    return u.username === username
  })

  if (emailExist && usernameExist) {
    return [400, { email: ['Email already exist'], username: ['User name already taken!'] }]
  }
  else {
    if (emailExist)
      return [400, { email: ['Email already exist'] }]

    if (usernameExist)
      return [400, { email: ['User name already taken!'] }]
  }

  const user = {
    id: 3,
    username: String(fullName).replace(/ /g, ''),
    email,
    fullName,
    role: 'admin',
  }

  return [200, user]
})
