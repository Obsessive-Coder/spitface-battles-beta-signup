import React from 'react';

// Bootstrap Components.
import { Card, CardBody, CardHeader, CardTitle, CardText, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

// Font Awesome icons.
import { faFacebook, faYoutube, faDiscord, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import instagramIcon from '../images/Instagram_Glyph_Gradient.svg';

const icons = [{
  icon: faFacebook,
  color: '#0865fe',
  url: 'https://www.facebook.com/people/Spitface-Battles/61573456003674/'
}, {
  icon: faXTwitter,
  color: '#e7e9ea',
  url: 'https://x.com/SpitfaceBattles/',
}, {
  icon: faYoutube,
  color: '#FF0000',
  url: 'https://www.youtube.com/@SpitfaceBattles/'
}, {
  icon: faDiscord,
  color: '#5865f2',
  url: 'https://discord.gg/fWbgkhHvkQ'
}, {
  icon: instagramIcon,
  color: '',
  url: 'https://www.instagram.com/spitface.battles/',
  // iconClassName: 'instagram-icon'
}];

function InfoCard() {
  return (
    <Card className="flex-fill my-4 my-lg-0 ms-lg-5 rounded-0 border-0 bg-darkest secondary-card">
        <CardHeader className="d-flex justify-content-around text-bg-darkest rounded-0 border-0 border-bottom border-primary-orange">
            <CardTitle className="text-center fs-1 fw-bold m-0 text-primary-orange-emphasis londrina-outline-regular">Get Connected</CardTitle>
        </CardHeader>

        <CardBody className="d-flex flex-column text-bg-darkest rounded-0">
            <CardText className="text-center fs-4 m-0 text-secondary sigmar-regular info-text" style={{ letterSpacing: '2px' }}>
                Follow our socials for updates & more!
            </CardText>

            <div className='d-flex justify-content-around align-items-center flex-fill flex-wrap my-3'>
                {icons.map(({ icon, color, url, iconClassName = '' }, index) => (
                    <a
                        key={`social-icon-${color}-${index}`}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="m-3 m-lg-2 text-decoration-none text-secondary"
                    >
                      {index === icons.length - 1 ? (
                        <img src={icon} alt="instagram" className='svg-inline--fa fa-discord fa-4x '/>
                      ) : (
                        <FontAwesomeIcon icon={icon} size="4x" style={{ color }} className={iconClassName} />
                      )}
                    </a>
                ))}
            </div>

            <CardText className='text-center m-0 text-secondary anton-regular contact-text' style={{ letterSpacing: '1px' }}>
                For questions please contact us at&nbsp;
                <a href="mailto:support@spitfacebattles.com" className='text-accent'>support@spitfacebattles.com</a>
            </CardText>
        </CardBody>
    </Card>
  )
}

export default InfoCard;