import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Banner from '../Banner/Banner';
import './homepage.scss';
import CapsuleContainer from '../Capsule/CapsuleContainer';

export default function Homepage() {

    return (
        <>
            <Banner />
            <CapsuleContainer />
        </>
    );
}
