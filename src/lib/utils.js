import get from 'lodash.get'

export const windowGlobal = typeof window !== 'undefined' && window

export const goBack = history =>
  history.length > 1 ? history.goBack() : history.push('/')

export const browserShareSupported = () =>
  !!get(windowGlobal, 'navigator.share')

export const share = obj => windowGlobal.navigator.share(obj)
