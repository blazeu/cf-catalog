import windowGlobal from './utils'

const storageAdapter = windowGlobal
  ? windowGlobal.localStorage
  : { getItem: () => null, setItem: () => {} }

export default storageAdapter
