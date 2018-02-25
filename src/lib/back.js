export const goBack = history =>
  history.length > 1 ? history.goBack() : history.push('/')
