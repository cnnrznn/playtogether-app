import { View, StyleSheet } from 'react-native';
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
                } else {
                    setChartSeries([])
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
            <View style={styles.chart}>
            <ApexChart
                options={{
                    chart: {
                        toolbar: {
                            show: false,
                        },
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
            </View>
            {/*<View>
                {
                    games.map(item => {
                        return <Game key={item.id} game={item} />
                    })
                }
            </View>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    chart: {
        width: '100vw',
        maxWidth: 1000,
    }
})