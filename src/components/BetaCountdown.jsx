import React from 'react';

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

// Bootstrap Components.
import { Button, Card, CardBody, CardHeader, CardFooter, CardTitle } from 'reactstrap';

function BetaCountDown() {

  return (
    <Card className="flex-fill border-0 rounded-0 text-bg-darkest shadow-lg">
      <CardHeader className="border-0 rounded-top-0 text-bg-darkest">
        <CardTitle className="text-center fs-2 fw-bold text-uppercase fst-italic m-0">
          The stage is yours!
        </CardTitle>
      </CardHeader>

      <CardBody className="text-center text-bg-darkest py-2">
        <FlipClockCountdown
          to={'01/01/2025'}
          showSeparators={false}
          digitBlockStyle={{ borderRadius: '35%', backgroundColor: '#333' }}
          dividerStyle={{ color: '#555' }}
          className="mx-auto justify-content-center"
        />
      </CardBody>

      <CardFooter className="border-0 rounded-bottom-0 text-bg-darkest d-flex justify-content-evenly">
        {/* <Button size="sm" className="rounded-0 text-light flex-fill">Click Me 1</Button>
        <Button size="sm" className="rounded-0 text-light flex-fill mx-2">Click Me 2</Button>
        <Button size="sm" className="rounded-0 text-light flex-fill">Click Me 3</Button> */}
      </CardFooter>
    </Card>
  )
}

export default BetaCountDown;