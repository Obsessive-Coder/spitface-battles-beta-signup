import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Bootstrap Components.
import { Container } from 'reactstrap';

import AlertModal from './AlertModal';
import BetaCountDownCard from './BetaCountDownCard';
import BetaSignupCard from './BetaSignupCard';
import BetaTrailer from './BetaTrailer';

const defaultAlertConfig = {
    isOpen: false,
    isConfirm: true,
    message: '',
};

function MainPageContent() {
    const navigate = useNavigate();
    const [alertConfig, setAlertConfig] = useState({ ...defaultAlertConfig });

    const showAlert = (message = '', isConfirm = false) => {
        if (message) {
            setAlertConfig({
                isOpen: true,
                isConfirm,
                message,
            });
        }
        
    };

    const hideAlert = () => {
        setAlertConfig({ ...defaultAlertConfig })
    };

    const handleConfirmSuccess = event => {
        navigate('/verified');
    };

    return (
        <div>
            <AlertModal
                alertConfig={alertConfig}
                handleConfirmSuccess={handleConfirmSuccess}
                handleCloseOnClick={hideAlert}
            />

            <div className="card-container">
                <BetaCountDownCard />
                
                <Container className='d-flex justify-content-between my-3 p-0'>
                    <BetaSignupCard showAlert={showAlert} />
                    <BetaTrailer />
                </Container>
            </div>
        </div>
    )
}

export default MainPageContent;