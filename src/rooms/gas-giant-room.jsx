import React, { useEffect, useState } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'
import axios from 'axios'
import InfoBox from '../components/Info-box'
import Game from '../components/Game/Game'

export default function GasGiantRoom(props) {
    const planetName = 'Titan'
    const [player, setPlayer] = useState({
        uuid: '',
        name: '',
        title: '',
        description: '',
        players: []
    })
    const [planet, setPlanet] = useState()
    const [currentRoom, setCurrentRoom] = useState({title: '', description: '', planet: ''})

    const [map, setMap] = useState({
        cols: 27,
        rows: 27,
        tsize: 32,
        tiles: [],
        getTile: function(col, row) {
            return this.tiles[row * map.cols + col].tile_num
        }
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/adv/rooms?planet=Titan`)
            .then(res => {  
                let newRoom = props.currentRoom(res.data)              
                setPlanet(res.data)
                setCurrentRoom(newRoom)
                axiosWithAuth().post('/api/adv/changeplanet', {planet: 'Titan', roomId: newRoom.id}).then(res => console.log(res)).catch(err => console.log(err.response))

                let newTiles = res.data                
                setMap({
                    ...map,
                    tiles: newTiles
                })
                setLoading(false)         
            })
            .catch(err => console.log(err.response))
    }, [])
    


        
    return (
        <div className='room-background gas-giant'>
            <div className='game-container'>
                {loading === true ? (<h1>Loading...</h1>) : (<Game map={map} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} />)}
            </div>
            <div className='info-container'>
                <InfoBox planet={planet} currentRoom={currentRoom} planetName = {planetName} props ={props}/>
            </div>
            
        </div>
    )
}