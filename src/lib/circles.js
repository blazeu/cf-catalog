export const getCircles = (circles, filterObj = {}, query = '') => {
  const search = query.toLowerCase()

  return circles.filter(({ node }) => {
    return (
      (node.name.toLowerCase().includes(search) ||
        node.fandom.toLowerCase().includes(search)) &&
      filter(node, filterObj)
    )
  })
}

const filter = (circle, { day }) => {
  let dayPredicate = true

  if (day) {
    switch (day) {
      case 'any':
        dayPredicate = true
        break
      case 'both':
        dayPredicate = circle.isSunday && circle.isSaturday
        break
      case 'saturday':
        dayPredicate = circle.isSaturday && !circle.isSunday
        break
      case 'sunday':
        dayPredicate = circle.isSunday && !circle.isSaturday
        break
    }
  }

  const predicate = dayPredicate

  return predicate
}
