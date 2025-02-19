import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AlertModal from './AlertModal';
import BetaCountDownCard from './BetaCountDownCard';
import BetaSignupCard from './BetaSignupCard';

const defaultAlertConfig = {
    isOpen: false,
    isConfirm: true,
    message: '',
    username: '',
    email: '',
};

function MainPageContent() {
    const navigate = useNavigate();
    const [alertConfig, setAlertConfig] = useState({ ...defaultAlertConfig });

    const showAlert = (username, email, message = '', isConfirm = false) => {
        if (username && email) {
            setAlertConfig({
                isOpen: true,
                isConfirm,
                message,
                username,
                email,
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
                <BetaSignupCard showAlert={showAlert} />
            </div>
        </div>
    )
}

export default MainPageContent;