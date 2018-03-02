import React, { Component, Fragment } from 'react'
import Link from 'gatsby-link'
import queryString from 'query-string'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faSlidersH,
  faBookmark as faBookmarkSolid,
} from '@fortawesome/fontawesome-free-solid'
import { faBookmark } from '@fortawesome/fontawesome-free-regular'
import CircleScroller from '../components/CircleScroller'
import Header from '../components/Header'
import Circle from '../components/Circle'
import Search from '../components/Search'
import Filter from '../components/Filter'
import { getBookmarked } from '../lib/bookmark'
import { getCircles } from '../lib/circles'
import { saveFilter, loadFilter } from '../lib/filter'

const windowGlobal = typeof window !== 'undefined' && window

export default class IndexPage extends Component {
  state = {
    query: '',
    bookmarkMode: false,
    filterOpen: false,
    typing: false,
    filter: loadFilter(),
    circles: this.props.data.allCatalogYaml.edges,
  }

  constructor(props) {
    super(props)
    this.circles = this.props.data.allCatalogYaml.edges
  }

  handleSearch = (query, typing) => {
    this.setState({ query })

    if (typing) {
      return this.setState({ circles: [], typing: true })
    }

    this.setState({ typing: false })
    windowGlobal.___history.push(`#search=${query}`)
  }

  handleBookmarkClick = () => {
    const { bookmarkMode } = this.state
    windowGlobal.___history.push(bookmarkMode ? '#' : '#bookmark')
  }

  handleFilterClick = () => {
    const { filterOpen } = this.state
    this.setState({ filterOpen: !filterOpen })
  }

  handleFilterChange = filter => {
    const circlePool = this.state.bookmarkMode
      ? this.getBookmarkedCircle()
      : this.circles
    const circles = getCircles(circlePool, filter, this.state.query)
    this.setState({ filter, circles })
    saveFilter(filter)
  }

  getBookmarkedCircle() {
    const bookmarks = getBookmarked()
    return this.props.data.allCatalogYaml.edges.filter(({ node }) =>
      bookmarks.includes(node.slug)
    )
  }

  updateHash = (props = this.props) => {
    const bookmarkMode = props.location.hash === '#bookmark'
    const params = queryString.parse(props.location.hash)
    const query = params.search || ''

    const circles = bookmarkMode
      ? getCircles(this.getBookmarkedCircle(), this.state.filter)
      : getCircles(this.circles, this.state.filter, query)

    this.setState({ query, circles, bookmarkMode })
  }

  componentWillReceiveProps(nextProps) {
    this.updateHash(nextProps)
  }

  componentWillMount() {
    this.updateHash()
  }

  render() {
    const {
      query,
      circles,
      bookmarkMode,
      filterOpen,
      filter,
      typing,
    } = this.state

    let empty
    if (circles.length <= 0 && !typing) {
      empty = bookmarkMode ? <EmptyBookmark /> : <EmptyResult />
    }

    return (
      <Fragment>
        <Header>
          <Search
            className="mr-4"
            onType={this.handleTyping}
            onSearch={this.handleSearch}
            value={query}
          />
          <a onClick={this.handleFilterClick} className="icon mr-4">
            <FontAwesomeIcon icon={faSlidersH} size="lg" />
          </a>
          <a onClick={this.handleBookmarkClick} className="icon">
            <div className={bookmarkMode ? 'd-none' : ''}>
              <FontAwesomeIcon icon={faBookmark} size="lg" />
            </div>
            <div className={bookmarkMode ? '' : 'd-none'}>
              <FontAwesomeIcon icon={faBookmarkSolid} size="lg" />
            </div>
          </a>
        </Header>

        <div className="container mt-3">
          {empty}
          <CircleScroller circles={circles} query={query} />
        </div>

        {filterOpen && (
          <Filter
            filter={filter}
            count={circles.length}
            onClose={this.handleFilterClick}
            onChange={this.handleFilterChange}
          />
        )}
      </Fragment>
    )
  }
}

const EmptyResult = () => (
  <div className="text-center">
    <p className="h4 m-0 text-muted">No result found.</p>
    <small className="text-muted">Check your filter settings?</small>
  </div>
)

const EmptyBookmark = () => (
  <div className="text-center">
    <p className="h4 m-0 text-muted">No bookmarked item.</p>
    <small className="text-muted d-block">
      Click the star icon on a circle page to bookmark it.
    </small>
    <small className="text-muted">... or check your filter settings?</small>
  </div>
)

export const query = graphql`
  query IndexPage {
    allCatalogYaml(sort: { fields: [booth_number], order: ASC }) {
      edges {
        node {
          name
          slug
          booth_number
          fandom
          isSunday
          isSaturday
          image {
            childImageSharp {
              resolutions(width: 100, height: 142, quality: 85, toFormat: JPG) {
                ...GatsbyImageSharpResolutions_noBase64
              }
            }
          }
        }
      }
    }
  }
`
