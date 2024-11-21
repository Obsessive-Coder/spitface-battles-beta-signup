import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import './styles.css'; // Import the CSS file here

// Function to calculate time remaining
const calculateTimeLeft = () => {
  const targetDate = new Date('2025-02-01T00:00:00'); // target date is Feb 1, 2025
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

const FlipDigit = ({ digit }) => {
  return (
    <div className="flip-digit">
      <div className="flip-top">{digit}</div>
      <div className="flip-bottom">{digit}</div>
    </div>
  );
};

const CountDownTime = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Update the countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  return (
    <Card className="border-0 rounded-0 shadow-lg">
      <CardBody className="bg-dark text-white text-center py-4">
        <Row className="justify-content-center">
          {/* Days */}
          <Col xs="auto" className="countdown-unit">
            <FlipDigit digit={timeLeft.days} />
          </Col>

          {/* Hours */}
          <Col xs="auto" className="countdown-unit">
            <FlipDigit digit={timeLeft.hours} />
          </Col>

          {/* Minutes */}
          <Col xs="auto" className="countdown-unit">
            <FlipDigit digit={timeLeft.minutes} />
          </Col>

          {/* Seconds */}
          <Col xs="auto" className="countdown-unit">
            <FlipDigit digit={timeLeft.seconds} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default CountDownTime;
