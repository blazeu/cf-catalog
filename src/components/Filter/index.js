import React, { Component } from 'react'

import './filter.scss'

export default class Filter extends Component {
  state = {
    day: '',
  }

  constructor(props) {
    super(props)
    this.state = { ...props.filter }
  }

  handleDayChange = e => {
    this.setState({ day: e.target.value }, this.fire)
  }

  handleClose = () => {
    this.props.onClose()
  }

  fire = () => {
    this.props.onChange(this.state)
  }

  render() {
    const { count } = this.props
    const { day } = this.state

    return (
      <div className="filter-container container py-3">
        <a onClick={this.handleClose} className="filter-close">
          <div className="chevron bottom" />
        </a>
        <div className="d-flex">
          <h6>Filter</h6>
          <h6 className="ml-auto">{count > 0 ? count : ''}</h6>
        </div>
        <label htmlFor="filterDay">By day</label>
        <select
          id="filterDay"
          className="custom-select"
          onChange={this.handleDayChange}
          value={day}
        >
          <option value="any">Any</option>
          <option value="both">Both</option>
          <option value="saturday">Saturday only</option>
          <option value="sunday">Sunday only</option>
        </select>
      </div>
    )
  }
}
