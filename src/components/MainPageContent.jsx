import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Bootstrap Components.
import { Container } from 'reactstrap';

import AlertModal from './AlertModal';
import BetaCountDownCard from './BetaCountDownCard';
import BetaSignupCard from './BetaSignupCard';
import InfoCard from './InfoCard';
import { getUsersCount } from '../utils/firebase/firestore';

const defaultAlertConfig = {
    isOpen: false,
    isConfirm: true,
    message: '',
};

function MainPageContent() {
    const navigate = useNavigate();
    const [alertConfig, setAlertConfig] = useState({ ...defaultAlertConfig });
    const [usersCount, setUsersCount] = useState(0);

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

    const updateUsersCount = () => {
        try {
            getUsersCount().then(updatedCount => setUsersCount(updatedCount));
        } catch (error) {
            console.log('ERROR: Unable to retrieve users count.');
        }
    };

    useEffect(() => {
      updateUsersCount();
    }, [usersCount])
    

    return (
        <div>
            <AlertModal
                alertConfig={alertConfig}
                handleConfirmSuccess={handleConfirmSuccess}
                handleCloseOnClick={hideAlert}
            />

            <div className="card-container">
                <BetaCountDownCard usersCount={usersCount} />
                
                <Container className='d-flex flex-column flex-lg-row align-items-lg-stretch justify-content-between my-3 p-0'>
                    <BetaSignupCard showAlert={showAlert} updateUsersCount={updateUsersCount} />
                    
                    <InfoCard />
                </Container>
            </div>
        </div>
    )
}

export default MainPageContent;