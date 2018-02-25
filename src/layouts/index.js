import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import '../sass/style.scss'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet>
      <title>Comic Frontier X Catalog</title>
    </Helmet>
    {children()}
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
