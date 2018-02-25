import storage from './storage'

export const saveFilter = filterObj => {
  storage.setItem('filter', JSON.stringify(filterObj))
}

export const loadFilter = () => {
  return JSON.parse(storage.getItem('filter')) || {}
}
