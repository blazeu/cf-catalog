import React, { Component } from 'react'
import { List, AutoSizer, WindowScroller } from 'react-virtualized'
import Circle from '../Circle'

export default class CircleScroller extends Component {
  renderItem = ({ index, key, style }) => {
    const { circles, query } = this.props
    const circle = circles[index].node

    return <Circle {...circle} key={key} style={style} highlight={query} />
  }

  render() {
    const { circles } = this.props

    return (
      <WindowScroller>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <div ref={registerChild}>
                <List
                  autoHeight
                  width={width}
                  height={height}
                  rowCount={circles.length}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  overscanRowCount={2}
                  scrollTop={scrollTop}
                  rowHeight={155}
                  rowRenderer={this.renderItem}
                  style={{ outline: 'none' }}
                />
              </div>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    )
  }
}
