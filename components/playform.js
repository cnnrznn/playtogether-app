import { StyleSheet, View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const Form = (props) => {
    const submitCallback = props.callback;

    const [selectedActivity, setSelectedActivity] = useState("volleyball");
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    const [size, setSize] = useState(1)

    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const [location, setLocation] = useState();

    function submitForm() {
        if (!startTime || !endTime) {
            alert("Must choose start and end time")
            return
        }
        if (endTime <= startTime) {
            alert("End time must be after start time")
            return
        }

        let start = new Date()
        let end = new Date()
        start.setHours(startTime, 0, 0, 0)
        end.setHours(endTime, 0, 0, 0)

        submitCallback({
            start: Math.round(start.getTime() / 1000),
            end: Math.round(end.getTime() / 1000),
            size: size,
            activity: selectedActivity,
            latitude: lat,
            longitude: lon,
            location: location,
        });
    }

    function GetLocation() {
        Geolocation.getCurrentPosition(
            (position) => {
            console.log(position);
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
            setLocation(position.coords);
            },
            (error) => {
            console.log(error);
            }
        );
    }

    const currHour = new Date().getHours()
    const pickerTimeList = Array(13)
    for (let i=1; i < pickerTimeList.length; i++) {
        const hour = (currHour + i - 1)
        pickerTimeList[i] = <Picker.Item label={hour % 24} value={hour} key={i} />
    }
    pickerTimeList[0] = <Picker.Item label={''} value={undefined} key={0} />

    const sizeList = Array(20);
    for (let i=0; i<sizeList.length; i++) {
        sizeList[i] = i+1;
    }

    return (
        <View>
            <View style={styles.row}>
                <Button onPress={GetLocation}
                        title="Get Location" />
                {location !== undefined &&
                    <FontAwesomeIcon icon={faCheck} />}
            </View>
            <View style={styles.row} >
                <Text style={styles.col}>Activity:</Text>
                <Picker
                    selectedValue={selectedActivity}
                    onValueChange={(activity) => setSelectedActivity(activity)} >
                    <Picker.Item label="volleyball" value="volleyball" />
                    <Picker.Item label="run" value="run" />
                </Picker>
            </View>
            <View style={styles.row} >
                <Text style={styles.col}># People:</Text>
                <Picker
                    selectedValue={size}
                    onValueChange={val => { setSize(Number(val)) }} >
                    {
                        sizeList.map( (v, i) => {
                            return <Picker.Item label={v} value={v} key={i} />
                        })
                    }
                </Picker>
            </View>
            <View style={styles.row} >
                <Text style={styles.col}>Start Hour:</Text>
                <Picker
                    style={styles.col}
                    selectedValue={startTime}
                    onValueChange={time => setStartTime(time)} >
                    { pickerTimeList }
                </Picker>
                <Text style={styles.col}>End Hour:</Text>
                <Picker
                    selectedValue={endTime}
                    onValueChange={time => setEndTime(time)} >
                    { pickerTimeList }
                </Picker>
            </View>
            <Button 
                onPress={submitForm}
                title="Go!"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
    },
    col: {
        marginEnd: 10,
    }
});

export default Form;