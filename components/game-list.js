import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ApexChart from 'react-apexcharts';
import Game from './game';

export default function Games ({id}) {
    const [games, setGames] = useState([])
    const [chartSeries, setChartSeries] = useState([])

    // Set up update function here
    useEffect(() => {
        async function fetchGames() {
            try {
                const resp = await fetch(`http://localhost:8080/play?user=${id}`, );
                const json = await resp.json();
                console.log(json.payload);
                setGames(json.payload ? json.payload : []);
                if (json.payload) {
                    setChartSeries([{
                        data: json.payload.map((game) => {
                            return {
                                x: game.user,
                                y: [
                                    new Date(0).setUTCSeconds(game.start),
                                    new Date(0).setUTCSeconds(game.end)
                                ]
                            }
                        })
                    }])
                }
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
            <ApexChart
                options={{
                    chart: {
                        //height: 350,
                        type: 'rangeBar'
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true
                        }
                    },
                    xaxis: {
                        type: 'datetime'
                    }
                }}
                series={chartSeries}
                type="rangeBar"
                />
            <View>
                {
                    games.map(item => {
                        return <Game key={item.id} game={item} />
                    })
                }
            </View>
        </View>
    );
};