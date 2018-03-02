import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faUserCircle,
  faArrowLeft,
  faStar as faStarSolid,
  faShareAlt,
} from '@fortawesome/fontawesome-free-solid'
import { faStar } from '@fortawesome/fontawesome-free-regular'
import Header from '../../components/Header'
import { Facebook, Twitter, Pixiv } from '../../components/Social'
import VenueMap from '../../components/VenueMap'
import { isBookmarked, toggleBookmark } from '../../lib/bookmark'
import {
  goBack,
  windowGlobal,
  browserShareSupported,
  share,
} from '../../lib/utils'

import './circle.scss'

export default class CirclePage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    bookmarked: isBookmarked(this.props.data.catalogYaml.slug),
  }

  handleBackButtonClick = () => {
    goBack(this.context.router.history)
  }

  handleBookmarkClick = () => {
    toggleBookmark(this.props.data.catalogYaml.slug)
    this.setState({ bookmarked: !this.state.bookmarked })
  }

  handleShareClick = () => {
    const { data: { catalogYaml: circle } } = this.props

    share({
      title: circle.name,
      text: `${circle.name} on Comic Frontier X`,
      url: window.location.href,
    })
  }

  highlightBooth() {
    const { data: { catalogYaml: { booth_number } } } = this.props
    let booth = booth_number.replace('-', '')

    if (booth.startsWith('CB')) {
      booth = booth.replace('CB', 'Cb')
    }

    if (booth.endsWith(')')) {
      booth = booth.replace(/ \(.+\)/, '')
    }

    if (booth.endsWith('ab')) {
      const number = booth.replace('ab', '')
      booth = [`${number}a`, `${number}b`]
    }

    return [].concat(booth)
  }

  render() {
    const { data: { catalogYaml: circle } } = this.props

    const { bookmarked } = this.state

    return (
      <Fragment>
        <Helmet title={circle.name} />

        <Header>
          <div className="w-100 d-flex align-items-center">
            <a className="icon" onClick={this.handleBackButtonClick}>
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </a>

            <h1 className="h4 text-truncate d-inline m-0 ml-3">
              {circle.name}
            </h1>

            <div className="ml-auto d-flex">
              {browserShareSupported() && (
                <a
                  className={`
                    icon
                    mr-4
                    `}
                  onClick={this.handleShareClick}
                >
                  <FontAwesomeIcon icon={faShareAlt} size="lg" />
                </a>
              )}

              <a
                className={`
                      icon
                      circle-page-bookmark
                      `}
                onClick={this.handleBookmarkClick}
              >
                <div className={bookmarked ? 'd-none' : ''}>
                  <FontAwesomeIcon icon={faStar} size="lg" />
                </div>
                <div className={bookmarked ? '' : 'd-none'}>
                  <FontAwesomeIcon icon={faStarSolid} size="lg" />
                </div>
              </a>
            </div>
          </div>
        </Header>

        <div className="circle-page container">
          {circle.image && (
            <Img
              resolutions={circle.image.childImageSharp.resolutions}
              alt={circle.name}
              className="d-block mx-auto"
            />
          )}

          <hr />
          <div className="text-center mb-4">
            <h4>{circle.name}</h4>
            <h5>{circle.booth_number}</h5>
            <h6>{day(circle)}</h6>
            <h6 className="mb-0">{circle.rating}</h6>
            <Social {...circle} />
          </div>

          <hr />
          <h6 className="text-center">Fandoms</h6>
          <p className="text-center">{circle.fandom}</p>

          <Sample {...circle} />

          <hr />
          <h6 className="text-center mb-3">Booth Location</h6>
          <VenueMap booths={this.highlightBooth()} />
        </div>
      </Fragment>
    )
  }
}

const hasThing = str => str !== '-' && str.toLowerCase() !== 'none'

const Social = ({ circle_facebook, circle_twitter, circle_pixiv }) => (
  <div className="d-flex flex-wrap justify-content-center">
    {hasThing(circle_facebook) && <Facebook link={circle_facebook} />}
    {hasThing(circle_twitter) && <Twitter link={circle_twitter} />}
    {hasThing(circle_pixiv) && <Pixiv link={circle_pixiv} />}
  </div>
)

const Sample = ({ sample, name }) =>
  sample && (
    <Fragment>
      <hr />
      <h6 className="text-center">Sample works</h6>
      <a target="_blank" href={sample.childImageSharp.sizes.src}>
        <Img
          sizes={sample.childImageSharp.sizes}
          alt={name + ' sample works'}
          className="d-block mx-auto"
        />
      </a>
    </Fragment>
  )

const day = ({ isSunday, isSaturday }) => {
  if (isSunday && isSaturday) {
    return 'Sunday & Saturday'
  }

  if (isSunday) {
    return 'Sunday only'
  }

  if (isSaturday) {
    return 'Saturday only'
  }
}

export const query = graphql`
  query CirclePage($slug: String!) {
    catalogYaml(slug: { eq: $slug }) {
      slug
      name
      booth_number
      fandom
      isSaturday
      isSunday
      rating
      circle_facebook
      circle_twitter
      circle_pixiv
      image {
        childImageSharp {
          resolutions(width: 300, height: 426, quality: 85, toFormat: JPG) {
            ...GatsbyImageSharpResolutions
          }
        }
      }
      sample {
        childImageSharp {
          sizes(maxWidth: 1000, quality: 90) {
            ...GatsbyImageSharpSizes
          }
        }
      }
    }
  }
`
