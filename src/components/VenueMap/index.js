import React, { Component } from 'react'
import map from './map.svg'

import './venue-map.scss'

export default class VenueMap extends Component {
  handleOnLoad = () => {
    const { booths } = this.props
    if (!booths) return

    const rects = booths
      .map(booth => {
        const rect = this.map.contentDocument.getElementById(booth)
        if (!rect) return
        rect.style.fill = 'hotpink'
        return rect
      })
      .filter(rect => rect)

    if (rects.length < 1) return

    const boothLoc = rects[0].getBoundingClientRect().left
    this.container.scrollLeft = boothLoc - 170
  }

  render() {
    return (
      <div className="venue-map" ref={el => (this.container = el)}>
        <object
          data={map}
          type="image/svg+xml"
          ref={map => (this.map = map)}
          onLoad={this.handleOnLoad}
        />
      </div>
    )
  }
}
