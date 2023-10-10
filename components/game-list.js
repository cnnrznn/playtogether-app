import { View } from 'react-native';
import React, { useEffect } from 'react';

export default function Games ({id}) {
    const [games, setGames] = useState([]);

    // Set up update function here
    useEffect(() => {
        async function fetchGames() {
            try {
                const resp = await fetch("localhost:8080/games?id=${id}");
                const json = await resp.json();
                setGames(json.payload);
            } catch (error) {
                console.log(error);
            }
        }
        fetchGames();
        const interval = setInterval(() => {fetchGames}, 5000);
        return () => { clearInterval(interval) };
    });

    // Allow components to remotely update

    return (
        <View>

        </View>
    );
};