# [Comic Frontier Catalog](https://cfx.surya.works)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/blazeu/cf-catalog)

[Comic Frontier](http://comifuro.net/) catalog as a progressive web app with offline capability and mobile-first design. All data is scraped from the [official catalog](https://catalog.comifuro.net/) and served as a static site.

## Tech Stack

* [**Gatsby**](https://www.gatsbyjs.org/) static site generator
* [**react-virtualized**](https://github.com/bvaughn/react-virtualized) efficient list rendering
* [**Bootstrap 4**](https://getbootstrap.com/) CSS framework

## Developing

1. Run: `npm install` to install the dependencies
2. Run: `npm run develop` to run Gatsby
3. It may take some time to optimizes and processes all of the images for the first time

## Building

1. Run: `npm run build` to build website into /public folder
