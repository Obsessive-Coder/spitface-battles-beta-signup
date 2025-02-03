// Bootstrap Components.
import {
  Container, Card, CardBody, CardFooter, CardHeader, CardTitle, CardText, List, ListInlineItem
} from 'reactstrap';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';

// Custom Components.
import BetaCountDownCard from './components/BetaCountDownCard';
import BetaSignupCard from './components/BetaSignupCard';
import CountDownTime from './components/CountDownTime';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import './App.css';

function App() {
  return (
    <Container fluid>
      <div className="card-container">
       <BetaCountDownCard />

       <BetaSignupCard />
      </div>
    </Container >
  );
}

export default App;
