import { View, StyleSheet, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import ApexChart from 'react-apexcharts';
import Game from './game';

export default function Games ({id}) {
    const [games, setGames] = useState([])
    //const [chartSeries, setChartSeries] = useState([])

    // Set up update function here
    /*
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
    */

    async function fetchGames() {
        const resp = await fetch(`http://localhost:8080/play?user=${id}`, );
        const json = await resp.json();
        //console.log(json.payload);
        setGames(json.payload ? json.payload : []);
    }

    // Construct data series from games list
    const colorMap = new Map()
    const heatColors = ['#6c1be0', '#7f37e7', '#8f51ea', '#a06aed', '#b083f0'].reverse()
    let sizeMin = -1
    let sizeMax = -1
    const seriesData = [{
        data: games.map((game) => {
            if (sizeMin < 0 || game.size < sizeMin) {
                sizeMin = game.size * 1.0
            }
            if (sizeMax < 0 || game.size > sizeMax) {
                sizeMax = game.size * 1.0
            }
            return {
                x: game.user,
                y: [
                    new Date(0).setUTCSeconds(game.start),
                    new Date(0).setUTCSeconds(game.end)
                ]
            }
        })
    }]


    return (
        <View>
            <View style={styles.gameon}>
                <Button
                    onPress={fetchGames}
                    title="Game on!" />
            </View>
            { games.length > 0 &&
                <View style={styles.chart}>
                <ApexChart
                    options={{
                        tooltip: {
                            enabled: false,
                        },
                        chart: {
                            toolbar: {
                                show: false,
                            },
                            type: 'rangeBar'
                        },
                        dataLabels: {
                            enabled: true,
                            formatter: (val, opt) => {
                                return opt.dataPointIndex >= 0 ?
                                    games[opt.dataPointIndex].size : val
                            }
                        },
                        plotOptions: {
                            bar: {
                                horizontal: true,
                                dataLabels: {
                                    position: 'center',
                                }
                            }
                        },
                        xaxis: {
                            type: 'datetime',
                            labels: {
                                datetimeUTC: false,
                            },
                            axisBorder: {
                                show: false,
                            },
                            axisTicks: {
                                show: false,
                            },
                        },
                        yaxis: {
                            labels: {
                                show: false,
                                formatter: (val, index) => {
                                    if (!index) {
                                        return val
                                    }

                                    return index.dataPointIndex >= 0 ?
                                        games[index.dataPointIndex].size : val
                                }
                            },
                        },
                        colors: [
                            ({seriesIndex, dataPointIndex}) => {
                                if (games.length < 2) {
                                    return heatColors[0]
                                }


                                if (seriesIndex === 0) {
                                    const size = games[dataPointIndex].size
                                    const perc = (size - sizeMin) / (sizeMax - sizeMin).toFixed()
                                    const index = Math.min(Math.floor((perc * 100) / 20), heatColors.length-1)

                                    return heatColors[index]
                                }
                                return '#2196f3'
                            }
                        ],
                    }}
                    series={seriesData}
                    type="rangeBar"
                    />
                </View>
            }
            {/*
            {<View>
                {
                    games.map(item => {
                        return <Game key={item.user} game={item} />
                    })
                }
            </View>}
            */}
        </View>
    );
};

const styles = StyleSheet.create({
    chart: {
        width: '100vw',
        maxWidth: 1000,
    },
    gameon: {
        alignSelf: 'center',
        width: 'auto',
    },
})