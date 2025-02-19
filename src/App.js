// import './utils/amplifyConfig';

import { Route, Routes } from 'react-router-dom';

// Bootstrap Components.
import { Container } from 'reactstrap';

// Custom Components.
import MainPageContent from './components/MainPageContent';
import VerifiedPageContent from './components/VerifiedPageContent';

import './App.css';

function App() {
  return (
    <Container fluid>
          <Routes>
            <Route path="/" element={<MainPageContent />} />
            <Route path="/verified" element={<VerifiedPageContent />} />
          </Routes>
    </Container >
  );
}

export default App;
