import React from 'react';

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

// Font Awesome icons.
import { faHandHoldingUsd, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Bootstrap Components.
import { Card, CardBody, CardHeader, CardFooter, CardTitle, CardText } from 'reactstrap';

function BetaCountDownCard({ usersCount = 0}) {

  return (
    <Card className="rounded-0 border-0 bg-darkest text-secondary my-3 p-0 container main-card">
      <CardHeader className="bg-darkest rounded-0 border-primary-orange d-flex justify-content-between align-items-center">
        <div className='flex-grow-1 flex-basis-0'>
          <p className='m-0 fw-bold fs-4 lh-1'>Beta<br/>Launch</p>
        </div>

        <div className='flex-fill'>
          <CardTitle className="text-center fs-1 fw-bold text-uppercase m-0" style={{ lineHeight: '33px' }}>
            SPITFACE
            <br />
            BATTLES
          </CardTitle>
        </div>

        <div className='flex-grow-1 flex-basis-0 text-end'>
            <FontAwesomeIcon icon={faUsers} size="2x" className='mx-3' />
            <small className='fw-bold' style={{ fontSize: '2em' }}>{usersCount}</small>
        </div>
      </CardHeader>

      <CardBody className="text-bg-darkest rounded-0 py-3">
        <CardText className="text-center text-uppercase fst-italic">
          <span className="fs-2">The stage is yours!</span>
          <small className="d-block fs-4 fw-bold">May 1, 2025</small>
        </CardText>

        <FlipClockCountdown
          to={'05/01/2025'}
          showSeparators={false}
          labels={['days', 'hours', 'mins', 'secs']}
          digitBlockStyle={{ fontWeight: 'bold'}}
          labelStyle={{ fontWeight: 'bold', textTransform: 'uppercase'}}
          className="justify-content-center flip-clock"
        />
      </CardBody>

      <CardFooter className="d-flex text-bg-darkest border-0 rounded-0 py-3">
        {['Your Voice', 'Your Skills', 'Your Stage'].map(item => (
          <span key={`copy-${item}`} className='flex-grow-1 flex-basis-0 fs-4 text-center border border-primary-orange rounded-pill p-2 mx-3'>
            {item}
          </span>
        ))}
      </CardFooter>
    </Card>
  )
}

export default BetaCountDownCard;