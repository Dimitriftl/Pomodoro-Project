import React from 'react';
import Timer from '../components/Timer';


const Home = () => {
    return (
        <div className='container'>
            <div className='header'>
            <h1 className='first-title'>Dimitri's Pomodoro</h1>
            <a href="#">Login</a>
            </div>
           <Timer />
        </div>
        
    );
};

export default Home;