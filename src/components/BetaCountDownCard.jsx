import React from 'react';

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

// Font Awesome icons.
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Bootstrap Components.
import { Card, CardBody, CardHeader, CardFooter, CardTitle, CardText, Container } from 'reactstrap';

// Custom Components.
import BetaTrailer from './BetaTrailer';

import SFB_Logo from '../images/SFB_Logo.png';

function BetaCountDownCard({ usersCount = 0}) {

  return (
    <Card className="rounded-0 border-0 bg-darkest text-secondary my-3 p-0 container main-card">
      <CardHeader className="bg-darkest rounded-0 border-primary-orange d-flex justify-content-between align-items-center p-2">
        <div style={{ flex: '0 0 75px' }}>
          <img src={SFB_Logo} alt="Spitface Battles Logo" className="img-fluid" />
        </div>

        <div className='flex-fill'>
          <CardTitle className="text-center fw-bold m-0 text-primary-orange flavors-regular sfb-title">
            SpItFaCe BaTtLeS
          </CardTitle>
        </div>

        <div className='d-none d-sm-flex justify-content-around align-self-start align-items-start text-end p-1cd'  style={{ flex: '0 0 75px' }}>
            <FontAwesomeIcon icon={faUsers} size="xl" />
            <small className='fw-bold permanent-marker-regular' style={{ fontSize: '1.5em', lineHeight: '1em' }}>{usersCount}</small>
        </div>
      </CardHeader>

      <CardBody className="text-bg-darkest rounded-0 p-0">
        <CardText className="text-center text-uppercase fst-italic text-secondary-green bangers-regular sfb-subtitle">
          <span className="fs-1">The stage is yours!</span>
          <small className="d-block fs-3 fw-bold">May 1, 2025</small>
        </CardText>

        <Container fluid className="d-flex flex-column align-items-center">
          <FlipClockCountdown
            to={'05/01/2025'}
            showSeparators={true}
            labels={['days', 'hours', 'mins', 'secs']}
            className="justify-content-center my-2 permanent-marker-regular flip-clock"
          />

          <BetaTrailer />
        </Container>
      </CardBody>

      <CardFooter style={{ letterSpacing: '3px' }} className="d-flex text-uppercase text-bg-darkest border-0 rounded-0 text-secondary-purple rubik-spray-paint-regular">
        {['Your Voice!', 'Your Skills!', 'Your Stage!'].map((item, index) => (
          <span key={`copy-${item}`} className={`flex-grow-1 flex-basis-0 text-center p-2 ${index === 1 ? 'mx-3' : 'mx-sm-3'} copy-text`}>
            {item}
          </span>
        ))}
      </CardFooter>
    </Card>
  )
}

export default BetaCountDownCard;