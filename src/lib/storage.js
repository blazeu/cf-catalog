const windowGlobal = typeof window !== 'undefined' && window
const storageAdapter = windowGlobal
  ? windowGlobal.localStorage
  : { getItem: () => null, setItem: () => {} }

export default storageAdapter
