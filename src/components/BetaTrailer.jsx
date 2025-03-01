import React from 'react';

import { Link } from 'react-router-dom';

// Bootstrap 5 Components.
import { Card, CardBody, CardHeader, CardTitle, CardText, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

// Font Awesome icons.
import { faFacebook, faYoutube, faDiscord, faInstagram, faXTwitter, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReactPlayer from 'react-player/youtube'

// faFacebook, faTwitter, faYoutube, faDiscord, faInstagram
const icons = [{
  icon: faFacebook,
  color: '#1877F2',
  url: 'https://www.facebook.com/people/Spitface-Battles/61573456003674/'
}, {
  icon: faXTwitter,
  color: '#000000',
  url: 'https://x.com/SpitfaceBattles/',
}, {
  icon: faYoutube,
  color: '#FF0000',
  url: 'https://www.youtube.com/@SpitfaceBattles/'
}, {
  icon: faDiscord,
  color: '#7289da',
  url: 'https://discord.gg/fWbgkhHvkQ/'
}, {
  icon: faInstagram,
  color: 'pink',
  url: 'https://www.instagram.com/spitface.battles/'
}];


function BetaTrailer() {
  return (
    <Card className="flex-grow-1 rounded-0 border-0 bg-darkest ms-lg-5 secondary-card">
      <CardHeader className="d-flex justify-content-around text-bg-darkest rounded-0 border-0 border-bottom border-primary-orange">
        {icons.map(({ icon, color, url }, index) => (
          <a
            key={`social-icon-${color}-${index}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="d-inline-block text-decoration-none text-secondary"
          >
            <FontAwesomeIcon icon={icon} size="3x" style={{ color }} />
          </a>
        ))}
      </CardHeader>

      <CardBody className="text-bg-darkest rounded-0 p-0">
        <ReactPlayer url='https://www.youtube.com/watch?v=yqWX86uT5jM' width="100%" height="100%" />
      </CardBody>
    </Card>
  )
}

export default BetaTrailer;