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
} from '@fortawesome/fontawesome-free-solid'
import { faStar } from '@fortawesome/fontawesome-free-regular'
import {
  faFacebookSquare,
  faTwitterSquare,
} from '@fortawesome/fontawesome-free-brands'
import Header from '../../components/Header'
import { isBookmarked, toggleBookmark } from '../../lib/bookmark'
import { goBack } from '../../lib/back'

import './circle.scss'

export default class CirclePage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    bookmarked: isBookmarked(this.props.data.catalogYaml.slug),
  }

  handleBookmarkClick = () => {
    toggleBookmark(this.props.data.catalogYaml.slug)
    this.setState({ bookmarked: !this.state.bookmarked })
  }

  render() {
    const { data: { catalogYaml: circle } } = this.props

    const { bookmarked } = this.state

    return (
      <Fragment>
        <Helmet title={circle.name} />

        <Header>
          <div className="w-100 d-flex align-items-center">
            <a
              className="icon"
              onClick={() => goBack(this.context.router.history)}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </a>

            <h1 className="h4 text-truncate d-inline m-0 ml-3">
              {circle.name}
            </h1>

            <a
              className={`
                icon
                circle-page-bookmark
                ml-auto
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
        </Header>

        <div className="circle-page container">
          {circle.image ? (
            <Img
              resolutions={circle.image.childImageSharp.resolutions}
              alt={circle.name}
              className="d-block mx-auto"
            />
          ) : (
            ''
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
        </div>
      </Fragment>
    )
  }
}

const hasThing = str => str !== '-' && str.toLowerCase() !== 'none'

const Social = ({ circle_facebook, circle_twitter, circle_pixiv }) => (
  <div className="d-flex flex-wrap justify-content-center">
    {hasThing(circle_facebook) ? <Facebook link={circle_facebook} /> : ''}
    {hasThing(circle_twitter) ? <Twitter link={circle_twitter} /> : ''}
    {hasThing(circle_pixiv) ? <Pixiv link={circle_pixiv} /> : ''}
  </div>
)

const Sample = ({ sample, name }) =>
  sample ? (
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
  ) : (
    ''
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

const HTTP = /^https?:\/\//
const social = /(?:www\.)?(?:fb\.me|facebook\.com|pixiv\.(?:net|com|me)|twitter\.com)/i

const SocialLink = ({ str, icon, fallbackUrl }) => {
  let link
  let unsure

  if (HTTP.test(str)) {
    link = str
  } else if (social.test(str)) {
    link = 'https://' + str
  } else {
    unsure = true
    link = fallbackUrl
  }

  if (!unsure) {
    link = link.split(' ')[0]
  }

  return (
    <div className={unsure ? 'w-100 order-10 mt-3' : 'mt-4'}>
      <a href={link} target="_blank" className="d-block mx-2">
        <FontAwesomeIcon icon={icon} size="2x" />
      </a>
      {unsure ? <div>{str}</div> : ''}
    </div>
  )
}

const Facebook = ({ link }) => (
  <SocialLink
    icon={faFacebookSquare}
    str={link}
    fallbackUrl={`https://www.facebook.com/search/top/?q=${link}`}
  />
)

const Twitter = ({ link }) => {
  let str = link

  if (!social.test(link) && link.split(' ').length === 1) {
    str = `https://twitter.com/${link}`
  }

  return (
    <SocialLink
      icon={faTwitterSquare}
      str={str}
      fallbackUrl={`https://twitter.com/search?q=${link}`}
    />
  )
}

const Pixiv = ({ link }) => {
  let str = link

  if (!social.test(link) && link.split(' ').length === 1) {
    str = `https://pixiv.me/${link}`
  }

  if (!!+link) {
    str = `https://www.pixiv.net/member.php?id=${link}`
  }

  return (
    <SocialLink
      icon={faUserCircle}
      str={str}
      fallbackUrl={`https://www.pixiv.net/search.php?word=${link}`}
    />
  )
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
