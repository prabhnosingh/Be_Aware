import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import bewareLogo from './beaware.png';
import { Link, useNavigate } from 'react-router-dom';
import speechImg from './image.png';

const SpeechToText = () => {
    const { transcript, resetTranscript } = useSpeechRecognition();
    const navigate = useNavigate(); // Initialize useNavigate
    const [isListening, setIsListening] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const handleStart = () => {
        setIsListening(true);
        SpeechRecognition.startListening({ continuous: true }); // Start continuous listening
    };

    const handleStop = () => {
        setIsListening(false);
        SpeechRecognition.stopListening(); // Stop listening
    };

    const handleReset = () => {
        setIsResetting(true);
        resetTranscript(); // Reset transcript
        setTimeout(() => {
            setIsResetting(false);
        }, 500); // Reset button animation after 500ms
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    return (
        <div id="dashboardMain" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowY: 'scroll', marginTop: '' }}>
            <div id="topBar">
            <a href="/dashboard" style={{ textDecoration: 'none' }}>
                <img style={{ width: "400px", height: "100px" }} src={bewareLogo} alt="beaware logo" /></a>
                <button onClick={handleBack}>Profile Page</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '60px', marginRight: '20px', marginLeft: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <h1 style={{ marginBottom: '10px' }}>Let every word be heard!</h1>

                    <img src={speechImg} alt="Speech Icon" style={{ width: '600px', height: '600px' }} />
                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        <button onClick={isListening ? handleStop : handleStart} className={isListening ? "listening-button" : ""}>
                            {isListening ? "Stop Recording" : "Start Recording"}
                        </button>
                        <button onClick={handleReset} className={isResetting ? "resetting-button" : ""}>
                            Reset Transcript
                        </button>
                    </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', minWidth: '850px', minHeight: '650px' }}>

                    <div style={{ border: '3px solid black', borderRadius: '15px', padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: '950px', minHeight: '80px' }}>
                        <p style={{ fontSize: '22px' }}>{transcript}</p>
                    </div>
                </div>
            </div>

            <div id="footer" style={{ marginTop: 'auto' }}>
                <p>&copy; 2024 BeAware. All rights reserved.</p>
            </div>
        </div>
    );
};

export default SpeechToText;
