import React, { useEffect } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'


// Planet pictures
import redGiant from '../images/red-giant.png'
import iceGiant from '../images/ice-giant.png'
import earth from '../images/earth-like.png'
import earth2 from '../images/earth-like2.png'
import brownExo from '../images/brown-exoplanet.png'
import sun from '../images/sun.png'
import gasGiant from '../images/gas-giant.png'



export default function Map(props) {
    
    useEffect(() => {
        axiosWithAuth()
            .get('/api/adv/init')
            .then(res => {
                handleInit(res.data.planet)
            })
            .catch(err => console.log(err.response))
    })

    const handleInit = (str) => {
        if (str !== 'Space') {
            props.history.push(`/${str}`)
        } else {
            props.history.push('/map')
        }
    }


    
    return (
        <div className='map'>
            <h3 className='map-title'> Select a World to Explore</h3>
            <img onClick={() => props.history.push('/red-giant-room')} style={{cursor: 'pointer'}} className='red-giant' src={redGiant} alt='Red Giant' />
            <img onClick={() => props.history.push('/ice-giant-room')} style={{cursor: 'pointer'}} className='ice-giant' src={iceGiant} alt='Ice Giant'/>
            <img onClick={() => props.history.push('/gas-giant-room')} style={{cursor: 'pointer'}} className='gas-giant' src={gasGiant} alt='Gas Giant' />
            <img onClick={() => props.history.push('/earth-room')} style={{cursor: 'pointer'}} className='earth' src={earth} alt='Earth' />
            <img onClick={() => props.history.push('/earth2-room')} style={{cursor: 'pointer'}} className='earth2' src={earth2} alt='Earth 2' />
            <img onClick={() => props.history.push('/brown-exo-room')} style={{cursor: 'pointer'}} className='brown-exo' src={brownExo} alt='Brown Exo' />
            <img onClick={() => props.history.push('/sun-room')} style={{cursor: 'pointer'}} className='sun' src={sun} alt='Sun' />
        </div>
    )
}

