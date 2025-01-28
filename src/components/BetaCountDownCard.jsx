import React from 'react';

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

// Bootstrap Components.
import { Button, Card, CardBody, CardHeader, CardFooter, CardTitle, CardText } from 'reactstrap';

function BetaCountDownCard() {

  return (
    <Card className="rounded-0 border-0 bg-darkest text-secondary main-card">
      <CardHeader
        className="bg-darkest rounded-0 border-primary-orange"
        style={{ lineHeight: '33px' }}
      >
        <CardTitle className="text-center fs-1 fw-bold text-uppercase m-0">
          SPITFACE
          <br />
          BATTLES
        </CardTitle>
      </CardHeader>

      <CardBody className="text-bg-darkest rounded-0 py-0">
        <CardText className="fs-2 text-center text-uppercase fst-italic">
          The stage is yours!
        </CardText>

        <FlipClockCountdown
          to={'05/01/2025'}
          showSeparators={false}
          labels={['days', 'hours', 'mins', 'secs']}
          digitBlockStyle={{ borderRadius: '35%', backgroundColor: '#222' }}
          dividerStyle={{ color: '#555' }}
          labelStyle={{ color: '#888', fontSize: '1.5rem', fontWeight: 'bold', textTransform: 'uppercase'}}
          className="justify-content-center"
        />
      </CardBody>

      <CardFooter className="text-bg-darkest border-0">
        Footer
      </CardFooter>
    </Card>
  )
}

export default BetaCountDownCard;