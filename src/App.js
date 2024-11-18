// Bootstrap Components.
import {
  Container, Card, CardBody, CardFooter, CardHeader, CardTitle, CardText, List, ListInlineItem
} from 'reactstrap';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';

// Custom Components.
import BetaCountdown from './components/BetaCountdown';
import BetaSignupForm from './components/BetaSignupForm';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import './App.css';

function App() {
  return (
    // <Container fluid id="container" className="py-3 d-flex flex-column bg-darkest">
    //   <Card className="main-card mx-auto shadow flex-fill text-secondary-emphasis bg-secondary-subtle border-0">
    //     <CardBody>
    //       <section className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
    //         <div className="flex-basis-45">
    //           <div className="text-center me-3">
    //             <h1 className="m-0">SPITFACE BATTLES</h1>
    //             <span className="h2 d-block m-0">Redefining Battle Rap</span>
    //             <span className="h4">January 1, 2025</span>
    //           </div>

    //           <p className="px-2 my-2 text-center">
    //             Revolutionizing the rap battle experience with cutting-edge features like Audience-Integrated Judging, Reputation, Popularity, Rivalry, and more.
    //           </p>
    //         </div>

    //         <div id="countdown-timer" className="flex-fill shadow" style={{ maxWidth: '33.33% !important' }}>
    //           <BetaCountdown />
    //         </div>
    //       </section>

    //       <section className="d-flex flex-column flex-md-row align-items-center align-items-md-start my-5">
    //         <div className="flex-fill px-2 px-lg-4">
    //           <div className="mb-3">
    //             <h2 className="text-center">
    //               Your Stage, Your Skills, Your Voice
    //             </h2>

    //             <p>
    //               Spitface Battles is the ultimate rap battle platform for artists and fans alike. Engage with real-time judging, grow your reputation, and measure your skills on a global stage. Join us and make every battle count.
    //             </p>
    //           </div>

    //           <div id="video-section">
    //             <LiteYouTubeEmbed
    //               id="9jo51nJrO0k"
    //               title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
    //             />
    //           </div>


    //         </div>

    //         <div className="my-5 my-md-0 signup-form-section">
    //           <BetaSignupForm />
    //         </div>
    //       </section>
    //     </CardBody>
    //   </Card>
    // </Container>

    <Container fluid>
      <div className="d-flex flex-column justify-content-center align-items-center perspective-container">
        <Card className="rounded-0 text-bg-darker main-card">
          <CardHeader
            className="text-bg-darker border-0 mx-auto fs-1 fw-bolder text-center"
            style={{ lineHeight: '33px' }}
          >
            SPITFACE<br />BATTLES
          </CardHeader>
          <CardBody className="text-bg-darker">
            <CardTitle>
              Special Title Treatment
            </CardTitle>

            <BetaCountdown />
          </CardBody>
          <CardFooter className="text-bg-darker border-0">
            Footer
          </CardFooter>
        </Card>

        <Card className="rounded-0 text-bg-darker secondary-card">
          <CardHeader className="text-bg-darker">
            Header
          </CardHeader>
          <CardBody className="text-bg-darker">
            <CardTitle>
              Special Title Treatment
            </CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional content.
            </CardText>

            <BetaSignupForm />
          </CardBody>
          <CardFooter className="text-bg-darker">
            Footer
          </CardFooter>
        </Card>
      </div>
    </Container >
  );
}

export default App;
