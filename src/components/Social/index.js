import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/fontawesome-free-solid'
import {
  faFacebookSquare,
  faTwitterSquare,
} from '@fortawesome/fontawesome-free-brands'

const HTTP = /^https?:\/\//
const social = /(?:www\.)?(?:fb\.me|facebook\.com|pixiv\.(?:net|com|me)|twitter\.com)/i

export const SocialLink = ({ str, icon, fallbackUrl }) => {
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
      {unsure && <div>{str}</div>}
    </div>
  )
}

export const Facebook = ({ link }) => (
  <SocialLink
    icon={faFacebookSquare}
    str={link}
    fallbackUrl={`https://www.facebook.com/search/top/?q=${link}`}
  />
)

export const Twitter = ({ link }) => {
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

export const Pixiv = ({ link }) => {
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
