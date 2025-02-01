import React from 'react';

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

// Font Awesome icons.
import { faHandHoldingUsd, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Bootstrap Components.
import { Button, Card, CardBody, CardHeader, CardFooter, CardTitle, CardText } from 'reactstrap';

function BetaCountDownCard() {

  return (
    <Card className="rounded-0 border-0 bg-darkest text-secondary main-card">
      <CardHeader className="bg-darkest rounded-0 border-primary-orange d-flex justify-content-between align-items-center">
        <div className='flex-grow-1 flex-basis-0' style={{lineHeight: '17px'}}>
          <p className='text-center m-0 fw-bold fs-4'>Beta<br/>Launch</p>
        </div>

        <div className='flex-fill'>
          <CardTitle className="text-center fs-1 fw-bold text-uppercase m-0" style={{ lineHeight: '33px' }}>
            SPITFACE
            <br />
            BATTLES
          </CardTitle>
        </div>

        <div className='d-flex flex-column justify-content-between align-self-stretch flex-grow-1 flex-basis-0 text-end'>
          <div className='d-flex justify-content-end'>
            <FontAwesomeIcon icon={faHandHoldingUsd} size="lg" className='mx-2' />
            <small className='fw-bold'>8888</small>
          </div>

          <div className='d-flex justify-content-end'>
            <FontAwesomeIcon icon={faUsers} size="lg" className='mx-2' />
            <small className='fw-bold'>8888</small>
          </div>
        </div>
      </CardHeader>

      <CardBody className="text-bg-darkest rounded-0 py-0">
        <CardText className="fs-2 text-center text-uppercase fst-italic">
          The stage is yours!
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

      <CardFooter className="d-flex text-bg-darkest border-0">
        <div className='flex-grow-1 flex-basis-0 text-center border border-primary-orange rounded-pill pb-1'>Your Stage</div>

        <div className='flex-grow-1 flex-basis-0 text-center border border-primary-orange rounded-pill pb-1 mx-2'>Your Skills</div>

        <div className='flex-grow-1 flex-basis-0 text-center border border-primary-orange rounded-pill pb-1'>Your Voice</div>
      </CardFooter>
    </Card>
  )
}

export default BetaCountDownCard;