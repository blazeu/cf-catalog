import React, { Component } from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Highlighter from 'react-highlight-words'
import get from 'lodash.get'

import './circle.scss'

export default class Circle extends Component {
  state = {
    touched: false,
  }

  handleTouchStart = () => {
    this.setState({ touched: true })
  }

  handleTouchEnd = () => {
    this.setState({ touched: false })
  }

  render() {
    const {
      name,
      booth_number,
      image,
      fandom,
      slug,
      highlight,
      style,
    } = this.props

    const resolutions = get(image, 'childImageSharp.resolutions') || ''

    let shortFandom = fandom.split(/, ?/)

    if (highlight) {
      shortFandom.sort((a, b) =>
        b.toLowerCase().includes(highlight.toLowerCase())
      )
    }

    shortFandom = shortFandom.slice(0, 3).join(', ')

    if (shortFandom.length > 50) {
      shortFandom = shortFandom.slice(0, 50) + '...'
    }

    const touchedClass = this.state.touched ? 'touch' : ''

    return (
      <Link
        to={slug}
        style={style}
        className={`circle-container d-flex ${touchedClass}`}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        <div className="circle-image-container mr-3">
          {resolutions ? (
            <Img
              resolutions={resolutions}
              alt={name}
              className="circle-image"
              outerWrapperClassName="circle-image-wrapper"
            />
          ) : (
            <h4 className="circle-no-image m-0">{name.slice(0, 1)}</h4>
          )}
        </div>

        <div>
          <p className="circle-name m-0">
            <Highlighter
              highlightTag="span"
              highlightClassName="circle-name-highlight"
              searchWords={[highlight]}
              autoEscape={true}
              textToHighlight={name}
            />
          </p>

          <p className="m-0">{booth_number}</p>
          <p>
            <Highlighter
              highlightTag="span"
              highlightClassName="circle-name-highlight"
              searchWords={[highlight]}
              autoEscape={true}
              textToHighlight={shortFandom}
            />
          </p>
        </div>
      </Link>
    )
  }
}
