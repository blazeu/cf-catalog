import React, { Component } from 'react'
import debounce from 'lodash.debounce'

import './search.scss'

export default class Search extends Component {
  state = {
    query: this.props.value,
    typing: true,
  }

  handleChange = e => {
    const query = e.target.value
    this.setState({ query, typing: true }, () => {
      this.props.onSearch(this.state.query, this.state.typing)
      this.emitUpdate()
    })
  }

  emitUpdate = debounce(() => {
    this.props.onSearch(this.state.query, false)
  }, 250)

  componentWillReceiveProps({ value }) {
    this.setState({ query: value })
  }

  render() {
    const { query } = this.state

    return (
      <div className={`search-container ${this.props.className}`}>
        <input
          className="form-control"
          value={query}
          onChange={this.handleChange}
          type="search"
          placeholder="Cari nama circle/fandom"
        />
      </div>
    )
  }
}
