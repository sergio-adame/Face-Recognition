import React from 'react';
import Tilty from 'react-tilty';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilty max={65} className="Tilty br2 shadow-2">
                <img src={brain} alt="logo" />
            </Tilty>
        </div>

    );
}

export default Logo;