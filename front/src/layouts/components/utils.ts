export const isAnyChildActive = (item: any): boolean => {
  const route = useRoute()

  return item.children.some((child: any) => {
    if (child.to)
      return child.to.name === route.name

    if ('children' in child)
      return isAnyChildActive(child)

    return false
  })
}

export const isNavLinkActive = (item: any): boolean => {
  const route = useRoute()

  if (item.to)
    return item.to.name === route.name

  return false
}

export const isGroupActive = (navList: any): string[] => {
  const activeGroup = ['']

  if (navList) {
    navList.forEach((item: any) => {
    // eslint-disable-next-line sonarjs/no-collapsible-if
      if ('children' in item) {
        if (isAnyChildActive(item))
          activeGroup.push(item.name)
      }
    })
  }

  return activeGroup.filter(Boolean)
}
