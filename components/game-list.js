import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Game from './game';

export default function Games ({id}) {
    const [games, setGames] = useState([]);

    // Set up update function here
    useEffect(() => {
        async function fetchGames() {
            try {
                const resp = await fetch(`http://localhost:8080/games?id=${id}`, {
                    mode: 'cors',
                });
                const json = await resp.json();
                console.log(json);
                setGames(json.payload);
            } catch (error) {
                console.log(error);
            }
        }
        const interval = setInterval(() => {fetchGames()}, 1000);
        return () => { clearInterval(interval) };
    });

    // Allow components to remotely update

    return (
        <View>
            {
                games.map(item => {
                    return <Game key={item.id} game={item} />
                })
            }
        </View>
    );
};