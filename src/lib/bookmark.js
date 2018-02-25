import storage from './storage'
import isEmpty from 'lodash.isempty'

let bookmarked = []

export const getBookmarked = () => {
  if (isEmpty(bookmarked)) {
    bookmarked = JSON.parse(storage.getItem('bookmark')) || []
  }

  return bookmarked
}

export const isBookmarked = slug => {
  getBookmarked()
  return bookmarked.includes(slug)
}

export const toggleBookmark = slug => {
  getBookmarked()
  const index = bookmarked.indexOf(slug)

  if (index > -1) {
    bookmarked.splice(index, 1)
  }

  if (index < 0) {
    bookmarked.push(slug)
  }

  storage.setItem('bookmark', JSON.stringify(bookmarked))
}
