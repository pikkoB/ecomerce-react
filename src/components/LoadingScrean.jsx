import React from 'react';
import './styles/loading-screen.css'
const LoadingScrean = () => {
    return (
        <div className='overlay'>
            <div className="lds-hourglass"></div>
        </div>
    );
};

export default LoadingScrean;