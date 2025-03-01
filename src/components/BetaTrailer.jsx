import React from 'react';

import { Link } from 'react-router-dom';

// Bootstrap 5 Components.
import { Card, CardBody, CardHeader, CardTitle, CardText, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

// Font Awesome icons.
import { faFacebook, faTwitter, faYoutube, faDiscord, faInstagram  } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReactPlayer from 'react-player/youtube'

// faFacebook, faTwitter, faYoutube, faDiscord, faInstagram
const icons = [{
  icon: faFacebook,
  color: 'blue',
  url: 'facebook.com'
}, {
  icon: faTwitter,
  color: 'lightblue',
  url: 'x.com',
}, {
  icon: faYoutube,
  color: 'red',
  url: 'youtube.com'
}, {
  icon: faDiscord,
  color: 'purple',
  url: 'discord.com'
}, {
  icon: faInstagram,
  color: 'pink',
  url: 'instagram.com'
}];


function BetaTrailer() {
  return (
    <Card className="flex-grow-1 rounded-0 border-0 bg-darkest ms-5 secondary-card">
      <CardHeader className="d-flex justify-content-around text-bg-darkest rounded-0 border-0 border-bottom border-primary-orange">
        {icons.map(({ icon, color, url }, index) => (
          <Link
            key={`social-icon-${color}-${index}`}
            to={url}
            className="d-inline-block text-decoration-none text-secondary"
          >
            <FontAwesomeIcon icon={icon} size="3x" />
          </Link>
        ))}
      </CardHeader>

      <CardBody className="text-bg-darkest rounded-0 p-0">
        <ReactPlayer url='https://www.youtube.com/watch?v=yqWX86uT5jM' width="100%" height="100%" />
      </CardBody>
    </Card>
  )
}

export default BetaTrailer;