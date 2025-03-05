import React from 'react';

import { Link } from 'react-router-dom';

// Bootstrap 5 Components.
import { Card, CardBody, CardHeader, CardTitle, CardText, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

import ReactPlayer from 'react-player/youtube'

function BetaTrailer() {
  return (
    <Card className="rounded-0 border-0 bg-darkest my-2 mx-auto beta-trailer">
      <CardBody className="text-bg-darkest rounded-0 p-0">
        <ReactPlayer url='https://www.youtube.com/watch?v=yqWX86uT5jM' width="100%" height="100%" />
      </CardBody>
    </Card>
  )
}

export default BetaTrailer;