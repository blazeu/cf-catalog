const axios = require('axios')
const yaml = require('js-yaml')
const util = require('util')
const path = require('path')
const slugify = require('slug')
const exec = util.promisify(require('child_process').exec)
const writeFile = util.promisify(require('fs').writeFile)

const CATALOG = 'https://catalog.comifuro.net'
const CATALOG_API = `${CATALOG}/api/catalog`
const CATALOG_PATH = `${__dirname}/../content/catalog`

async function extract() {
  await exec(`rm -rf ${CATALOG_PATH}/*`)
  const { data: catalog } = await axios.get(CATALOG_API)

  catalog.forEach(circle => {
    const slug = slugify(circle.name).toLowerCase()
    const hasImage = circle.src !== '/img/circle_cut/circle_cut_blank.png'
    const hasSample = circle.sample !== '-'
    const imgExt = path.extname(circle.src)
    const sampleExt = path.extname(circle.sample)

    if (hasImage) {
      circle.image = `${slug}${imgExt}`

      if (process.argv.includes('--image')) {
        exec(
          `curl -sg "${CATALOG}${circle.src}" -o ${CATALOG_PATH}/${
            circle.image
          }`
        )
      }
    }

    if (hasSample) {
      const sampleName = `${slug}-sample${sampleExt}`

      if (process.argv.includes('--image')) {
        exec(
          `curl -sg "${CATALOG}${
            circle.sample
          }" -o ${CATALOG_PATH}/${sampleName}`
        )
      }

      circle.sample = sampleName
    } else {
      delete circle.sample
    }

    delete circle.id
    delete circle.src
    delete circle.user_id

    circle.slug = slug

    const data = yaml.dump(circle)
    writeFile(`${CATALOG_PATH}/${slug}.yml`, data)
  })
}

extract()
